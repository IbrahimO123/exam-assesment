import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet";
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

  // Fuction to fetch all my repositories on git hub
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
  const pages = 6; //number of pages
  const perPage = 5; //number of repos per page
  const lastRecord = page * perPage; //last index of the slice operation
  const firstRecord = lastRecord - perPage; //first index of the slice operation
  const records = repos.slice(firstRecord, lastRecord); //to get the numeber of records using the slice operation

  // function that hadles how the page numbers changes
  const handleChangePage = (e) => {
    setPage(e.target.value);
  };

  //  fetch my profile from github
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

  //used to run the defineds function after rendering the page
  useEffect(() => {
    setTimeout(() => {
      fetchUser();
      fetchRepos();
    }, 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Helmet>
        <meta charSet="utf-8" />
        <title>All Repositories</title>
        <meta
          name="description"
          content="Displays all repositories on my github accoun also my profile and bio"
        />
      </Helmet>
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
