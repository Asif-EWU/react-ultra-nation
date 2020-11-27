import React, { useEffect, useState } from 'react';
import './SingleCountry.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const SingleCountry = (props) => {
    const [country, setCountry] = useState({});
    const {countryKey, favouriteList, addFavourites} = props;
    const {flag, name, region, alpha2Code} = country;

    useEffect(()=>{
        const url = `https://restcountries.eu/rest/v2/alpha/${countryKey}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setCountry(data));
    }, []);

    let starIcon = <FontAwesomeIcon onClick={()=>addFavourites(country)} style={{color: "white"}} className="icon" icon={faStar} />
    if(favouriteList.find(fav => fav === country.alpha3Code)) {
        starIcon = <FontAwesomeIcon onClick={()=>addFavourites(country)} style={{color: "yellow"}} className="icon" icon={faStar} />
    }

    return (
        <div className="single-country">
            <img src={flag} alt="" />
            <h3>{name}</h3>
            <div className="region">
                <h4>{region}</h4>
                {starIcon}
            </div>
            <Link to={"/country/"+alpha2Code}><button className="btn btn-block btn-secondary mt-2">Explore</button></Link>
        </div>
    );
};

export default SingleCountry;