const express = require("express");
const router = express.Router();

const { createOrder, verifyPayment } = require("../controller/paymentController");

// ✅ URL: /api/payments/create-order
router.post("/create-order", createOrder);

// ✅ URL: /api/payments/verify
router.post("/verify", verifyPayment);

module.exports = router;