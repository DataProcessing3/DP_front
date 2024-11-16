import React, { useEffect, useState } from 'react';
import axios from "axios";

function Recommand(props) {
	const [selectedCompanyName, setSelectedCompanyName] = useState('삼성전자');
	const [selectedCategory, setSelectedCategory] = useState('당기순이익');
	const [tableData, setTableData] = useState([]);
	const [loading, setLoading] = useState(false);

	// 검색 기능
	const fetchSearchResults = async () => {
		setLoading(true);
		try {
			const response = await axios.get('http://localhost:8000/get-data', {
				params: {
					companyName: selectedCompanyName, // 입력한 종목명
					category: selectedCategory,       // 선택한 카테고리
				},
			});
			setTableData(response.data); // 결과 데이터를 상태로 설정하여 표에 표시
		} catch (error) {
			console.error("Error fetching data:", error);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchSearchResults();
	  }, []); // 빈 배열이므로 컴포넌트가 처음 마운트될 때만 실행
	return (
		<div className='body-form' style={{ height: "100%" }}>
			{/* 검색어 입력 폼 */}
			<div className="search-form">
				<input
					type="text"
					value={selectedCompanyName}
					onChange={(e) => setSelectedCompanyName(e.target.value)}
					placeholder="기업명을 입력하세요"
					className="search-input"
				/>
				<select
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
					className="search-dropdown"
				>
					<option value="">카테고리 선택</option>
					<option value="당기순이익">당기순이익</option>
					<option value="매출액">매출액</option>
					<option value="매출총이익">매출총이익</option>
					<option value="자본">자본</option>
					<option value="자산">자산</option>
					<option value="ROE">ROE</option>
				</select>
				<button className="search-button" onClick={fetchSearchResults}>
					검색
				</button>
			</div>
			<div className='data-container'>
				<div className='body' style={{ width: '100%' }}>
					<h1> 추천 종목 </h1>

					{/* 로딩 상태 */}
					{loading && <p>Loading...</p>}

					{/* 테이블 데이터 */}
					{tableData.length > 0 && (
						<table style={{ borderCollapse: 'collapse', tableLayout: 'fixed', marginTop: '20px', width: '70%' }}>

							<thead style={{ backgroundColor: '#ffffff' }}>
								<tr>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>종목명</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>종목종류</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>당기순이익</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>매출액</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>매출총이익</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>자본</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>자산</th>
									<th style={{ padding: '10px', paddingRight: '10px', textAlign: 'center' }}>ROE</th>
								</tr>
							</thead>
							<tbody style={{ backgroundColor: '#ffffff' }}>
								{tableData.map((item, index) => (
									<tr key={index}>
										<td style={{ padding: '5px', textAlign: 'center' }}>{item.종목명}</td>
										<td style={{ padding: '5px', textAlign: 'center' }}>{item.SEC_NM_KOR}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.당기순이익}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.매출액}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.매출총이익}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.자본}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.자산}</td>
										<td style={{ padding: '5px', textAlign: 'right' }}>{item.ROE}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>


		</div>
	);
}

export default Recommand;
