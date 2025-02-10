require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api", routes); // this loads the api routes

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
