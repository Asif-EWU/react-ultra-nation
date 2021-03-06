import React, { useContext, useEffect, useState } from 'react';
import './SingleCountry.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { MyContext } from '../../App';

const SingleCountry = (props) => {
    const {favouriteList, addFavourites} = useContext(MyContext);
    const [country, setCountry] = useState({});
    const {countryKey} = props;
    const {flag, name, region} = country;

    useEffect(() => {
        const url = `https://restcountries.eu/rest/v2/alpha/${countryKey}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setCountry(data));
    }, []);

    let starIcon = <FontAwesomeIcon onClick={()=>addFavourites(countryKey)} style={{color: "white"}} className="star-icon" icon={faStar} />
    if(favouriteList.find(fav => fav === countryKey)) {
        starIcon = <FontAwesomeIcon onClick={()=>addFavourites(countryKey)} style={{color: "yellow"}} className="star-icon" icon={faStar} />
    }

    return (
        <div className="single-country">
            <img src={flag} alt="" />
            <h3>{name}</h3>
            <div className="region">
                <h4>{region}</h4>
                {starIcon}
            </div>
            <Link to={"/countryDetails/"+countryKey}><button className="btn btn-block btn-secondary mt-2">Explore</button></Link>
        </div>
    );
};

export default SingleCountry;