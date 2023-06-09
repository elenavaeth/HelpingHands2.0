import React from "react";
import ReactDOM from "react-dom";
import Help from "./components/Help"

import "./index.css";

const App = () => (
  <div className="container">
      <Help />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
