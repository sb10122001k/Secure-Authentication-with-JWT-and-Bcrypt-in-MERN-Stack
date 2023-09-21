const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserData = require("./models/userModel"); // Import the UserData model
const jwt = require('jsonwebtoken')
const app = express();
const router = require( "./Routes/apiRoutes");
const uri=require('./utils/mongodburi')
app.use(cors());
app.use(express.json());
app.use('/api',router)



mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected");
  })
  .catch((error) => {
    console.error("Error connecting to database:", error);
  });


app.listen(1337, () => {
  console.log("Server started on port 1337");
});
