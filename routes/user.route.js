const express = require("express");
const {
  createUser,
  loginUser,
  getAllUsers,
} = require("../controllers/user.controller");
const { isAuthcenticated } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

//register
router.post("/auth/register", createUser);

//login
router.post("/auth/login", loginUser);

//GET ALL USERS
router.get("/", isAuthcenticated, isAdmin, getAllUsers);

module.exports = router;
