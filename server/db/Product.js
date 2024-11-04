const mongoose=require('mongoose');

const Productschema=new mongoose.Schema({
    name:String,
    price:String,
    category:String,
    company:String
})

module.exports=mongoose.model("products",Productschema);