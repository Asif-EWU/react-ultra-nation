import React from 'react';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import SingleCountry from '../SingleCountry/SingleCountry';

const Favourites = () => {
    return (
        <div className="favourites">
            <Header />
            <SideNav />

            <div className="left-margin country-section">
                <h1 className="headline">Favourites - {}</h1>
                {
                    //favouriteList.map(country => <SingleCountry key={country.alpha2Code} country={country} />)
                }
            </div>
        </div>
    );
};

export default Favourites;