const express = require("express");
const User_Act=require('../Controllers/User.js')
const router = express.Router();

router.post("/signup", User_Act.signup);
router.post("/signin", User_Act.signin);
router.get("/getallusers", User_Act.getAllUsers);
router.get("/getuser/:id", User_Act.getUserDataID);

module.exports = router;