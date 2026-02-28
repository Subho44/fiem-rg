const mongoose = require("mongoose");

const paymentschema = new mongoose.Schema(
    {
        jobId:{type:mongoose.Schema.Types.ObjectId, ref:"Job", required:true},
        amount:{type:Number,required:true},
        currency:{type:String,default:"INR"},


        razorpay_order_id:{type:String,required:true},
        razorpay_payment_id:{type:String,required:true},
        razorpay_signature:{type:String,required:true},

        status:{type:String,default:"paid"},

    },
    {timestamps:true}
);
module.exports = mongoose.model("payment-fiem",paymentschema);