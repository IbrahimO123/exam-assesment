import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Octokit } from "octokit";
import SearchIcon from "@mui/icons-material/Search";
import MySearch from "../components/MySearch";
import { Typography, TextField, Button, Box, LinearProgress } from "@mui/material";

function SearchRepo() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const fetchSearchRepo = async (name) => {
    try {
      const octokit = new Octokit({
        auth: process.env.GIT_TOKEN,
      });
      const search = await octokit.request("GET /search/repositories", {
        q: name,
      });
      return search;
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleSearch = async (e) => {
    try {
     
      e.preventDefault();
      if (search.trim() === "") return setError("Input a search value");
      setLoading(true);
      const results = await fetchSearchRepo(search);
      const value = results.data;
      if (value.items === 0) return setError("No search found");
      setData(value.items);
      setLoading(false)
      setError("");

    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Search Repositories</title>
        <meta
          name="description"
          content="saerch for repositories on github using name of the repositories"
        />
      </Helmet>
      <Typography component="h6">Search for repositories by name</Typography>
      <div style={{ margin: "20px" }}>
        <TextField
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label="Type Repo Name"
          variant="filled"
          name="search"
        ></TextField>
        <Typography style={{ color: "red" }} disable={error ? "block" : "none"}>
          <small>{error}</small>
        </Typography>
        <p style={{ marginTop: "5px" }}>
          <Button
            endIcon={<SearchIcon />}
            sx={{ textTransform: "none" }}
            variant="contained"
            onClick={handleSearch}
            color="primary"
          >
            Search
          </Button>
        </p>
      </div>
      {loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Box>{search.trim() && data ? <MySearch data={data} /> : null}</Box>
      )}
    </div>
  );
}

export default SearchRepo;
