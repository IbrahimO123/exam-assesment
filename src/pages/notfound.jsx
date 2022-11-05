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
          height="340"
          alt="not-found image"
        />
      </Card>
      <button className="btn" onClick={handleReturn}>
        Return Home
      </button>
    </div>
  );
}

export default NotFound;
