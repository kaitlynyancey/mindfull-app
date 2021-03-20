import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav() {
    return (
        <nav className="container">
            <Link to='/'>
                Home
            </Link>
            <Link to='/about'>
                About
            </Link>
            <Link to='/entry'>
                New Entry
            </Link>
            <Link to='/journal'>
                Journal
            </Link>
            <Link to='/login'>
                Login / Sign Up
            </Link>
        </nav>
    )
}