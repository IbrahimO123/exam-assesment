import React, { useState, useContext } from "react";
import { MyContextApi } from "./../components/Layout";
import { Typography, Container, Box, TextField } from "@mui/material";

function Bomb() {
  throw new Error("💥 CABOOM 💥");
}

function NotAHero({ name }) {
  if (name === "Joker" || name === "joker") {
    throw new Error("Joker is not a hero!");
  }
  return name.trim().length !== 0 ? name + " is an hero!" : null;
}

function ErrorBoundary() {
  const [, , , , explode, setExplode] = useContext(MyContextApi);
  const [hero, setHero] = useState("");
  return (
    <Container>
      <Typography variant="body1"> Error Boundary</Typography>

      {explode ? <Bomb /> : null}
      <p>
        <button className="btn" onClick={() => setExplode((e) => !e)}>
          toggle explode
        </button>
      </p>

      <Box>
        <TextField
          name="hero"
          variant="standard"
          value={hero}
          onChange={(e) => setHero(e.target.value)}
          label="Type hero name expect Joker"
          color={hero === "Joker" || hero === "joker" ? "error" : "info"}
        ></TextField>
        <div className="hero">
          <NotAHero name={hero} />
        </div>
      </Box>
    </Container>
  );
}

export default ErrorBoundary;
