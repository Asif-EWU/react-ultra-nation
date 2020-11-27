import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { addToDatabaseCart, getDatabaseCart, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import SingleCountry from '../SingleCountry/SingleCountry';
import './Home.css';

const Home = () => {
    const [countryList, setCountryList] = useState([]);
    const [favouriteList, setFavouriteList] = useState([]);

    let headline = "All";
    let url = 'https://restcountries.eu/rest/v2/all';
    const {regionName} = useParams();
    if(regionName) {
        url = `https://restcountries.eu/rest/v2/region/${regionName}`;
        headline = regionName;
    }

    function setCountryState(data) {
        const countryKeys = data.map(country => country.alpha3Code);
        setCountryList(countryKeys);
    }

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setCountryState(data));
    }, [url]);

    useEffect(()=>{
        const savedCountryList = getDatabaseCart();
        const countryKeys = Object.keys(savedCountryList);
        setFavouriteList(countryKeys);
    }, [])

    function addFavourites(country) {
        let newFavouriteList;
        if(favouriteList.find(fav => fav === country.alpha3Code)) {
            newFavouriteList = favouriteList.filter(favCountryKey => favCountryKey !== country.alpha3Code);
            removeFromDatabaseCart(country.alpha3Code);
        }
        else {
            newFavouriteList = [...favouriteList, country.alpha3Code];
            addToDatabaseCart(country.alpha3Code);
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