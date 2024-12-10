const express = require("express");
const router = express.Router();
const { createUser,getAllUsers } = require("../controllers/userController");

router.post("/registration", createUser);
router.post("/get-all-users", getAllUsers);

module.exports = router;
