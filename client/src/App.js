import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

//components

import Login from "./components/Login";
import InputEmployee from "./components/InputEmployee";
import ListEmployees from "./components/ListEmployees";
import EditEmployee from "./components/EditEmployee";
import ButtonAppBar from "./components/Navbar";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  //We hit the jwtAuth endpoint to check if the person is still verified
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Fragment>
          <Container fixed>
            <ButtonAppBar />
            <Routes>
              <Route
                exact
                path="/login"
                element={
                  !isAuthenticated ? (
                    <Login setAuth={setAuth} />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                index
                path="/"
                element={
                  isAuthenticated ? (
                    <ListEmployees setAuth={setAuth} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/employees/new"
                element={
                  isAuthenticated ? (
                    <InputEmployee setAuth={setAuth} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
              <Route
                exact
                path="/employees/:id/edit"
                element={
                  isAuthenticated ? (
                    <EditEmployee setAuth={setAuth} />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            </Routes>
          </Container>
        </Fragment>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
