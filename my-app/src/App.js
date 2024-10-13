import React, { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DataAnalysis from './pages/DataAnalysis';
import KIS from './pages/KIS';
import NaverNews from './pages/NaverNews';
import Main from './pages/Main';
import Header from './pages/Header';

const App = () => {
	return (
		<div className='App'>
      <BrowserRouter>
      <Header/>
				<Routes>
					<Route path="/" element={<Main />}></Route>
					<Route path="/Main/DataAnalysis" element={<DataAnalysis />}></Route>
          <Route path="/Main/NaverNews" element={<NaverNews />}></Route>
					<Route path="/Main/KIS" element={<KIS />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App