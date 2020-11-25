import React, { useEffect, useState } from 'react';
import './CountryDetails.css';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const CountryDetails = () => {
    const {countryKey} = useParams();
    const [countryDetails, setCountryDetails] = useState({});
    const {flag, name, capital, region, subregion, population} = countryDetails;
    let countryPopulation;
    if(population) countryPopulation = population.toLocaleString();

    useEffect(() => {
        const url = `https://restcountries.eu/rest/v2/alpha/${countryKey}`;

        fetch(url)
        .then(res => res.json())
        .then(data => setCountryDetails(data));
    }, [])

    return (
        <div className="country-details">
            <Header />
            <SideNav />
            <div className="left-margin">
                <img src={flag} alt=""/>
                <p>
                    Name: {name} <FontAwesomeIcon className="icon" icon={faStar} /> <br/>
                    Capital: {capital} <br/>
                    Population: {countryPopulation} <br/>
                    Region: {region} <br/>
                    Subregion: {subregion} <br/>
                </p>
            </div>
        </div>
    );
};

export default CountryDetails;