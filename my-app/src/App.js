import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataAnalysis from './pages/DataAnalysis';
import KIS from './pages/KIS';
import NaverNews from './pages/NaverNews';
import Main from './pages/Main';
import Header from './pages/Header';
import Bottom from './pages/Bottom';

const App = () => {
	return (
		<div className='app-container'>
		<div>
    	<BrowserRouter>
    	<Header>
		</Header>
		<div className='container-box'>
			<Routes>
				<Route path="/" element={<Main />}></Route>
				<Route path="/DataAnalysis" element={<DataAnalysis />}></Route>
        		<Route path="/NaverNews" element={<NaverNews />}></Route>
				<Route path="/KIS" element={<KIS />}></Route>
			</Routes>
		</div>
		<Bottom />
		</BrowserRouter>
		</div>
		</div>
	);
}

export default App