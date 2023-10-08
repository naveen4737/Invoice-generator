import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';
import { Provider } from 'react-redux'
import InvoiceList from './components/InvoiceList';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import store from './utils/store';

class App extends Component {

  render() {
  return (
    <Router>
      <Provider store={store}>
        <div className="App d-flex flex-column align-items-center justify-content-center w-100">
          <Container>
            <Switch>
              <Route path="/add">
                <InvoiceForm />
              </Route>
              <Route path="/edit">
                <InvoiceForm />
              </Route>
              <Route path="/">
                <InvoiceList />
              </Route>
            </Switch>
          </Container>
        </div>
      </Provider>
    </Router>
  );
}}

export default App;
