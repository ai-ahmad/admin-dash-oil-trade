require("dotenv").config();
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
