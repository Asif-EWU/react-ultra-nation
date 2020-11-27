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
    const {flag, name, capital, demonym, alpha3Code, region, subregion, population, languages, currencies, timezones} = countryDetails;
    
    let countryPopulation, language, currency, timezone;
    if(population) countryPopulation = population.toLocaleString();
    if(languages) language = languages[0].name;
    if(currencies) currency = currencies[0].name;
    if(timezones) timezone = timezones[0];

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
                <table>
                    <tr>
                        <th>Name</th>
                        <td>: {name} <FontAwesomeIcon className="icon" icon={faStar} /></td>
                    </tr>
                    <tr>
                        <th>Name Code</th>
                        <td>: {alpha3Code}</td>
                    </tr>
                    <tr>
                        <th>Capital</th>
                        <td>: {capital}</td>
                    </tr>
                    <tr>
                        <th>Nationality</th>
                        <td>: {demonym}</td>
                    </tr>
                    <tr>
                        <th>Language</th>
                        <td>: {language}</td>
                    </tr>
                    <tr>
                        <th>Population</th>
                        <td>: {countryPopulation}</td>
                    </tr>
                    <tr>
                        <th>Region</th>
                        <td>: {region}</td>
                    </tr>
                    <tr>
                        <th>Subregion</th>
                        <td>: {subregion}</td>
                    </tr>
                    <tr>
                        <th>Currency</th>
                        <td>: {currency}</td>
                    </tr>
                    <tr>
                        <th>Timezone</th>
                        <td>: {timezone}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default CountryDetails;