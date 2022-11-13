import React from "react";
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";

import Home from "./routes/Home/Home";

import "index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);


const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);