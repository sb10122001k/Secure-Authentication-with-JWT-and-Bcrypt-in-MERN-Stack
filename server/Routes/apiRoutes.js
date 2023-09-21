const express = require("express");
const router = express.Router();
const UserData = require("../models/userModel");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcrypt");

const saltRounds = 10;

// Define your routes here
router.post("/register", async (req, res) => {
  console.log(req.body);

  try {
    const password = req.body.password;

    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(password, salt, function(err, hash) {
          // Store hash in the database
          UserData.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
          });
      
          console.log("Done");
          const token = jwt.sign(
            {
              name: req.body.name,
              email: req.body.email,
            },
            "secret123"
          );
          return res.json({ status: "ok", user: token });
      });
  })
   
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: error });
  }
});

router.post("/login", async (req, res) => {
  console.log(req.body);
const password=req.body.password
try {
  const data=await UserData.findOne(
    {
      email:req.body.email
    })
    if(data)
    {
      const hash=data.password;
      bcrypt.compare(password, hash, function(err, result) {
        if(result==true)
        {
          const token = jwt.sign(
                  {
                    name: data.name,
                    email: data.email,
                  },
                  "secret123"
                );
          return res.json({ status: "ok", user: token });
        }
        else
        {
          return res.json({ status: "error", user: "Wrong Password"});
        }
      });
      
    }
    else{
      return res.json({ status: "error", user: "User Not Found"});
    }
  
  
} catch (error) {
  return res.json({ status: "error", user: "Internal Server Error"});
}
});

router.post("/verify-token", (req, res) => {
  const { token } = req.body;

  try {
    const decoded = jwt.verify(token, "secret123"); // Replace with your secret key
    res.json({ isValid: true });
    console.log("true");
  } catch (error) {
    console.log("false");
    res.json({ isValid: false });
  }
});

module.exports = router;
