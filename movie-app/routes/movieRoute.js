const express = require("express");
const Movie = require("../models/movie");
const router = new express.Router();

router.get("/movies", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/movies", async (req, res) => {
  try {
    const { title, year } = req.body;
    const movie = new Movie({ title, year });
    await movie.save();
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.put("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year } = req.body;
    const movie = await Movie.findByIdAndUpdate(
      id,
      { title, year },
      { new: true }
    );
    res.json(movie);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/movies/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
