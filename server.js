const app = require("./app");
const path = require("path");
const dotenv = require("dotenv");

// config
dotenv.config({ path: path.resolve(__dirname, "./config/config.env") });

const server = app.listen(process.env.PORT, () =>
  console.log(`Server is running on: http://localhost:${process.env.PORT}`)
);
