const router = require("express").Router();
const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Register user

router.post("/register", async (req, res) => {
  //   const Username = User.findOne({ email: req.body.email });
  //   if (Username) {
  //     res.json(400).json("user already exist!!");
  //   }
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    isAdmin: req.body.isAdmin,
  });
  try {
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.log(error);
  }
});

//Login User
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const generateToken = jwt.sign(
          {
            id: user._id,
            isAdmin: user.isAdmin,
          },
          "mySecretKey",
          { expiresIn: "2d" }
        );
        const { password, ...others } = user._doc;
        res.json({ ...others, generateToken });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
