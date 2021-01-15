import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme.js";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login"
import Signup from "./pages/Signup"

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = React.useState(true)

  return (
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <Route exact path="/">
          {loggedIn ? <Redirect to="/signup" /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

      </BrowserRouter>
    </MuiThemeProvider>
  );
}

export default App;
