# React와 Express 통합 프로젝트 세팅 방법

## 전체 폴더 구조 요약 :
```
react-express-demo/
├── client/                 # React 애플리케이션
│   ├── public/
│   ├── src/
│   ├── build/              # React 빌드 결과물
│   └── package.json
├── server/                 # 백엔드 코드
│   ├── src/
│   │   └── server.js
└── package.json            # Express 디펜던시
```

---

### **1. 프로젝트 폴더 생성**

#### 터미널 명령어:
```bash
cd D:\WorkSpaces\react_workspace
mkdir react-express-demo\server
cd react-express-demo\server
```

#### 설명:
1. `cd D:\WorkSpaces\react_workspace`:
   - 기존 작업 공간으로 이동.
2. `mkdir react-express-demo\server`:
   - react_workspace 안에 새로운 프로젝트의 서버 폴더 생성.
3. `cd react-express-demo\server`:
   - 생성된 폴더로 이동.

---

### **2. Node.js 초기화**

#### 터미널 명령어:
```bash
npm init -y
```

#### 설명:
- `npm init -y`:
  - 기본 설정으로 `package.json` 파일을 생성.
  - `package.json`은 프로젝트의 디펜던시와 스크립트를 관리하는 데 사용됨.

---

### **3. Express (백엔드) 설정**

#### Express 설치:
`react-express-demo\server` 위치에서 : 
```bash
npm install express
```

#### 간단한 Express 서버 코드 작성:
1. VS Code에서 `src` 폴더 생성:
   - 프로젝트 폴더(`react-express-demo\server`) 안에 `src`라는 폴더를 만듦.
        ```bash
        mkdir src
        ```
2. `src/server.js` 파일 생성:
   - 아래 코드를 입력:
     ```javascript
     const express = require('express');
     const app = express();

     // 기본 경로에 대한 응답
     app.get('/', (req, res) => {
         res.send('Hello from Express!');
     });

     // 서버 시작
     const PORT = 5000;
     app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`);
     });
     ```

#### 서버 실행 테스트:
1. 터미널 명령어:
   ```bash
   node src/server.js
   ```
2. 브라우저에서 `http://localhost:5000` 접속:
   - "Hello from Express!" 메시지가 표시되면 성공.

---

### **4. React (프론트엔드) 설정**

#### React 프로젝트 생성:
1. React 초기화 명령어:
   ```bash
   npx create-react-app client
   ```
2. 설명:
   - `npx create-react-app client`:
     - `react-express-demo` 폴더 안에 `client`라는 React 애플리케이션 폴더 생성.
   - 디렉토리 구조:
     ```
     react-express-demo/
     ├── server/
     │   ├── src/
     │   │   └── server.js
     ├── client/
     │   ├── public/
     │   ├── src/
     │   └── package.json
     └── package.json
     ```

#### React 개발 서버 실행:
1. 현재 서버 폴더(`react-express-demo\server`)에서 React 폴더(`react-express-demo\client`)로 이동:
   ```bash
   cd ../client
   ```
2. React `개발 서버` 실행:
   ```bash
   npm start
   ```
3. 브라우저에서 `http://localhost:3000` 접속:
   - React 기본 템플릿이 보이면 성공.

---

### **5. React와 Express 통합**

#### Express에서 React 정적 파일 제공:
1. `/server/src/server.js` 수정:
   - React에서 빌드된 정적 파일을 Express 서버에서 제공하도록 설정:
     ```javascript
     const express = require('express');
     const path = require('path');
     const app = express();

     // React 정적 파일 제공
     app.use(express.static(path.join(__dirname, '../client/build')));

     // 모든 경로에 대해 React index.html 반환
     app.get('*', (req, res) => {
         res.sendFile(path.join(__dirname, '../client/build/index.html'));
     });

     const PORT = 5000;
     app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`);
     });
     ```

2. React 빌드:
   - React 프로젝트를 `배포용`으로 빌드:
     ```bash
     cd client
     npm run build
     ```
   - React의 빌드 결과물이 `client/build` 폴더에 생성됨.

3. Express 서버 실행:
   - 서버 폴더(`react-express-demo\server`)로 이동 후 Express 서버 실행:
     ```bash
     cd ../
     node /src/server.js
     ```
   - 브라우저에서 `http://localhost:5000` 접속:
     - React 애플리케이션이 표시되면 성공.

---

### **최종 디렉토리 구조**

```
react-express-demo/
├── client/                 # React 애플리케이션
│   ├── public/
│   ├── src/
│   ├── build/              # React 빌드 결과물
│   └── package.json
├── server/                 # 백엔드 코드
│   ├── src/
│   │   └── server.js
└── package.json            # Express 디펜던시
```

---

### **6. 추가 작업 (선택 사항)**

#### 1. 프록시 설정 (개발 중 CORS 문제 해결):
- `client/package.json` 파일에 추가:
  ```json
  "proxy": "http://localhost:5000"
  ```
- React에서 Express API를 호출할 때, CORS 문제 없이 요청할 수 있음.

#### 2. Nodemon 설치 (개발 편의성):
- Express 서버를 수정할 때마다 자동으로 재시작되도록 설정:
  ```bash
  npm install -g nodemon
  nodemon server/src/server.js
  ```

#### 3. 프론트(리액트) 즉각 반영 : 
- client 폴더에서 `npm run build` 대신 `npm start` 으로 하면 프론트엔드 코드 수정시 즉각 반영됨.
---