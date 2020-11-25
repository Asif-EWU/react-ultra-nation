import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
    return (
        <div className="header bg-lightblue">
            <h1 className="title"><Link to="/home">ULTRA NATION</Link></h1>
        </div>
    );
};

export default Header;