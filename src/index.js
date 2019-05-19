import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import Layout from "./containers/Layout/Layout";

import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
