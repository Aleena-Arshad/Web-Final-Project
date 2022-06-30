// we will define a schema using mongoose
// a method to make a schema using mongoose
const mongoose = require("mongoose");

var schema = new mongoose.Schema({
   author:
   {
    type:String,
       required:true
   },
    title:{
        type:String,
        required:true  
    },
    discription:
    {
        type:String,
        required:true,
        minlength:65
    },
    image:
    {
        type:String,
        required:true       
    },
    date:
    {
        type:Date,
        required:true       
    },
    category:
    {
        type:String,
        required:true

    }
})
const blogdb = mongoose.model('blog',schema)
module.exports = blogdb


