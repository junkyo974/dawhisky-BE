// const mysql = require("mysql");
// const connection = mysql.createConnection({
//   host: "express-database.cvn9aovgyjwr.ap-northeast-2.rds.amazonaws.com",
//   user: "junkyo",
//   password: "as1864759",
//   database: "dawhisky_development",
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("MySQL 연결 실패:", err);
//     return;
//   }
//   console.log("MySQL에 연결되었습니다.");
// });

// async function scrapeData() {
//   const response = {
//     place: [],
//   };

//   // Scrape data from each place
//   const scrapedData = response.place.map(({ name, tel, img, address }) => ({
//     store: name,
//     phone: tel,
//     biz_photo: img,
//     address: address,
//   }));

//   for (let i = 0; i < scrapedData.length; i++) {
//     const insertQuery =
//       "INSERT INTO Stores (store, biz_photo, phone, address) VALUES (?, ?, ?)";
//     const insertValues = [
//       scrapedData[i].store,
//       scrapedData[i].biz_photo,
//       scrapedData[i].phone,
//       scrapedData[i].address,
//     ];

//     connection.query(insertQuery, insertValues, (error, fields) => {
//       if (error) {
//         console.error("데이터 삽입 실패:", error);
//       }
//     });
//   }
// }

// scrapeData().catch(console.error);
