const router = require("express").Router();
const { Movie } = require("../../models");

// GET a movie by id
router.get("/:id", async (req, res) => {
  try {
    const dbMovieData = await Movie.findByPk(req.params.id);

    if (!dbMovieData) {
      res
        .status(404)
        .json({ message: `No movie found with id: ${req.params.id}` });
    }

    res.status(200).json(dbMovieData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET all movies
router.get("/", async (req, res) => {
  try {
    const dbMovieData = await Movie.findAll();

    if (!dbMovieData) {
      res.status(404).json({ message: "No movie data found." });
    }

    res.status(200).json(dbMovieData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// POST a new movie
router.post("/", async (req, res) => {
  try {
    const movieData = await Movie.create(req.body);

    res.status(200).json(movieData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE a movie
router.delete("/:id", async (req, res) => {
  try {
    const dbMovieData = await Movie.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbMovieData) {
      res
        .status(404)
        .json({ message: `No movie found with id: ${req.params.id}` });
    }

    res.status(200).json(dbMovieData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
