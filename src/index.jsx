import "./style/Main.css";
import { Home } from "./views/Home/Home";
import React from "react";
import ReactDom from "react-dom/client";


const root = ReactDom.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);