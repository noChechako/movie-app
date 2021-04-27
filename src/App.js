import './App.css';
import React from "react";
import { Switch, Route, Router } from "react-router-dom";
import { Home } from "./components/home/home";
import {MovieDetail} from "./components/moviedetail/movieDetail"
import { Actor } from './components/actor/actor';


function App() {
  return (
    <main> 
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:id" component={MovieDetail} />
        <Route path="/actor/:id" component={Actor} />
      </Switch>
    </main>
  )
}

export default App;
