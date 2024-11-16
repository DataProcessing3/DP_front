import React, { useEffect, useState } from 'react';
import axios from "axios";

const KIS = () => {
	const [capitalRank, setCapitalRank] = useState([]);
	const [profitLoss, setProfitLoss] = useState([]);
	const [financialRatio, setFinancialRatio] = useState([]);
	const [volumeRank, setVolumeRank] = useState([]);
	const [query, setQuery] = useState("삼성전자"); // 기본 검색어 설정

	const fetchSearchResults = async () => {

		if (query.trim().length < 2) {
			alert("검색어는 최소 2자 이상이어야 합니다.");
			return;
		}

		console.log(`Fetching results for query: ${query}`); // 디버깅용 로그 추가
		try {

			const companyResponse = await axios.get(`http://localhost:8000/get-iscd/${query}`);
			const iscd = companyResponse.data.iscd;
			console.log("Found iscd:", iscd);
	
			if (!iscd) {
				alert('해당 기업명을 찾을 수 없습니다.');
				return;
			}

			// 기업명 검색어로 재무비율 가져오기 (예: 005930)
			const financialRatioResponse = await axios.get(`http://localhost:8080/financial-ratio/${iscd}/0`);
			console.log("Financial Ratio:", financialRatioResponse.data); // 재무비율 데이터 확인

			// 2020년 이상의 재무비율 데이터만 필터링
			const filteredFinancialRatio = financialRatioResponse.data.filter(item => parseInt(item.bsop_prfi_inrt) >= 202000);
			console.log("Filtered Financial Ratio (2020 and above):", filteredFinancialRatio);

			// 기업명 검색어로 손익계산서 가져오기
			const profitLossResponse = await axios.get(`http://localhost:8080/profit-loss/${iscd}/0`);
			console.log("Profit Loss:", profitLossResponse.data); // 손익계산서 데이터 확인

			// 2020년 이상의 손익계산서 데이터만 필터링
			const filteredProfitLoss = profitLossResponse.data.filter(item => parseInt(item.stac_year) >= 202000);
			console.log("Filtered Profit Loss (2020 and above):", filteredProfitLoss);

			// 각 항목 설정
			setFinancialRatio(filteredFinancialRatio || []);
			setProfitLoss(filteredProfitLoss || []);

		} catch (error) {
			console.error("Error fetching financial data:", error);
		}

	};

	useEffect(() => {
		fetchSearchResults();

		// 시가총액 순위 가져오기
		axios.get("http://localhost:8080/capital-rank")
			.then(response => {
				const top10CapitalRank = response.data.slice(0, 10);  // 상위 10개 항목만 추출
				setCapitalRank(top10CapitalRank);
			})
			.catch(error => console.error("Error fetching capital rank:", error));

		// 거래량 순위 가져오기
		axios.get("http://localhost:8080/volume-rank")
			.then(response => {
				const top10VolumeRank = response.data.slice(0, 10);  // 상위 10개 항목만 추출
				setVolumeRank(top10VolumeRank);
			})
			.catch(error => console.error("Error fetching volume rank:", error));
	}, []);

	return (
		<div className='body-form' style={{ height: "100%" }} >
			{/* 검색어 입력 폼 */}
			<div className="search-form">
				<input
					type="text"
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					placeholder="검색어를 입력하세요"
					className="search-input"
				/>
				<button className="search-button" onClick={fetchSearchResults}>
					검색
				</button>
			</div>
			<div className='data-container'>
				<div className='body' style={{ width: '100%' }}>

					<h1>손익계산서</h1>
					{profitLoss.length > 0 ? (
						<table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', marginTop: '20px', width: '60%' }}>
							<thead style={{ backgroundColor: '#ffffff' }}>
								<tr>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>결산 년도</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>매출액</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>영업 이익</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>당기 순이익</th>
								</tr>
							</thead>
							<tbody style={{ backgroundColor: '#ffffff' }}>
								{profitLoss.map((item, index) => (
									<tr key={index}>
										<td style={{ padding: '5px', textAlign: 'center' }}>{item.stac_year}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.sale_account}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.bsop_prti}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.thtr_ntin}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No data available</p>
					)}
					<h1 style={{ marginTop: '50px' }}>재무비율</h1>
					{financialRatio.length > 0 ? (
						<table style={{ backgroundColor: '#f2f2f2', borderCollapse: 'collapse', tableLayout: 'fixed', marginTop: '20px', width: '90%' }}>
							<thead style={{ backgroundColor: '#ffffff' }}>
								<tr>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>결산년도 (yyyymm)</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>매출액 증가율</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>영업이익 증가율</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>ROE</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>EPS</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>BPS</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>주당 매출액</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>부채비율</th>
								</tr>
							</thead>
							<tbody style={{ backgroundColor: '#ffffff' }}>
								{financialRatio.map((item, index) => (
									<tr key={index}>
										<td style={{ padding: '5px', textAlign: 'center' }}>{item.bsop_prfi_inrt}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.grs}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.stac_yymm}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.roe}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.eps}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.bps}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.sps}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.lblt_rate}</td>
									</tr>
								))}
							</tbody>
						</table>
					) : (
						<p>No data available</p>
					)}

					<div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '50px', paddingBottom: '30px' }}>
						<div style={{ flex: 1, textAlign: 'left' }}>
							<h1>시가총액 순위</h1>
							<table style={{ backgroundColor: '#f2f2f2', borderCollapse: 'collapse', tableLayout: 'fixed', marginTop: '20px' }}>
								<thead style={{ backgroundColor: '#ffffff' }}>
									<tr>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>순위</th>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>기업명</th>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>주식 수량</th>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>주식 가격</th>
									</tr>
								</thead>
								<tbody style={{ backgroundColor: '#ffffff' }}>
									{capitalRank.map((item, index) => (
										<tr key={index}>
											<td style={{ padding: '5px', textAlign: 'center' }}>{item.dataRank}</td>
											<td style={{ padding: '5px', textAlign: 'center' }}>{item.htsKorIsnm}</td>
											<td style={{ padding: '5px', textAlign: 'right' }}>{item.stckAvls}</td>
											<td style={{ padding: '5px', textAlign: 'right' }}>{item.stckPrpr}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						<div style={{ flex: 1, }}>
							<h1>거래량 순위</h1>
							<table style={{ backgroundColor: '#f2f2f2', borderCollapse: 'collapse', tableLayout: 'fixed', marginTop: '20px' }}>
								<thead style={{ backgroundColor: '#ffffff' }}>
									<tr>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>순위</th>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>기업명</th>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>주식 가격</th>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>평균 거래량</th>
										<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>거래량 비율</th>
									</tr>
								</thead>
								<tbody style={{ backgroundColor: '#ffffff' }}>
									{volumeRank.map((item, index) => (
										<tr key={index}>
											<td style={{ padding: '5px', textAlign: 'center' }}>{item.avrgVol}</td>
											<td style={{ padding: '5px', textAlign: 'center' }}>{item.htsKorIsnm}</td>
											<td style={{ padding: '5px', textAlign: 'right' }}>{item.stckPrpr}</td>
											<td style={{ padding: '5px', textAlign: 'right' }}>{item.dataRank}</td>
											<td style={{ padding: '5px', textAlign: 'right' }}>{item.volInrt}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default KIS;
