
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import "../App.css";
const Main = (props) => {


	return (
		<>
			<div className='body-form'>
				<div className='sub-title'>
					메뉴
				</div>
				<div className='data-container'>
					<Link to="/Recommand" className="rectangle" style={{ textDecoration: 'none' }}>
						<img src="/img/analy.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
						<p>분석</p>
					</Link>
					<Link to="/Information" className="rectangle" style={{ textDecoration: 'none' }}>
						<img src="/img/info.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
						<p>정보</p>
					</Link>
				</div>
				<div className='data-container'>
					<Link to="/NaverNews" className="rectangle" style={{ textDecoration: 'none' }}>
						<img src="/img/news.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
						<p>뉴스</p>
					</Link>
					<Link to="/DataAnalysis" className="rectangle" style={{ textDecoration: 'none' }}>
						<img src="/img/rec.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
						<p>개발중...</p>
					</Link>
				</div>
				<div className='sub-title'>
					중시 동향
				</div>
				<div className='data-container'>
					<div className="rectangle"></div>
					<div className="rectangle"></div>
				</div>
			</div>
		</>
	);
};

export default Main;
