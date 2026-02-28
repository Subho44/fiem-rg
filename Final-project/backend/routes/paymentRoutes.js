const router = require('express').Router();

const pctrl = require("../controller/paymentController");

router.post("/creatre-order",pctrl.createOrder);
router.post("/verify",pctrl.verifyPayment);

module.exports = router;