const router = require("express").Router();
const cloudinaryRoutes = require("./cloudinary-routes");
const userRoutes = require("./user-routes");
const movieRoutes = require("./movie-routes");
const bookRoutes = require("./book-routes");
const showRoutes = require("./show-routes");

// append end routes
router.use("/upload-image", cloudinaryRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/books", bookRoutes);
router.use("/shows", showRoutes);

module.exports = router;
