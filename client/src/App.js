import React, { Fragment } from 'react';
import './App.css';
import { Container } from '@material-ui/core';

//components

import InputEmployee from './components/InputEmployee';
import ListEmployees from './components/ListEmployees';


function App() {
  return (
    <Fragment>
      <Container fixed>
        <InputEmployee />
        <ListEmployees />
      </Container>
    </Fragment>
  );
}

export default App;
