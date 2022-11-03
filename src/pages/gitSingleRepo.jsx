import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Container, Paper, Typography } from "@mui/material";
import { MyContextApi } from "./../components/Layout";

function MySingleRepo() {
  const [repo, setRepo] = useState([]);
  const [, , repos] = useContext(MyContextApi);
  const { id } = useParams();
  useEffect(() => {
    const getRepo = repos.filter((rep) => rep.id === Number(id));
    setRepo(getRepo);
  }, [id, repos]);
  return (
    <div>
     
      <Box>
        {repo &&
          repo?.map((rep) => {
            return (
              <Container key={rep.id}>
                <h4>Single Repository: {rep.name.charAt(0).toUpperCase() + rep.name.slice(1)}</h4>
                <Paper sx={{ padding: "10px" }}>
                  <Typography
                    className="single"
                    component="p"
                    variant="caption"
                  >
                    <small>ID: </small>
                    {rep.id}
                  </Typography>
                  <Typography className="single" component="h3">
                    <small>Name: </small>
                    {rep.name}
                  </Typography>
                  <Typography className="single" component="p">
                    <small>Full name: </small>
                    {rep.full_name}
                  </Typography>
                  <Typography className="single">
                    <small>Default branch: </small>
                    {rep.default_branch}
                  </Typography>
                  <Typography
                    className="single"
                    variant="caption"
                    component="div"
                  >
                    <small>Forked: </small> {rep.forks || <small>0</small>}
                  </Typography>
                  <Typography
                    className="single"
                    variant="caption"
                    component="div"
                  >
                    <small>Description:</small>
                    {rep.description || <small>No Description</small>}
                  </Typography>
                  <Typography
                    className="single"
                    variant="caption"
                    component="div"
                  >
                    <small>Language: </small>
                    {rep.language || <small>No language detect</small>}
                  </Typography>
                  <a
                    className="single"
                    target="_blank"
                    rel="noreferrer"
                    style={{ textDecoration: "none" }}
                    href={rep.svn_url}
                  >
                    <small>Go to: </small>
                    {rep.svn_url}
                  </a>
                  <div className="single lan">
                    <Typography
                      className="single"
                      component="span"
                      variant="caption"
                    >
                      <small>Language:</small> {rep.language}
                    </Typography>
                    <Typography
                      className="single"
                      component="span"
                      variant="caption"
                    >
                      <small>Size: </small>
                      {rep.size}
                    </Typography>
                  </div>
                  <div className="single lan">
                    <Typography
                      className="single"
                      component="span"
                      variant="caption"
                    >
                      <small>Created:</small> {rep.created_at}
                    </Typography>
                    <Typography
                      className="single"
                      component="span"
                      variant="caption"
                    >
                      <small>Updated: </small>
                      {rep.updated_at}
                    </Typography>
                  </div>
                  <div className="single lan">
                    <Typography
                      className="single"
                      component="span"
                      variant="caption"
                    >
                      <small>Issues: </small>
                      {rep.open_issues}
                    </Typography>
                  </div>
                  <div>
                    <h6>To Clone</h6>
                    <p>{rep.clone_url}</p>
                  </div>
                </Paper>
              </Container>
            );
          })}
      </Box>
    </div>
  );
}

export default MySingleRepo;