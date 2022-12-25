import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardHeader,
  CardActions,
  IconButton,
} from "@mui/material";

function MyCard({ detail }) {
  const [like, setLike] = useState(false);
  const [share, setShare] = useState(false);
  const handleShare = () => {
    setShare(true);
    setTimeout(() => {
      window.open("whatsapp://send?text=" + JSON.stringify(detail));
    }, 1000);
  };
  return (
    <Card sx={{ margin: "10px 0 15px 0", width: "350px", maxWidth: "360px" }}>
      <CardHeader
        title={detail.name}
        subheader={detail.company || <small>No Company name</small>}
      />
      <CardMedia
        component="img"
        alt={detail.name}
        image={detail.avatar_url}
        height="500"
      />
      <CardContent>
        <Typography component="p" variant="subutitle2">
          <strong>Username: </strong> {detail.login}
        </Typography>
        <Typography component="p" variant="subutitle2">
          <strong>Location: </strong>
          {detail.location || <small>Location not available</small>}
        </Typography>
        <Typography variant="body2">
          <strong>Bio: </strong>
          {detail.bio || <small>No Bio for this user</small>}
        </Typography>
        <Typography component="span" variant="caption">
          <strong>Public Repos: </strong>
          {detail.public_repos || <small>0</small>}
        </Typography>
        <Typography
          sx={{ marginLeft: "10px" }}
          component="span"
          variant="caption"
        >
          <strong>Twitter Handler: </strong>
          {detail.twitter_username || <small>No Twitter username</small>}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          title="Like"
          onClick={() => setLike((s) => !s)}
          color={like ? "primary" : undefined}
          aria-label="add to favorites"
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          title="Share"
          color={share ? "primary" : undefined}
          onClick={handleShare}
          aria-label="share"
        >
          <ShareIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MyCard;
