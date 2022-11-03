import React from "react";
import { Typography, Paper, Grid, Container } from "@mui/material";
import { Link } from 'react-router-dom';

function MySearch({ data, show=false }) {
  return (
    <Container p={4} >
      <Typography varaint="h4" component="div">
      </Typography>
      <Grid container spacing={2}>
        {data &&
          data?.map((item) => {
            return (
              <Grid item md={4} xs={12} key={item.id}>
                <Paper sx={{ padding: "10px" }} variant="outlined">
                  <Typography component="h6">{item.name}</Typography>
                  <Typography
                    sx={{ marginRight: "10px" }}
                    variant="caption"
                    component="span"
                  >
                    {item.id}
                  </Typography>
                  <Typography variant="caption" component="span">
                    {item.visibility}
                  </Typography>
                  <Typography variant="caption" component="div">
                    <strong>Forked: </strong> {item.forks || <small>0</small>}
                  </Typography>
                  <Typography variant="caption" component="div">
                    <strong>Description: </strong>
                    {item.description || <small>No Description</small>}
                  </Typography>
                  <Typography variant="caption" component="div">
                    <strong>Language: </strong>
                    {item.language || <small>No language detect</small>}
                  </Typography>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    href={item.svn_url}
                  >
                    {item.svn_url}
                  </a>
                  {
                    show ? <div style={{marginTop:"10px"}}>
                    <Link className="detail" to={`/my-repos/${item.id}`}>Details</Link>
                  </div> : null
                  }
                </Paper>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}

export default MySearch;