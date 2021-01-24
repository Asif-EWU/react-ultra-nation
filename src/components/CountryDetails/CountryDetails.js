import React, { useContext, useEffect, useState } from 'react';
import './CountryDetails.css';
import { useParams } from 'react-router-dom';
import Header from '../Header/Header';
import SideNav from '../SideNav/SideNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { MyContext } from '../../App';

const CountryDetails = () => {
    const {favouriteList, setFavouriteList, addFavourites} = useContext(MyContext);
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
    }, [countryKey]);

    

    let starIcon = <FontAwesomeIcon onClick={()=>addFavourites(countryKey)} style={{color: "black"}} className="star-icon" icon={faStar} />
    if(favouriteList.find(fav => fav === countryKey)) {
        starIcon = <FontAwesomeIcon onClick={()=>addFavourites(countryKey)} style={{color: "goldenrod"}} className="star-icon" icon={faStar} />
    }

    return (
        <div className="country-details">
            <Header />
            <SideNav />

            <div className="left-margin">
                <img src={flag} alt=""/>
                <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>: {name} {starIcon}</td>
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
                </tbody>
                </table>
            </div>
        </div>
    );
};

export default CountryDetails;