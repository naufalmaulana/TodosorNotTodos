import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./assets/css/styles.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Add from "./Add.jsx";
import Edit from "./Edit.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/edit/:id",
    element: <Edit />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
