import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataAnalysis from './pages/DataAnalysis';
import Information from './pages/KIS';
import Recommand from './pages/Recommand';
import News from './pages/NaverNews';
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
				<Route path="/Information" element={<Information />}></Route>
        		<Route path="/News" element={<News />}></Route>
				<Route path="/Recommand" element={<Recommand />}></Route>
			</Routes>
		</div>
		<Bottom />
		</BrowserRouter>
		</div>
		</div>
	);
}

export default App