const express = require("express");
const user = require("../Model/UserModel.js");
const task = require("../Model/TaskModel.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")
const router = express.Router();
const  {generateToken}  = require('../Util/generateToken.js');
const { protect } = require("../MiddleWare/protectRoute.js");

// Login users
router.post("/login" , async (req, res, next) => {
  const { email, password } = req.body;


  // find the current user
  const current = await user.findOne({ email });

  if (current && (await bcrypt.compare(password, current.password))) {

    try {

      if (current) {
       const userTask = await task.findOne({ user: current.id})
       const token = generateToken(current._id)
       res.cookie('token' , token, {
       httpOnly: false,
       secure: true,
       sameSite: 'none',
       maxAge: 1000 * 60 * 60 * 24
    })

    res.json({
      username: current.username,
      email: current.email,


    })

      }
    } catch (error) {
      next(error);
    }
  } else {
    res.status(401).json({
      message: "Invaild username or password.",
    });
  }




});



// Logout users
router.post("/logout", async (req, res) => {

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "user logged out" });
});

// Delete user
router.delete("/" , async (req, res) => {
  let token;

  token = req.cookies.token;

  const decode = jwt.verify(token, process.env.JWT_SECERT);

  if (token) {
    try {
      const userAccount = await user.deleteOne({ _id: decode.userId });
      const userTask = await task.deleteOne({ user: decode.userId });
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log("No Token");
  }

  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({
    message: "User Account deleted",
  });
});



// Add user
// Sign Up User
router.post("/signup", async (req, res, next) => {

  const { username, email, password } = req.body;
  const hashPassword = bcrypt.hashSync(password, 10);

  try {
     const newUser = await user.create({
      username,
      email,
      password: hashPassword,
    });

    let userId = newUser._id

    const token = generateToken(userId)

    res.cookie('token' , token, {
      httpOnly: true,
      secure: true,
      maxAge: 3 * 60 * 60 * 24 * 1000
    })


  } catch (error) {
    next(error);
  }

res.end();

  
});

router.get("/" , (req , res) => {

})



module.exports = router;
