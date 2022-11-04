import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import MyCard from "../components/MyCard";
import {
  Box,
  Button,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";
import { Octokit } from "octokit";
import { MyContextApi } from "../components/Layout";
import SendIcon from "@mui/icons-material/Send";

function Home() {
  const [error, setError] = useContext(MyContextApi);
  const [loading, setLoading] = useState(false);
  const [gitUser, setGitUser] = useState("");
  const [gitDetails, setGitDetails] = useState([]);

  const fetchUser = async (name) => {
    const token = process.env.GIT_TOKEN;
    const octokit = new Octokit({
      auth: token,
    });
    try {
      const profile = await octokit.request("GET /users/{username}", {
        username: name,
      });
      return profile.data;
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSetUser = (e) => {
    e.preventDefault();
    setGitUser(e.target.value);
  };

  const handleFetchUser = async (e) => {
    e.preventDefault();
    try {
      if (gitUser.trim() === "") return setError("Input a username");
      const getUser = await fetchUser(gitUser);
      if (getUser === undefined) return setError("Invalid username");
      setLoading(true);
      setTimeout(() => {
        setGitDetails([getUser]);
        setLoading(false);
        setError("");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Box>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Home</title>
        <meta
          name="description"
          content="home page user can display their github profile also a short Blog post"
        />
      </Helmet>
      <Typography component="div" variant="h6">
        Blog
      </Typography>
      <Typography component="div" variant="body2">
        There is a man name Kolawole, he fell in love with a lady at work, his
        plan was to date but not marry this lady, he is anti-social, rarely go
        out, spend most of his life, yes life in door unless he is going to
        work, or a colleague visit him, or he wants to get something to cook or
        buy food stuff in his home. The lady is a social one, cheerful and full
        of life, the love in her heart, her selfless, makes her vulnerable to
        the wicked and evil of the world. He approached the lady, let his
        intention known, luckily for him, the lady was not in a relationship at
        of that time and agreed to his requested. "When are you planning to go
        out on a date", said the lady after weeks of indoor conversations with
        the man, "Go out", replied the man, "I have no plan to". The lady was
        amazed by the man responsed but never seem to bother much, indoor isn't
        fun for the lady and the lady couldn't tell why the man couldn't be
        flexible for her.The love grow more than the two diffrent world could
        bear. The man agreed later to take the lady out, At their outing, a
        friend of the ....to be continued
        <p>
          <Button variant="contained">Click b4 Reading</Button>
        </p>
      </Typography>
      <Box>
        <form>
          <Typography component="div" variant="h6">
            See your Github Profile
          </Typography>
          <TextField
            value={gitUser}
            onChange={handleSetUser}
            variant="standard"
            color="grey"
            label="Your Github Username"
            required
          ></TextField>
          <Typography
            display={error ? "block" : "none"}
            component="p"
            variant="caption"
            color="error"
          >
            {error}
          </Typography>
          <Box mt={1}>
            <Button
              endIcon={<SendIcon />}
              variant="contained"
              onClick={handleFetchUser}
            >
              Send
            </Button>
          </Box>
        </form>
      </Box>
      <Box
        mt={3}
        mb={3}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        {loading ? (
          <Box sx={{ width: "15%" }}>
            <LinearProgress />
          </Box>
        ) : (
          gitDetails &&
          gitDetails?.map((detail) => (
            <div key={detail.login} style={{ padding: "5px" }}>
              <MyCard detail={detail} />
            </div>
          ))
        )}
      </Box>
    </Box>
  );
}

export default Home;
