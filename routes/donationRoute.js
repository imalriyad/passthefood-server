const express = require('express');
const { createDonation,getAllDonations } = require("../controllers/donationController");
const router = express.Router();

router.post("/create-donation", createDonation)
router.get("/get-all-donations", getAllDonations)



module.exports = router