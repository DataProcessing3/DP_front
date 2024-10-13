import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <>
            <Link to="/">
                <h1>데이터처리 3조</h1>
            </Link>
        </>
    );
}

export default Header;
