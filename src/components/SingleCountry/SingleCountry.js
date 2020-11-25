import React from 'react';
import './SingleCountry.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const SingleCountry = (props) => {
    const {flag, name, region, alpha2Code} = props.country;
    return (
        <div className="single-country">
            <img src={flag} alt="" />
            <h3>{name}</h3>
            <div className="region">
                <h4>{region}</h4>
                <FontAwesomeIcon className="icon" icon={faStar} />
            </div>
            <Link to={"/country/"+alpha2Code}><button className="btn btn-block btn-secondary mt-2">Explore</button></Link>
        </div>
    );
};

export default SingleCountry;