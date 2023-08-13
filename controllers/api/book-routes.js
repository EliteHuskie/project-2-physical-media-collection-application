const router = require("express").Router();
const { Book } = require("../../models");

// GET a Book by id
router.get("/:id", async (req, res) => {
  try {
    const dbBookData = await Book.findByPk(req.params.id);

    if (!dbBookData) {
      res
        .status(404)
        .json({ message: `No Book found with id: ${req.params.id}` });
    }

    res.status(200).json(dbBookData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET all Books
router.get("/", async (req, res) => {
  try {
    const dbBookData = await Book.findAll();

    if (!dbBookData) {
      res.status(404).json({ message: "No Book data found." });
    }

    res.status(200).json(dbBookData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// POST a new Book
router.post("/", async (req, res) => {
  try {
    const BookData = await Book.create(req.body);

    res.status(200).json(BookData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE a Book
router.delete("/:id", async (req, res) => {
  try {
    const dbBookData = await Book.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbBookData) {
      res
        .status(404)
        .json({ message: `No Book found with id: ${req.params.id}` });
    }

    res.status(200).json(dbBookData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
