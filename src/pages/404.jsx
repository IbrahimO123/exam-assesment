import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function NotFoundPageTest() {
  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography variant="h4" component="div">
        Testing the Not Found Page
      </Typography>
      <Typography variant="body2" mt={3} component="div">
        <Link className="link2" to="/not-found-page/test">
          Not Found Page
        </Link>
      </Typography>
    </Box>
  );
}

export default NotFoundPageTest;
