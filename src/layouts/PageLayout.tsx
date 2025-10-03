import React from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
}

const PageLayout: React.FC<LayoutProps> = ({ title, children }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          height: 46,
          flexShrink: 0,
        }}
      >
        <IconButton
          onClick={() => navigate("/", { replace: true })}
          sx={{ position: "absolute", left: 8 }}
          aria-label="back"
        >
          <FontAwesomeIcon icon={faChevronLeft} style={{ fontSize: "14px" }} />
        </IconButton>

        <Typography variant="h6" component="div" noWrap>
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PageLayout;
