const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const connectToDatabase = require("./database/connect");
const apiRouter = require("./routes/api");
const cookieParser = require("cookie-parser");
const cors = require("./middlewares/cors");

const PORT = 3001;

const app = express();
connectToDatabase();

app.use(
  cors,
  cookieParser(),
  bodyParser.json(),
  apiRouter,
  express.static(path.join(__dirname, "public"))
);

app.listen(PORT, () => {
  console.log(`Server is running at PORT http://localhost:${PORT}`);
});
