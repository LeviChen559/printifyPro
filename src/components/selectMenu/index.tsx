import React, { FC, SetStateAction, useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { iCustomerSearchProps } from "@/app/type";

const options = [
  "Select A Option",
  "Product_EN",
  "Product_ZH",
  "Item_Code",
  "Case_Gtin",
  "Ingredient_info",
];
interface iPeops {
  setSearch: (searchProps: iCustomerSearchProps) => void;
  search: iCustomerSearchProps;
  clickResetSearch: boolean;
}

const SimpleListMenu: FC<iPeops> = (prop) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    prop.setSearch({ ...prop.search, searchType: options[index] });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    prop.clickResetSearch && setSelectedIndex(0);
  }, [prop.clickResetSearch]);

  return (
    <div style={{ flex: "1 0 50px", maxWidth: 175,}}>
      <List
        component="nav"
        aria-label="Device settings"
        sx={{ bgcolor: "#bcbcbc",height:50,borderRadius:2,
        }}
      >
        <ListItemButton
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          // aria-label="when device is locked"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClickListItem}
          sx={{ height: "100%", }}
        >
          <ListItemText
            sx={{ whiteSpace: "nowrap" }}
            // primary="When device is locked"
            secondary={options[selectedIndex]}
          />
          {!open ? (
            <ArrowDropDownIcon sx={{ color: "#ffffff" }} />
          ) : (
            <ArrowDropUpIcon sx={{ color: "#ffffff" }} />
          )}
        </ListItemButton>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "lock-button",
          role: "listbox",
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default SimpleListMenu;
