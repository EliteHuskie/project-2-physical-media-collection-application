const router = require("express").Router();
const cloudinaryRoutes = require("./cloudinary-routes");

router.use("/upload-image", cloudinaryRoutes);

module.exports = router;
