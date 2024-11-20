
const express = require('express');
const path = require('path');
const app = express();

// React 정적 파일 제공
app.use(express.static(path.join(__dirname, '../../client/build')));

// 모든 경로에 대해 React index.html 제공
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

