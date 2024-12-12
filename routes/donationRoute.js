const express = require('express');
const { createDonation,getAllListedFood } = require("../controllers/donationController");
const router = express.Router();

router.post("/create-donation", createDonation)
router.get("/get-all-listed-food", getAllListedFood)



module.exports = router