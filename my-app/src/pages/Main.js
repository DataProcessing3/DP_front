import React from 'react'; // React와 useState를 import

const Main = (props) => {


    return (
		<>
		<div className='body-form'>
			<div className='sub-title'>
				메뉴
			</div>
			<div className='data-container'>
				<div className="rectangle">
					<img src="/img/analy.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
					<p>분석</p>
					</div>
				<div className="rectangle">
					<img src="/img/info.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
					<p>정보</p>
					</div>
			</div>
			<div className='data-container'>
				<div className="rectangle">
					<img src="/img/news.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
					<p>뉴스</p>
					</div>
				<div className="rectangle">
					<img src="/img/rec.png" alt="Your Image" style={{ maxWidth: '40%', maxHeight: '40%', objectFit: 'contain' }} />
					<p>추천</p>
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
