import React, { Component } from "react";
import Page from "./components/Page";
import "./style.scss";


export default class App extends Component {
  render() {
    return (
      <div className="appRoot">
        <Page/>
      </div>
    );
  }
}
