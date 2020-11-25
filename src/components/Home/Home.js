import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import SingleCountry from '../SingleCountry/SingleCountry';
import './Home.css';

const Home = () => {
    const [countryList, setCountryList] = useState([]);

    let url = 'https://restcountries.eu/rest/v2/all';
    const {regionName} = useParams();
    if(regionName) url = `https://restcountries.eu/rest/v2/region/${regionName}`;

    useEffect(() => {
        fetch(url)
        .then(res => res.json())
        .then(data => setCountryList(data));
    }, []);

    return (
        <div className="home">
            <Header />
            <SideNav />            

            <div className="left-margin country-section">
                {
                    countryList.map(country => <SingleCountry key={country.alpha2Code} country={country} />)
                }
            </div>
        </div>
    );
};

export default Home;