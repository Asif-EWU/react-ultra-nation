import React, { useContext } from 'react';
import { MyContext } from '../../App';
import { clearDatabase } from '../../utilities/databaseManager';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import SingleCountry from '../SingleCountry/SingleCountry';

const Favourites = () => {
    const {favouriteList ,setFavouriteList} = useContext(MyContext);

    function clearFavourites() {
        clearDatabase();
        setFavouriteList([]);
    }

    return (
        <div className="favourites">
            <Header />
            <SideNav />
            
            <div className="left-margin country-section">
                <div className="headline">
                    <h1>Favourites: {favouriteList.length}</h1>
                    <button 
                        style={{marginRight: "60px"}}
                        className="btn btn-danger"
                        onClick={clearFavourites}
                    >
                        Clear Favourites
                    </button>
                </div>
                {
                    favouriteList.map(countryKey => <SingleCountry 
                        key={countryKey}
                        countryKey={countryKey} 
                    />)
                }
            </div>
        </div>
    );
};

export default Favourites;