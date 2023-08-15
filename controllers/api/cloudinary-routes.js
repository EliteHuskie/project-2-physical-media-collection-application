const router = require("express").Router();
const { Collection } = require("../../models");

const cloudinaryUpload = require("../../services/cloudinary-upload");

// just upload to cloudinary and return image url
router.post("/", async (req, res) => {
  try {
    if (!req.body.image) {
      return res
        .status(400)
        .json({ message: "Bad request. Missing required field: image" });
    } else if (!req.session) {
      return res.status(400).json({ message: "Bad request. Not logged in.}" });
    } else if (!req.body.collection_name) {
      return res
        .status(400)
        .json({ message: "Bad request. Missing required field: collection" });
    }

    const url = await cloudinaryUpload(
      req.body.image,
      req.session.username,
      req.body.collection_name
    );

    res.status(200).json(url);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// upload to cloudinary and update Collection to include image url
router.post("/:id", async (req, res) => {
  try {
    const image = req.body.image;
    const username = req.session.username;
    const collection = await Collection.findByPk(req.params.id);
    const collectionName = collection.dataValues.collection_name;

    if (!image) {
      return res
        .status(400)
        .json({ message: "Bad request. Missing required field: image" });
    } else if (!username) {
      return res
        .status(400)
        .json({ message: "Bad request. Missing required field: username}" });
    } else if (!collection) {
      return res
        .status(400)
        .json({ message: "Bad request. Missing required field: collection" });
    }

    const url = await cloudinaryUpload(image, username, collectionName);

    // add url to the collection in the database
    const collectionData = await Collection.update(
      {
        image_url: url,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    if (!collectionData) {
      res
        .status(404)
        .json({ message: `No collection found with id: ${req.params.id}` });
      return;
    }

    res.status(200).json(collectionData);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});

module.exports = router;
