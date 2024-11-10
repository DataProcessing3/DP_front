import React, { useState } from 'react'; 
import { Link, NavLink } from 'react-router-dom';
import "../App.css";

function Header(props) {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // 여기에서 검색어에 대한 로직을 추가합니다.
        console.log("Searching for:", searchTerm);

        setSearchTerm('');
    };
    return (
        <div>
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
                            <span>분석</span>
                        </NavLink>
                        <NavLink to="/Information" activeClassName='active'>
                            <span>정보</span>
                        </NavLink>
                        <NavLink to="/NaverNews" activeClassName='active'>
                            <span>뉴스</span>
                        </NavLink>
                        <NavLink to="/Recommand" activeClassName='active'>
                            <span>추천</span>
                        </NavLink>
                    </div>
                </div>
            </div>
         
        </div>
    );
}

export default Header;
