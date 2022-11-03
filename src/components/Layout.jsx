import { ErrorBoundary } from "react-error-boundary";
import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Container } from "@mui/material";

export const MyContextApi = React.createContext([]);

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <Container sx={{ marginTop: "80px" }}>
      <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button className="btn" onClick={resetErrorBoundary}>
          Reset
        </button>
      </div>
    </Container>
  );
}

function Layout({ children }) {
  const [error, setError] = useState("");
  const [repos, setRepos] = useState([]);
  const [explode, setExplode] = useState(false);
  return (
    <MyContextApi.Provider
      value={[error, setError, repos, setRepos, explode, setExplode]}
    >
      <Container disableGutters>
        <Header />
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setExplode(false)}
          resetKeys={[explode]}
        >
          <Container
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "70px",
            }}
          >
            {children}
          </Container>
          <Footer />
        </ErrorBoundary>
      </Container>
    </MyContextApi.Provider>
  );
}

export default Layout;
