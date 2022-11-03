import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Box,
  Stack,
  Typography,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import { Octokit } from "octokit";
import MySearch from "./../components/MySearch";
import { MyContextApi } from "./../components/Layout";

function MyRepos() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [, , repos, setRepos] = useContext(MyContextApi);
  const octokit = new Octokit({
    auth: process.env.GIT_TOKEN,
  });
  const fetchRepos = async () => {
    try {
      const result = await octokit.request("GET /users/{username}/repos", {
        username: "IbrahimO123",
      });
      setRepos(result.data);
    } catch (err) {
      console.error(err.message);
    }
  };
  const pages = 6;
  const perPage = 5;
  const lastRecord = page * perPage;
  const firstRecord = lastRecord - perPage;
  const records = repos.slice(firstRecord, lastRecord);

  const handleChangePage = (e) => {
    setPage(e.target.value);
  };
  const fetchUser = async () => {
    try {
      setLoading(true);
      const profile = await octokit.request("GET /users/{username}", {
        username: "IbrahimO123",
      });
      setUser([profile.data]);
      setLoading(false);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    setTimeout(() => {
      fetchUser();
      fetchRepos();
    }, 2000);
  }, []);

  return loading ? (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  ) : (
    <Box>
      {user &&
        user?.map((person) => {
          return (
            <div style={{ marginTop: "-6px" }} key={person.login}>
              <div className="jumbotron">
                <Typography pt={5} component="p" variant="h3">
                  {person.name}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    width: "50%",
                  }}
                  className="bio"
                >
                  <Typography component="p">{person.bio}</Typography>
                </div>
                <Typography component="p">
                  <small>Github Username: </small>
                  {person.login}
                </Typography>
                <div className="subtitle">
                  <Typography>
                    <small>Location: </small>
                    {person.location}
                  </Typography>
                  <Typography>
                    <small>Public Repos: </small>
                    {person.public_repos}
                  </Typography>
                  <Typography>
                    <small>Twitter Username: </small>
                    {person.twitter_username}
                  </Typography>
                </div>
              </div>

              <div style={{ margin: "20px 0 20px 0" }}>
                {user && repos && (
                  <Container>
                    <MySearch data={records} show={true} />
                  </Container>
                )}
                <Container mt={3}>
                  <Stack spacing={2}>
                    <Typography
                      sx={{ marginTop: "10px" }}
                      component="div"
                      varianat="h6"
                    >
                      Page: {page} of {pages}
                    </Typography>
                    <div>
                      <button
                        className="btn"
                        onClick={() => setPage((prev) => Number(prev) - 1)}
                        disabled={page <= 1 ? true : undefined}
                      >
                        Prev
                      </button>
                      {Array.from({ length: 6 }, (v, i) => i + 1).map((n) => (
                        <button
                          className="btn"
                          key={n}
                          value={n}
                          onClick={handleChangePage}
                        >
                          {n}
                        </button>
                      ))}
                      <button
                        className="btn"
                        onClick={() => setPage((prev) => Number(prev) + 1)}
                        disabled={page >= pages ? true : undefined}
                      >
                        Next
                      </button>
                    </div>
                  </Stack>
                </Container>
              </div>
            </div>
          );
        })}
    </Box>
  );
}

export default MyRepos;
