import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import SingleCountry from '../SingleCountry/SingleCountry';
import './Home.css';

const Home = () => {
    const [countryList, setCountryList] = useState([]);
    let headline = "All";
    let url = 'https://restcountries.eu/rest/v2/all';
    const {regionName} = useParams();
    if(regionName) {
        url = `https://restcountries.eu/rest/v2/region/${regionName}`;
        headline = regionName;
    }
    
    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setCountryState(data));
    }, [url]);
    
    function setCountryState(data) {
        const countryKeys = data.map(country => country.alpha3Code);
        setCountryList(countryKeys);
    }
    
    const [favouriteList, setFavouriteList] = useState([]);
    useEffect(() => {
        const savedCountryList = getDatabaseCart();
        const countryKeys = Object.keys(savedCountryList);
        setFavouriteList(countryKeys);
    }, []);

    function addFavourites(countryKey) {
        let newFavouriteList;
        if(favouriteList.find(fav => fav === countryKey)) {
            newFavouriteList = favouriteList.filter(favCountryKey => favCountryKey !== countryKey);
            removeFromDatabaseCart(countryKey);
        }
        else {
            newFavouriteList = [...favouriteList, countryKey];
            addToDatabaseCart(countryKey);
        }

        setFavouriteList(newFavouriteList);
    }

    return (
        <div className="home">
            <Header />
            <SideNav favouriteList={favouriteList} />

            <div className="left-margin country-section">
                <h1 className="headline">Region: {headline} ({countryList.length})</h1>
                {
                    countryList.map(countryKey => <SingleCountry 
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

export default Home;