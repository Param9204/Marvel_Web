const express = require("express");
const multer = require("multer");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct
} = require("../controllers/productController");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/add", upload.array("images", 5), addProduct);
router.get("/", getProducts);
router.put("/:id", upload.array("images", 5), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;