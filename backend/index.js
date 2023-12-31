require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);

// app.use(errorHandler);

app.listen(port, () => {
  console.log(`example app listening on port ${port}`);
});
