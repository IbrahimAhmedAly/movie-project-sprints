const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://localhost:27017/movie_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const movieRoute = require("./routes/movieRoute");

// logging requests to log.txt
app.use(
  morgan("common", {
    stream: require("fs").createWriteStream("./log.txt", { flags: "a" }),
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/", movieRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
