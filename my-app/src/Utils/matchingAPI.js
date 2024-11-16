const express = require('express');
const connection = require('./db'); // db.js에서 connection 객체 가져오기
const cors = require('cors');
const app = express();

app.use(cors());

// 기업명을 기준으로 ISCD 값을 검색하는 API 엔드포인트
app.get('/get-iscd/:companyName', (req, res) => {
    const companyName = req.params.companyName; // URL 파라미터로 기업명 받기

    console.log('Received company name:', companyName); // 디버깅용
    
    // ISCD 값을 조회하는 SQL 쿼리 작성
    const query = 'SELECT 종목코드 FROM enterprise WHERE 종목명 = ?';
    connection.query(query, [companyName], (error, results) => {
        
        if (error) {
            console.error('Database query error:', error);
            return res.status(500).send('Database query error');
        }

        if (results.length === 0) {
            return res.status(404).send('Company not found');
        }

        // ISCD 값을 응답으로 보내기
        res.json({ iscd: results[0].종목코드 });
    });
});

app.get('/get-data', (req, res) => {
    const { companyName, category } = req.query;

    // `companyName`에 해당하는 `종목종류` 검색
    const getTypeQuery = 'SELECT SEC_NM_KOR FROM dataprocess_sector WHERE 종목명 = ? LIMIT 1';
    connection.query(getTypeQuery, [companyName], (error, results) => {
        if (error) {
            console.error('Error fetching data:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Company not found' });
        }

        const companyType = results[0].SEC_NM_KOR;
        console.log(companyType);
        // 같은 `종목종류`에 속하는 상위 10개 데이터 검색
        const getDataQuery = `
            SELECT 종목명, SEC_NM_KOR, 당기순이익, 매출액, 매출총이익, 자본, 자산, ROE
            FROM dataprocess_sector
            WHERE SEC_NM_KOR = ?
            ORDER BY ?? DESC
            LIMIT 10
        `;
        connection.query(getDataQuery, [companyType, category], (error, dataResults) => {
            if (error) {
                console.error('Error fetching data:', error);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            console.log(dataResults);

            res.json(dataResults);
        });
    });
});


// 서버 포트 설정
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
