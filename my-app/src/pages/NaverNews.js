import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../App.css";

function NaverNews() {
  const [newsData, setNewsData] = useState([]);
  const [blogData, setBlogData] = useState([]);
  const [cafeData, setCafeData] = useState([]);
  const [query, setQuery] = useState("주식"); // 기본 검색어 설정
  const [loading, setLoading] = useState(false); // 로딩 상태 추가

  const fetchSearchResults = async () => {
    if (query.trim().length < 2) {
      alert("검색어는 최소 2자 이상이어야 합니다.");
      return;
    }

    setLoading(true);
    console.log(`Fetching results for query: ${query}`); // 디버깅용 로그 추가
    try {
      // 백엔드에서 데이터 가져오기
      const response = await axios.get('http://localhost:8080/api/search', {
        params: { query }
      });
      console.log("Response data:", response.data); // 응답 데이터 확인
      // 각 항목 설정
      setNewsData(response.data.news || []);
      setBlogData(response.data.blog || []);
      setCafeData(response.data.cafe || []);
    } catch (error) {
      console.error("Error fetching Naver search data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, []); // 빈 배열이므로 컴포넌트가 처음 마운트될 때만 실행

  return (
    <div className="body-form">
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

      <div className="results-container">
        {loading ? (
          <p>Loading...</p> // 로딩 중 표시
        ) : (
          <>
            {/* 뉴스 파트 */}
            {newsData.length > 0 && (
              <div className='data-container-news'>
                <h2 className="section-title">뉴스</h2>
                <ul className="rectangle-news" style={{ listStyleType: 'none' }}>
                  {newsData.map((item, index) => (
                    <li key={index} className="result-item">
                      <div className="item-box">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-title">
                          {item.title}
                        </a>
                        <p className="result-description small-text">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 블로그 파트 */}
            {blogData.length > 0 && (
              <div className='data-container-news'>
                <h2 className="section-title">블로그</h2>
                <ul className="rectangle-news" style={{ listStyleType: 'none' }}>
                  {blogData.map((item, index) => (
                    <li key={index} className="result-item">
                      <div className="item-box">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-title">
                          {item.title}
                        </a>
                        <p className="result-description small-text">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 카페 파트 */}
            {cafeData.length > 0 && (
              <div className='data-container-news'>
                <h2 className="section-title">카페</h2>
                <ul className="rectangle-news" style={{ listStyleType: 'none' }}>
                  {cafeData.map((item, index) => (
                    <li key={index} className="result-item">
                      <div className="item-box">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="link-title">
                          {item.title}
                        </a>
                        <p className="result-description small-text">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default NaverNews;
