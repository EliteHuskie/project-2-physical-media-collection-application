const router = require("express").Router();
const cloudinaryRoutes = require("./cloudinary-routes");
const userRoutes = require("./user-routes");

router.use("/upload-image", cloudinaryRoutes);
router.use("/users", userRoutes);

module.exports = router;
