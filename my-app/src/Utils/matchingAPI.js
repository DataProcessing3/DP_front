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

// 서버 포트 설정
app.listen(8000, () => {
    console.log('Server running on port 8000');
});
