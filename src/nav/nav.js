import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faLightbulb, faPencilAlt, faBook } from '@fortawesome/free-solid-svg-icons';


export default function Nav() {
    //get font awesome icons
    const home = <FontAwesomeIcon icon={faHome} />
    const light = <FontAwesomeIcon icon={faLightbulb} />
    const pencil = <FontAwesomeIcon icon={faPencilAlt} />
    const book = <FontAwesomeIcon icon={faBook} />

    return (
        <nav className="container">
            <Link to='/'>
                {home} Home
            </Link>
            <Link to='/about'>
                {light} About
            </Link>
            <Link to='/entry'>
                {pencil} New Entry
            </Link>
            <Link to='/journal'>
                {book} Journal
            </Link>
        </nav>
    )
}