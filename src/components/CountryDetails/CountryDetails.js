import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';

const CountryDetails = () => {
    const {countryKey} = useParams();

    return (
        <div>
            <Header />
            <SideNav />
            <div className="left-margin">
                countryCode = {countryKey}
            </div>
        </div>
    );
};

export default CountryDetails;