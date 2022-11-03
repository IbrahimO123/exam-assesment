import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardMedia } from "@mui/material";
import NotFoundImage from "../assests/404.png";

function NotFound() {
  const navigate = useNavigate();
  const handleReturn = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };
  return (
    <div>
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
