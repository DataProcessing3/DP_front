import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../App.css";

function Header(props) {
    return (
        <div>
            <div className='MainTitle'>
                <Link to="/" className='custom-link'>
                    <a>데이터처리 3조</a>
                </Link>
                <div className="underline"></div>
            </div>
            <div>
                <div className="nav-container">
                    <NavLink to="/" activeClassName='active'>
                        <span>홈</span>
                    </NavLink>
                    <NavLink to="/DataAnalysis" activeClassName='active'>
                        <span>데이터 분석</span>
                    </NavLink>
                    <NavLink to="/NaverNews" activeClassName='active'>
                        <span>네이버 뉴스</span>
                    </NavLink>
                    <NavLink to="/KIS" activeClassName='active'>
                        <span>한국 투자 증권</span>
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export default Header;
