const mongoose = require("mongoose");

const movieSchema = mongoose.model("Movie", {
  title: String,
  year: Number,
});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
