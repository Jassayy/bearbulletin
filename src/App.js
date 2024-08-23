import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import { HashRouter, Routes, Route } from "react-router-dom";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "light", // Default mode is light
    };
  }

  // Method to toggle between light and dark mode
  toggleMode = () => {
    this.setState({
      mode: this.state.mode === "light" ? "dark" : "light",
    });
  };

  render() {
    return (
      <HashRouter>
        <div className={`App ${this.state.mode}`}>
          <Navbar toggleMode={this.toggleMode} mode={this.state.mode} />

          <Routes>
            <Route
              exact
              path="/"
              element={
                <News
                  mode={this.state.mode}
                  key="food"
                  country="in"
                  category="food"
                />
              }
            />
            <Route
              exact
              path="/food"
              element={
                <News
                  mode={this.state.mode}
                  key="about"
                  country="in"
                  category="about"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  mode={this.state.mode}
                  key="science"
                  country="in"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  mode={this.state.mode}
                  key="technology"
                  country="in"
                  category="technology"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  mode={this.state.mode}
                  key="entertainment"
                  country="in"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  mode={this.state.mode}
                  key="health"
                  country="in"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  mode={this.state.mode}
                  key="business"
                  country="in"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  mode={this.state.mode}
                  key="sports"
                  country="in"
                  category="sports"
                />
              }
            />
          </Routes>
        </div>
      </HashRouter>
    );
  }
}
