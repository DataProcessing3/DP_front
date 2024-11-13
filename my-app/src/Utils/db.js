const mysql = require('mysql');

// MySQL 연결 객체 생성
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // MySQL 사용자명
    password: '0000', // MySQL 비밀번호
    database: 'matchingdb' // 데이터베이스 이름
});

// 연결하기
connection.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Database connected successfully');
});

module.exports = connection; // connection 객체 내보내기
