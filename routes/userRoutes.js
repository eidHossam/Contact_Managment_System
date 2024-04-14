const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const {
    register,
    login,
    currentUser,
} = require("../controllers/usersController");
const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/current", validateToken, currentUser);

module.exports = router;
