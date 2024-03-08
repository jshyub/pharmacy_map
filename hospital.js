let express = require("express");   // express 모듈을 사용할것을 require로 지정 
let axios = require("axios");
const mysql = require("mysql");

let app = express();    // express 객체를 할당
let port = process.env.PORT || 80;  // nodejs 환경설정에서 포트가 지정되어 있으면 그것을 쓰고 아니면 80포트를 사용

// MySQL 연결 설정
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "0000",
    database: "pharmach"
  });
  
connection.connect((err) => {
    if (err) {
      console.error("MySQL connection error: " + err.stack);
      return;
    }
    console.log("Connected to MySQL database");
});

app.use(express.static("public_html"));     // public_html 아래있는 모든파일들에 대해서 express 모듈의 웹서버가 구동

app.listen(port, function() {   // 서버 시작알림
    console.log("HTML 서버 시작됨");
});
// https://http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/erw1qPjO2qB/Tm5fpAvLoOLSZHXEAHBU2AXETayn/wThw0/81G4TWuI/LjN+9ln3CA4R5jpM4Gjc2IGWgBQc1g== 기상청 단기예보
// https://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=erw1qPjO2qB%2FTm5fpAvLoOLSZHXEAHBU2AXETayn%2FwThw0%2F81G4TWuI%2FLjN%2B9ln3CA4R5jpM4Gjc2IGWgBQc1g%3D%3D&Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10

app.get("/hospital_list", (req, res) => {
    let api = async() => {  // 교차된 리소스 보안문제를 해결하기 위함
        let response = null;

        try {
            response = await axios.get("http://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList?serviceKey=", {
                  params: {
                      "serviceKey": "erw1qPjO2qB%2FTm5fpAvLoOLSZHXEAHBU2AXETayn%2FwThw0%2F81G4TWuI%2FLjN%2B9ln3CA4R5jpM4Gjc2IGWgBQc1g%3D%3D&pageNo=1&numOfRows=10&sidoCd=110000&sgguCd=110019&emdongNm=%EC%8B%A0%EB%82%B4%EB%8F%99&yadmNm=%EC%84%9C%EC%9A%B8%EC%9D%98%EB%A3%8C%EC%9B%90&zipCd=2010&clCd=11&dgsbjtCd=01&xPos=127.09854004628151&yPos=37.6132113197367&radius=3000",
                      "pageNo": req.query.pageNo,                 // 페이지번호
                      "numOfRows": req.query.numOfRows,           // 한 페이지 결과 수
                      "sidoCd": req.query.sidoCd,                 // 시도코드
                      "sgguCd": req.query.sgguCd,                 // 시군구코드
                      "emdongNm": req.query.emdongNm,             // 읍면동명
                      "yadmNm": req.query.yadmNm,                 // 병원명(UTF-8 인코딩 필요)
                      "zipCd": req.query.zipCd,                   // 분류코드
                      "clCd": req.query.clCd,                     // 종별코드
                      "dgsbjtCd": req.query.dgsbjtCd,             // 진료과목코드
                      "xPos": req.query.xPos,                     // x좌표
                      "yPos": req.query.yPos,                     // y좌표
                      "radius": req.query.radius                  // 단위
                  }
              });
        } catch (error) {
            console.log(error);
        }
        return response;
    };

    api()
    .then((response) => {
      res.setHeader("Access-Control-Allow-Origin", "*");

    //   // 데이터 파싱 및 DB 저장
      if (response && response.data && response.data.response.body) {
        const items = response.data.response.body.items.item;

        items.forEach((item) => {
          const hospital = {
            
          };
        //   console.log(item)
          // 약국이 이미 존재하는지 확인
          connection.query(
            "SELECT * FROM pharmach_list WHERE dutyName = ?",
            [pharmacy.dutyName],
            (err, results) => {
              if (err) {
                console.error("MySQL select error: " + err.stack);
                return;
              }

              if (results.length === 0) {
                // 약국이 데이터베이스에 없으면 삽입
                connection.query(
                  "INSERT INTO pharmach_list SET ?",
                  pharmacy,
                  (err, insertResult) => {
                    if (err) {
                      console.error(
                        "MySQL insertion error: " + err.stack
                      );
                      return;
                    }
                    console.log(
                      "Pharmacy inserted: " + insertResult.insertId
                    );
                  }
                );
              } else {
                console.log(
                  "Pharmacy already exists: " + results[0].id
                );
              }
            }
          );
        });
      }

      res.json(response.data.response.body);
    })
    .catch((error) => {
      console.error("Error in API call: " + error);
      res.status(500).send("Internal Server Error");
    }); 
});