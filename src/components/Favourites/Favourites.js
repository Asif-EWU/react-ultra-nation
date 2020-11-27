import React, { useEffect, useState } from 'react';
import { addToDatabase, getDatabase, clearDatabase, removeFromDatabase } from '../../utilities/databaseManager';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import SingleCountry from '../SingleCountry/SingleCountry';

const Favourites = () => {
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

    function clearFavourites() {
        clearDatabase();
        setFavouriteList([]);
    }

    return (
        <div className="favourites">
            <Header />
            <SideNav favouriteList={favouriteList} />
            
            <div className="left-margin country-section">
                <div className="headline">
                    <h1>Favourites: {favouriteList.length}</h1>
                    <button 
                        style={{marginRight: "60px"}}
                        className="btn btn-danger"
                        onClick={clearFavourites}
                    >Clear Favourites</button>
                </div>
                {
                    favouriteList.map(countryKey => <SingleCountry 
                        key={countryKey}
                        countryKey={countryKey} 
                        favouriteList={favouriteList}
                        addFavourites={addFavourites}
                    />)
                }
            </div>
        </div>
    );
};

export default Favourites;