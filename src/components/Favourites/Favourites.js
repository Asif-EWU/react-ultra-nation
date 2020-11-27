import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import SingleCountry from '../SingleCountry/SingleCountry';

const Favourites = () => {
    const [favouriteList, setFavouriteList] = useState([]);

    useEffect(() => {
        const savedCountryList = getDatabaseCart();
        const countryKeys = Object.keys(savedCountryList);
        setFavouriteList(countryKeys);
    }, []);

    return (
        <div className="favourites">
            <Header />
            <SideNav />

            <div className="left-margin country-section">
                <h1 className="headline">Favourites: ({})</h1>
                {
                    // favouriteList.map(countryKey => <SingleCountry 
                    //     key={countryKey}
                    //     countryKey={countryKey} 
                    //     favouriteList={favouriteList}
                    //     addFavourites={addFavourites}
                    // />)
                }
            </div>
        </div>
    );
};

export default Favourites;