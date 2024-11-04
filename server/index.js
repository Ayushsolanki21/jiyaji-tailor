const express=require('express');
const jwt=require('jsonwebtoken');
const app=express();
const cors=require('cors');
app.use(cors())
const port=5001;
require('./db/confi');
const User = require('./db/User');
const Product=require('./db/Product');
app.use(express.json());

app.post('/register',async(req,res)=>{
    try{
        let user= new User(req.body);
        let result= await user.save();
        res.send(req.body);
    }catch(e){
  console.log(e);
    }
    
})

app.post('/login',async(req,res)=>{
if(req.body.email&&req.body.password)
{
    let user=await User.findOne(req.body);
    if(user)
    {
        res.send(user);
    }else{
       return  res.send({result:"data not found"})
    }
}else{
      return  res.send({result:"data not found"})  
}
})

app.post('/addproduct',async(req,res)=>{
    let product=new Product(req.body);
    let result=await product.save();
    res.status(200).json("product added successfully");
})  
app.get('/addproduct',async(req,res)=>{
    const products=await Product.find();
    res.status(200).json(products);
})  

// app.get('/addproduct',async(req,res)=>{
//     const products=await Product.find();
//     res.send(products);
// })  
app.delete('/delete/:id',async(req,res)=>{
    const products=await Product.deleteOne({_id:req.params.id});
    res.send(products);
})  
app.get('/update/:id',async(req,res)=>{
    const result=await Product.findOne({_id:req.params.id});
    if(result)
        {
            res.send(result);
        } 
        else{
            res.send({result:"not found"})
        }
})
app.put('/update/:id',async(req,res)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
$set:req.body
        }
    )
    res.send(result);
})

app.listen(port,()=>{
    console.log("server start");
})