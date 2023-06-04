const swaggerAutogen = require("swagger-autogen")();
const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"];

const options = {
  info: {
    title: "Da-Whisky",
    description: "항해 14기 실전프로젝트 13조",
  },
  host: "jjmdev.site",
  schemes: ["http", "https"],
};

swaggerAutogen(outputFile, endpointsFiles, options);
