import React, { Fragment } from 'react';
import './App.css';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


//components

import InputEmployee from './components/InputEmployee';
import ListEmployees from './components/ListEmployees';
import EditEmployee from './components/EditEmployee';
import ButtonAppBar from './components/Navbar';


function App() {
  return (
    <Router>
    <Fragment>
      <Container fixed>
      <ButtonAppBar />
      <Routes>
      <Route index path="/" element={<ListEmployees/> }  />
      <Route path="/employees/new" element={<InputEmployee />} />
      <Route path="/employees/:id/edit" element={<EditEmployee />} />
      </Routes>
      </Container>
    </Fragment>
    </Router>
  );
}

export default App;
