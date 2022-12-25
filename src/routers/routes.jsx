import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home";
import SearchRepo from "../pages/searchRepo";
import MyRepos from "../pages/gitAllRepo";
import MySingleRepo from "./../pages/gitSingleRepo";
import ErrorBoundary from "../pages/errorBoundary";
import NotFound from "./../pages/notfound";
import NotFoundPageTest from './../pages/404';

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/my-repos" element={<MyRepos />}></Route>
      <Route path="/my-repos/:id" element={<MySingleRepo />}></Route>
      <Route path="/error-boundary" element={<ErrorBoundary />}></Route>
      <Route path="/search-repos" element={<SearchRepo />}></Route>
      <Route path="/not-found-page" element={<NotFoundPageTest />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default Routing;
