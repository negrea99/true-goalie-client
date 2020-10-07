import Home from "./modules/home"
import Login from "./modules/login";
import Register from "./modules/register";
import React, { useState, useEffect } from "react";

import FileUpload from './modules/myactivity'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  const token = localStorage.getItem('token') || null;

  const onClickLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  return (
    <Router>
      <div>
        <nav className="navigation">
          <ul className="navigation-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            {
              token
              ? <li>
              <Link to="/myactivity">My Activity</Link>
            </li>
            : null
            }
            
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            {
              token
              ? <li>
              <Link className="Logout-btn" onClick={onClickLogout} to="/">Logout</Link>
            </li>
              : null
            }
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/myactivity">
            <FileUpload />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
