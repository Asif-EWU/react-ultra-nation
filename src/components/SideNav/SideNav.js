import React from 'react';
import { Link } from 'react-router-dom';
import './SideNav.css';

const SideNav = (props) => {
    const favouriteList = props.favouriteList;
    
    return (
        <div className="side-nav">
            <Link className="head-link" to="/all">All</Link>
            <hr/>
            <span className="head-link">Region</span>
            <ul>
                <Link className="sub-link" to="/region/asia">Asia</Link>
                <Link className="sub-link" to="/region/europe">Europe</Link>
                <Link className="sub-link" to="/region/oceania">Oceania</Link>
                <Link className="sub-link" to="/region/africa">Africa</Link>
                <Link className="sub-link" to="/region/americas">Americas</Link>
            </ul>
            <hr/>
            <Link className="head-link" to="/favourites">Favourites: {favouriteList && favouriteList.length}</Link>
        </div>
    );
};

export default SideNav;