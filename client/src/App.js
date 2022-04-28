import React, { Fragment } from "react";
import "./App.css";
import { Container } from "@material-ui/core";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

//components

import InputEmployee from "./components/InputEmployee";
import ListEmployees from "./components/ListEmployees";
import EditEmployee from "./components/EditEmployee";
import ButtonAppBar from "./components/Navbar";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <Fragment>
          <Container fixed>
            <ButtonAppBar />
            <Routes>
              <Route index path="/" element={<ListEmployees />} />
              <Route path="/employees/new" element={<InputEmployee />} />
              <Route path="/employees/:id/edit" element={<EditEmployee />} />
            </Routes>
          </Container>
        </Fragment>
      </Router>
    </LocalizationProvider>
  );
}

export default App;
