"use client";
import SideBar from "@/section/sideBar";
import { Container, } from "@/app/style";
import { WorkPannel } from "@/app/dashboard/style";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container>
      <WorkPannel>
      <SideBar />

            {children}
      </WorkPannel>
    </Container>
  );
}
