
const express = require('express');
const app = express();

// 기본 경로에 대한 응답
app.get('/', (req, res) => {
    res.send("Hello from Express Server!!");
});


// 서버 실행
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

