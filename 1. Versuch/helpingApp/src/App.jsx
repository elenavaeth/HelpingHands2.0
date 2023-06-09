import React from "react";
import ReactDOM from "react-dom";
import { Help } from "helpingservice/Help"
import { User } from "userservice/User"

import "./index.css";

const App = () => (
  <div className="container">
    <h1>Helping-App</h1>
      <Help />
      <User />
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
