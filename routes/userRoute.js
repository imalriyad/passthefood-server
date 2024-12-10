const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getCurrentUser,
} = require("../controllers/userController");

router.post("/registration", createUser);
router.post("/get-all-users", getAllUsers);
router.get("/get-current-user", getCurrentUser);

module.exports = router;
module.exports = router;
