import React from "react";
import { createRoot } from 'react-dom/client';
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import Navbar from "./components/navbar";
import NotFound from "./components/not_found";

import Home from "./routes/Home/Home";
import Search from "./routes/Jobs/Search/Search";

import "index.css";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route index element={<Navigate to={"/home"} />} />
          <Route path='*' element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/jobs">
            <Route index path="*" element={<NotFound />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);