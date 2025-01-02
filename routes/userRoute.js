const express = require("express");
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getCurrentUser,
  auth,
} = require("../controllers/userController");

router.post("/registration", createUser);
router.get("/get-all-users", getAllUsers);
router.get("/get-current-user", getCurrentUser);
router.post('/authentication', auth)

module.exports = router;

