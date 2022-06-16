import * as React from "react";
import { createRoot } from "react-dom/client";
import Layout from "./pages/Layout";

const App = () => {
  return (
    <Layout />
  );
};

const root = createRoot(document.getElementById("app"));
root.render(
    <App />
);
