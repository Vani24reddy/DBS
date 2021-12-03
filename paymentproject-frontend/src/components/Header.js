import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <div>
            <header className="header">
                <div>
                <Link to="/" className="navbar-brand">DBS Application Payment</Link>
                </div>
            </header>
        </div>
    )
}

export default Header