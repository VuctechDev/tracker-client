import { useState } from "react";
import {
  Box,
  List,
  ListItem,
  // ListItemText,
  Popover,
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogOut from "./components/LogOut";

// interface Props {}

const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box className="mobileNavVevices" onClick={handleClick}>
        <PersonOutlineIcon fontSize="medium" />
      </Box>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        style={{ marginTop: "4px" }}
      >
        <Box sx={{ p: 1, minWidth: 260 }}>
          <List sx={{ paddingY: 0 }}>
            <ListItem
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              {/* <ListItemText primary="stefan@gmail.com" /> */}
              {/* <Box sx={{ height: "30px" }} /> */}
              <LogOut />
            </ListItem>
          </List>
        </Box>
      </Popover>
    </>
  );
};

export default AccountMenu;
