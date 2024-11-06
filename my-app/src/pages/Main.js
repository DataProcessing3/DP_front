import React, { useState } from 'react'; // React와 useState를 import

const Main = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        // 여기에서 검색어에 대한 로직을 추가합니다.
        console.log("Searching for:", searchTerm);
    };

    return (
		<>
        <div className="main-container">
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="검색어를 입력하세요" 
                    className="search-input"
                />
                <button type="submit" className="search-button">검색</button>
            </form>
        </div>
		<div className='body-from'>
			<div className='sub-title'>
				메뉴
			</div>
			<div className='data-container'>
				<div class="rectangle">
					<img src="/img/analy.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
					</div>
				<div class="rectangle">
					<img src="/img/info.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
					</div>
			</div>
			<div className='data-container'>
				<div class="rectangle">
					<img src="/img/news.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
					</div>
				<div class="rectangle">
					<img src="/img/rec.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
					</div>
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
