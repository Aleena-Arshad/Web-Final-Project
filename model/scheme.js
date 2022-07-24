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
        minlength:65,
   
        required:true,

    },
    image:
    {
        type:String,
        required:true       
    },
    date:
    {
        type:Date,
        required:true,
        default: new Date()    
    },
    category:
    {
        type:String,
        required:true


    }
})
// blog is the name of collection in mongodb compass ( databse)
const blogdb = mongoose.model('blog',schema)
module.exports = blogdb


