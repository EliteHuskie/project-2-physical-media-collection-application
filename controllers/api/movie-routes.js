const router = require("express").Router();
const { Movie } = require("../../models");

// GET a movie by id or name
router.get("/:type/:query", async (req, res) => {
  try {
    let dbMovieData;

    if (req.params.type === "id") {
      dbMovieData = await Movie.findByPk(req.params.query);
    } else {
      dbMovieData = await Movie.findOne({
        where: {
          name: req.params.query,
        },
      });
    }

    if (!dbMovieData) {
      res
        .status(404)
        .json({ message: `No movie found by: ${req.params.query}` });
      return;
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
      return;
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
      return;
    }

    res.status(200).json(dbMovieData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
