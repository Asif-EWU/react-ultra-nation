import React, { createContext, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Favourites from './components/Favourites/Favourites';
import NotFound from './components/NotFound/NotFound';
import CountryDetails from './components/CountryDetails/CountryDetails';
import { addToDatabase, getDatabase, removeFromDatabase } from './utilities/databaseManager';

export const MyContext = createContext();

function App() {
  const [favouriteList, setFavouriteList] = useState([]);
  useEffect(() => {
      const savedCountryList = getDatabase();
      const countryKeys = Object.keys(savedCountryList);
      setFavouriteList(countryKeys);
  }, []);

  function addFavourites(countryKey) {
      let newFavouriteList;
      if(favouriteList.find(fav => fav === countryKey)) {
          newFavouriteList = favouriteList.filter(favCountryKey => favCountryKey !== countryKey);
          removeFromDatabase(countryKey);
      }
      else {
          newFavouriteList = [...favouriteList, countryKey];
          addToDatabase(countryKey);
      }

      setFavouriteList(newFavouriteList);
  }

  return (
    <Router>
        <MyContext.Provider value={{favouriteList, setFavouriteList, addFavourites}} >
          <Switch>
            <Route exact path={["/", "/home", "/all", "/region/:regionName"]} component={Home} />
            <Route path="/countryDetails/:countryKey" component={CountryDetails} />
            <Route path="/favourites" component={Favourites} />
            <Route path="*" component={NotFound} />
          </Switch>
        </MyContext.Provider>
    </Router>
  );
}

export default App;
