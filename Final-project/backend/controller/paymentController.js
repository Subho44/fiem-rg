const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/Payment");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { amount, jobId } = req.body;

    if (!amount || !jobId) {
      return res.status(400).json({ success: false, message: "amount and jobId required" });
    }

    // short receipt
    const receipt = `job_${String(jobId).slice(-6)}_${String(Date.now()).slice(-6)}`;

    const order = await razorpay.orders.create({
      amount: Number(amount), // amount in paise (19900)
      currency: "INR",
      receipt,
    });

    return res.status(200).json({
      success: true,
      key: process.env.RAZORPAY_KEY_ID,
      order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err?.error?.description || err?.message || "Order create failed",
    });
  }
};

// ✅ VERIFY PAYMENT
const verifyPayment = async (req, res) => {
  try {
    const { jobId, amount, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!jobId || !amount || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ success: false, message: "Missing payment fields" });
    }

    const sign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (sign !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid signature" });
    }

    const payment = await Payment.create({
      jobId,
      amount,
      currency: "INR",
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      status: "paid",
    });

    return res.status(200).json({ success: true, message: "Payment verified", payment });
  } catch (err) {
    return res.status(500).json({ success: false, message: err?.message || "Not verified" });
  }
};

module.exports = { createOrder, verifyPayment };