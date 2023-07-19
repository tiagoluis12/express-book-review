const express = require("express");
const dotenv = require("dotenv").config();

const app = express();

//middleware
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));
app.use("/", require("./routes/bookRoutes"));

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
