import React, { Component } from "react";
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import CalendarContainer from "./containers/calendarContainer";
import Header from "./containers/header";

class App extends Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <CalendarContainer />
        </div>
      </Provider>
    );
  }
}

export default App;
