const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./VerifyToken");
const bcrypt = require("bcrypt");
const User = require("../Models/User");
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    bcrypt.hashSync(req.body.password, 10);
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been delted!!");
  } catch (error) {
    res.status(400).json(error);
  }
});

//Get USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const oneuser = await User.findById(req.params.id);
    const { password, ...others } = oneuser._doc;
    res.status(200).json(others);
  } catch (error) {
    console.log(error);
  }
});

//Get ALL USER
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(2)
      : await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

//GET USER STATS
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      {
        $match: { createdAt: { $gte: lastYear } },
      },
      {
        $project: {
          month: {
            $month: "$createdAt",
          },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json(error);
    console.log(error);
  }
});

module.exports = router;
