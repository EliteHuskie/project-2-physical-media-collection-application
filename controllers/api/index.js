const router = require("express").Router();
const cloudinaryRoutes = require("./cloudinary-routes");
const userRoutes = require("./user-routes");
const movieRoutes = require("./movie-routes");

router.use("/upload-image", cloudinaryRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);

module.exports = router;
