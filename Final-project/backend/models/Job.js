const mongoose = require("mongoose");

const jobschema = new mongoose.Schema(
    {
        title:{type:String,required:true},
        company:{type:String,required:true},
        location:{type:String,required:true},
        salary:{type:Number,default:0},
        description:{type:String,required:true},

        jobimage:{type:String,default:""},

    },
    {timestamps:true}
);
module.exports = mongoose.model("job-fiem",jobschema);