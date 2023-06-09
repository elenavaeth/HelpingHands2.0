import React from "react";
import ReactDOM from "react-dom";
import User from "./components/User";


import "./components/User.css";

const App = () => (
  <div className="container">
    <div>
      <h2>Deine Kontodaten</h2>
      <hr></hr>
      <h3><User></User></h3>
    </div>

  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
