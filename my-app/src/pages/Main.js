import React from 'react';
import { Link } from 'react-router-dom';

const Main = (props) => {
	return (
		<>
			<h3>안녕하세요. 메인페이지 입니다.</h3>
			<ul>
				<Link to="/Main/DataAnalysis">
                    <li>데이터 분석</li>
                </Link>
				<Link to="/Main/NaverNews">
                    <li>네이버 뉴스</li>
                </Link>
                <Link to="/Main/KIS">
                    <li>한국 투자 증권</li>
                </Link>
			</ul>
		</>
	);
};

export default Main;