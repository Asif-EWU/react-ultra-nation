import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Favourites from './components/Favourites/Favourites';
import NotFound from './components/NotFound/NotFound';
import CountryDetails from './components/CountryDetails/CountryDetails';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path={["/", "/home", "/all", "/region/:regionName"]} component={Home} />
        <Route path="/countryDetails/:countryKey" component={CountryDetails} />
        <Route path="/favourites" component={Favourites} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
