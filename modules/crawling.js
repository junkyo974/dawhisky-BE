// const puppeteer = require("puppeteer");
// const request = require("request");
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

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   const whiskyList = [];
//   const whiskyEngSet = new Set();

//   let i = 1;

//   while (true) {
//     const url = `https://www.whisky.com/whisky-database/bottle-search/whisky/fdb/Flaschen/search.html?type=1505224767&tx_datamintsflaschendb_pi4%5BsearchCriteria%5D%5BsortingCombined%5D=bewertungsAnzahl_descending&tx_datamintsflaschendb_pi4%5BsearchCriteria%5D%5BspiritType%5D=1&tx_datamintsflaschendb_pi4%5BcurPage%5D=${i}&tx_datamintsflaschendb_pi4%5BresultsOnly%5D=1`;

//     await page.goto(url);

//     for (let j = 1; j <= 16; j++) {
//       const whiskyLinks = await page.$$eval(
//         `#c30621 > div:nth-child(${j}) > div > div > div > div.fill > div > div > div.title > a`,
//         (elements) => elements.map((element) => element.href)
//       );

//       for (const whiskyLink of whiskyLinks) {
//         const whiskyPage = await browser.newPage();
//         await whiskyPage.goto(whiskyLink);

//         const whiskyData = await whiskyPage.evaluate(() => {
//           const whisky_eng1 = document
//             .querySelector(
//               "#c28865 > div > div > div > div > div > h1 > span > span.marke"
//             )
//             ?.innerText?.trim();
//           const whisky_eng2 = document
//             .querySelector(
//               "#c28865 > div > div > div > div > div > h1 > span > span.alterEtikett"
//             )
//             ?.innerText?.trim();
//           const whisky_eng3 =
//             document
//               .querySelector(
//                 "#c28865 > div > div > div > div > div > h1 > span > span.brenndatum"
//               )
//               ?.innerText?.trim() || "";
//           const whisky_eng4 =
//             document
//               .querySelector(
//                 "#c28865 > div > div > div > div > div > h1 > span > span.namenszusatz"
//               )
//               ?.innerText?.trim() || "";

//           const whisky_eng =
//             `${whisky_eng1} ${whisky_eng2} ${whisky_eng3} ${whisky_eng4}`
//               .trim()
//               .replace(/\s{2,}/g, " ");

//           const whisky_country = document
//             .querySelector(
//               "#attributes > tbody > tr:nth-child(4) > td > span > a:nth-child(1)"
//             )
//             ?.innerText?.trim();

//           const whisky_region = document
//             .querySelector(
//               "#attributes > tbody > tr:nth-child(4) > td > span > a:nth-child(2)"
//             )
//             ?.innerText?.trim();

//           const whisky_age = document
//             .querySelector("#attributes > tbody > tr.fassnummern > td > span")
//             ?.innerText?.trim();

//           const whisky_type = document
//             .querySelector("#attributes > tbody > tr.sorte > td > span > a")
//             ?.innerText?.trim();

//           const whisky_desc =
//             document
//               .querySelector(
//                 "#c28865 > div > div > div > div > div > div.article-image > div.col-md-8 > div > p"
//               )
//               ?.innerText?.trim() || "정보 없음";

//           const whisky_abv = document
//             .querySelector("#attributes > tbody > tr.alkoholgehalt > td > span")
//             ?.innerText?.trim();

//           const photo_url =
//             document
//               .querySelector(
//                 "#c28865 > div > div > div > div > div > div.article-image > div.col-xs-12.col-md-4 > div > div.images > div.image-slider.image-slider-with-thumbnails > div > div.bx-viewport > div > div:nth-child(1) > div > div > a > img"
//               )
//               ?.getAttribute("src") ||
//             document
//               .querySelector(
//                 "#c28865 > div > div > div > div > div > div.article-image > div.col-xs-12.col-md-4 > div > div.images > div.image-slider.image-slider-with-thumbnails > div > div > div > a > img"
//               )
//               ?.getAttribute("src");

//           const whisky_photo = "https://www.whisky.com/" + photo_url;

//           return {
//             whisky_eng,
//             whisky_country,
//             whisky_region,
//             whisky_age,
//             whisky_type,
//             whisky_desc,
//             whisky_abv,
//             whisky_photo,
//           };
//         });

//         if (!whiskyEngSet.has(whiskyData.whisky_eng)) {
//           whiskyList.push(whiskyData);
//           whiskyEngSet.add(whiskyData.whisky_eng);
//         }

//         await whiskyPage.close();

//         if (whiskyList.length >= 5) {
//           break;
//         }
//         // for (const whiskyList of whiskyList) {
//         //   const query = whiskyList.whisky_eng;
//         //   const api_url = "https://openapi.naver.com/v1/papago/n2mt";
//         //   const client_id = "Uj7d9jdvBCGEsQ_J8VJp";
//         //   const client_secret = "_CWWJSvuyv";

//         //   const options = {
//         //     method: "POST",
//         //     uri: api_url,
//         //     form: {
//         //       source: "en",
//         //       target: "ko",
//         //       text: query,
//         //     },
//         //     headers: {
//         //       "X-Naver-Client-Id": client_id,
//         //       "X-Naver-Client-Secret": client_secret,
//         //     },
//         //     json: true,
//         //   };

//         //   const response = await request(options);

//         //   if (response && response.message && response.message.result) {
//         //     const translatedText = response.message.result.translatedText;
//         //     whiskyData.whisky_kor = translatedText;
//         //     console.log(translatedText);
//         //   } else {
//         //     console.log("번역 실패");
//         //   }

//         const duplicateCheckQuery =
//           "SELECT COUNT(*) AS count FROM Whiskys WHERE whisky_eng = ?";
//         connection.query(
//           duplicateCheckQuery,
//           [whiskyData.whisky_eng],
//           (error, results, fields) => {
//             if (error) {
//               console.error("중복검사 실패:", error);
//             } else {
//               const count = results[0].count;
//               if (count === 0) {
//                 const insertQuery = `
//               INSERT INTO Whiskys (whisky_eng, whisky_kor, whisky_country, whisky_region, whisky_age, whisky_type, whisky_desc, whisky_abv, whisky_photo)
//               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
//             `;

//                 const insertValues = [
//                   whiskyData.whisky_eng,
//                   whiskyData.whisky_kor,
//                   whiskyData.whisky_country,
//                   whiskyData.whisky_region,
//                   whiskyData.whisky_age,
//                   whiskyData.whisky_type,
//                   whiskyData.whisky_desc,
//                   whiskyData.whisky_abv,
//                   whiskyData.whisky_photo,
//                 ];

//                 connection.query(
//                   insertQuery,
//                   insertValues,
//                   (error, results, fields) => {
//                     if (error) {
//                       console.error("데이터 삽입 실패:", error);
//                     } else {
//                       console.log(`${whiskyData.whisky_eng} 데이터 삽입 성공`);
//                     }
//                   }
//                 );
//               } else {
//                 console.log(
//                   `${whiskyData.whisky_eng} 이미 존재하여 데이터 삽입 스킵`
//                 );
//               }
//             }
//           }
//         );
//       }
//       // }

//       i++; // 다음 URL을 위해 i 증가
//     }
//   }

//   console.log(whiskyList);

//   await browser.close();
//   return whiskyList;
// })();
