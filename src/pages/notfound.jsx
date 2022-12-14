import React from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia } from "@mui/material";
import NotFoundImage from "../assests/404.png";

function NotFound() {
  //Naviagte user back to home page without not be able to return to the url that causes not found page to show
  const navigate = useNavigate();
  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Not Found</title>
        <meta
          name="description"
          content="page for not found urls user input while using the app"
        />
      </Helmet>
      <h1>Page Not Found</h1>
      <Card>
        <CardMedia
          image={NotFoundImage}
          component="img"
          height="500"
          alt="not-found image"
          sx={{
            width: "50vw",
            maxWidth: "50vw",
            "@media (max-width: 1000px)": {
              width: "90vw",
              maxWidth: "90vw",
              objectFit: "fill",
              height: "70vh",
            },
          }}
        />
      </Card>
      <button className="btn" onClick={handleReturn}>
        Return Home
      </button>
    </div>
  );
}

export default NotFound;
