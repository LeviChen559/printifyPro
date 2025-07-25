"use client";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import { iLabelInfo } from "@/type/labelType";
import { useSession } from "next-auth/react";
import { Container, SearchContainer } from "../style";
import CircularProgress from "@mui/material/CircularProgress";
import { useRouter } from "next/navigation";
import FormPropsTextFields from "@/components/FormPropsTextFields";
import { iCustomerSearchProps } from "@/app/type";
import LabelActionCard from "@/section/labelActionCard/page";
import LabelPrintCard from "@/section/labelPrintCard/page";
import LabelEditCard from "@/section/labelEditCard/page";
import CancelIcon from "@mui/icons-material/Cancel";
import dynamic from "next/dynamic";
import UserState from "@/components/userState";
import Skeleton from "@mui/material/Skeleton";
import SkeletonCard from "./skeletonCard";
import { iEditedMode } from "@/type/labelType";

const BarCodeInfoTable = dynamic(() => import("@/components/labelTable"), {
  suspense: true,
});

interface iShowCard {
  labelActionCard: boolean;
  labelPrintCard: boolean;
  labelEditCard: boolean;
  isLabelUpdated: boolean;
}

const MyLabels = () => {
  const [search, setSearch] = useState<iCustomerSearchProps>({
    searchType: "",
    searchValue: "",
  });
  const [showCard, setShowCard] = useState<iShowCard>({
    labelActionCard: false,
    labelPrintCard: false,
    labelEditCard: false,
    isLabelUpdated: false,
  });
  const [clickResetSearch, setClickResetSearch] = useState<boolean>(false);
  const [selectLabelInfo, setSelectLabelInfo] = useState<
    iLabelInfo | undefined
  >(undefined);
  const [editMode, setEditMode] = useState<iEditedMode>(iEditedMode.empty);
  
  const [apiMyLabelUrl, setApiMyLabelUrl] = useState<string>(
    "/api/prisma/getMyLabels"
  );

  const resetSearch = useCallback(() => {
    setSearch({ ...search, searchValue: "" });
    setApiMyLabelUrl("/api/prisma/getMyLabels");
    setClickResetSearch(true);
  }, [search]);

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        // column &&
        setApiMyLabelUrl(
          `/api/prisma/getMyLabels?searchValue=${search.searchValue}`
        );
        setClickResetSearch(false); // Reset the flag after updating the URL
      }
      if (event.key === "Backspace") {
        search.searchValue === "" && resetSearch();
      }
    },
    [search.searchValue, resetSearch]
  );
    const defaultText = {
      color: "#000000",
      fontStyle: "Normal",
      fontSize: 14,
      fontFamily: "Arial",
      fontWeight: 400,
      rows: 1,
      lineHeight: 1.2,
    };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [search.searchValue, handleKeyPress]); // Ensures useEffect runs when these values change

  // Log the data to check its structure
  const { status, data: userData } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  const selectItem = (selectLabelInfo: iLabelInfo) => {
    setSelectLabelInfo(selectLabelInfo);
    setShowCard({
      labelActionCard: true,
      labelPrintCard: false,
      labelEditCard: false,
      isLabelUpdated: false,
    });
  };
  const safelyStringifyData = (data: iLabelInfo) => {
    try {
      return JSON.stringify(data, (key, value) => {
        if (typeof value === 'string') {
          // Escape any quotes or special characters
          return value.replace(/"/g, '\\"');
        }
        return value;
      });
    } catch (error) {
      console.error('Error stringifying data:', error);
      return '';
    }
  };


  if (status === "loading") {
    return (
      <Container>
        <CircularProgress />
        <p>Checking authentication...</p>
      </Container>
    );
  }

  if (status === "unauthenticated") {
    return <Container>No access - You need to sign in first!</Container>;
  }

  return (
    <Container justifyContent="flex-start">
      <Suspense
        fallback={
          <Skeleton variant="rectangular" sx={{ height: 100, width: "100%" }} />
        }
      >
        {userData ? (
          <UserState userData={userData} />
        ) : (
          <Skeleton variant="text" sx={{ fontSize: "2rem", width: "100%" }} />
        )}
      </Suspense>
      <div
        style={{
          opacity:
            showCard.labelActionCard ||
            showCard.labelEditCard ||
            showCard.labelPrintCard
              ? 0.25
              : 1,
          display: "flex",
          flexDirection: "column",
          gap: 16,
          overflow: "auto",
          width: "100%",
        }}
      >
        <SearchContainer>
          {/* <SelectMenu
            setSearch={setSearch}
            search={search}
            clickResetSearch={clickResetSearch}
          /> */}
          <FormPropsTextFields
            id="searchField"
            label=""
            placeholder="Search Item Code, Product Name(English), Product Name(Chinese), Case GTIN, Ingredient Info"
            value={search.searchValue}
            type="text"
            onChange={(e) =>
              setSearch({ ...search, searchValue: e.target.value })
            }
            required={false}
            startIcon={null}
            sx={{ width: "100%", height: "50px" }}
            endIcon={
              clickResetSearch === false &&
              search.searchValue && <CancelIcon onClick={resetSearch} />
            }
          />
        </SearchContainer>
        <BarCodeInfoTable
          selectItem={selectItem}
          apiMyLabelUrl={apiMyLabelUrl}
          isLabelUpdated={showCard.isLabelUpdated}
        />
      </div>
      {showCard.labelActionCard &&
        (selectLabelInfo ? (
          <LabelActionCard setShowCard={setShowCard} duplicatedLabel={safelyStringifyData(selectLabelInfo)}/>
        ) : (
          <SkeletonCard />
        ))}
      {showCard.labelPrintCard && (
        <LabelPrintCard
          selectLabelInfo={selectLabelInfo as iLabelInfo}
          setShowCard={setShowCard}
          defaultText={defaultText}
        />
      )}
      {showCard.labelEditCard && (
        <LabelEditCard
          selectLabelInfo={selectLabelInfo as iLabelInfo}
          setShowCard={setShowCard}
          userName={userData?.user?.name as string}
          userRole={userData?.user?.role as string}
          defaultText={defaultText}
          editMode={editMode}
          setEditMode={setEditMode}
        />
      )}
    </Container>
  );
};

export default MyLabels;
