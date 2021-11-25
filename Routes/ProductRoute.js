const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./VerifyToken");
const bcrypt = require("bcrypt");
const Product = require("../Models/Products");
const Products = require("../Models/Products");

//CREATE
//only admin can create
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json("product has been delted!!");
  } catch (error) {
    res.status(400).json(error);
  }
});

//Get PRODUCT
router.get("/find/:id", async (req, res) => {
  try {
    const products = await Products.findById(req.params.id);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

//Get ALL Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.qCategory;

  try {
    let products;
    if (qNew) {
      products = await Products.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      products = await Products.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
