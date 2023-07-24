const express = require("express");
const { createUser, loginUser } = require("../controllers/user.controller");

const router = express.Router();

//register
router.post("/auth/register", createUser);

//login
router.post("/auth/login", loginUser);

module.exports = router;
