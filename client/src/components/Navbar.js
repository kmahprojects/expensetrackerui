import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav>
            <div className="nav-wrapper indigo">
            <Link to="/" className="brand-logo center">Expense Tracker</Link>
            <ul id="nav-mobile" className="right">
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/create'>Create</Link></li>
                <li><Link to='/update'>Update</Link></li>
                <li><Link to='/delete'>Delete</Link></li>
                <li><Link to='/about'>About</Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar
