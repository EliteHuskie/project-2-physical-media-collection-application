const router = require("express").Router();
const { Show } = require("../../models");

// GET a Show by id
router.get("/:id", async (req, res) => {
  try {
    const dbShowData = await Show.findByPk(req.params.id);

    if (!dbShowData) {
      res
        .status(404)
        .json({ message: `No Show found with id: ${req.params.id}` });
    }

    res.status(200).json(dbShowData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// GET all Shows
router.get("/", async (req, res) => {
  try {
    const dbShowData = await Show.findAll();

    if (!dbShowData) {
      res.status(404).json({ message: "No Show data found." });
    }

    res.status(200).json(dbShowData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// POST a new Show
router.post("/", async (req, res) => {
  try {
    const ShowData = await Show.create(req.body);

    res.status(200).json(ShowData);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE a Show
router.delete("/:id", async (req, res) => {
  try {
    const dbShowData = await Show.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!dbShowData) {
      res
        .status(404)
        .json({ message: `No Show found with id: ${req.params.id}` });
    }

    res.status(200).json(dbShowData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
