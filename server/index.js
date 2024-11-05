const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./db/Product');
const User = require('./db/User'); // Assuming you have a User model
require('./db/confi'); // Assuming you have a database configuration file

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  },
});

const upload = multer({ storage: storage });
app.use('/uploads', express.static('uploads'));

app.post('/addproduct', upload.single('image'), async (req, res) => {
  const { name, price, category, company } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !price || !category || !company || !image) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const product = new Product({ name, price, category, company, image: `/uploads/${image}` });
    const result = await product.save();
    res.status(201).json({ message: 'Product added successfully!', product: result });
  } catch (error) {
    res.status(500).json({ message: 'Error adding product', error });
  }
});

app.post('/register', async (req, res) => {
  try {
    let user = new User(req.body);
    let result = await user.save();
    res.send(req.body);
  } catch (e) {
    console.log(e);
  }
});

app.post('/login', async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body);
    if (user) {
      res.send(user);
    } else {
      return res.send({ result: "data not found" });
    }
  } else {
    return res.send({ result: "data not found" });
  }
});

app.get('/addproduct', async (req, res) => {
  const products = await Product.find();
  res.status(200).json(products);
});

app.delete('/delete/:id', async (req, res) => {
  const products = await Product.deleteOne({ _id: req.params.id });
  res.send(products);
});

app.get('/update/:id', async (req, res) => {
  const result = await Product.findOne({ _id: req.params.id });
  if (result) {
    res.send(result);
  } else {
    res.send({ result: "not found" });
  }
});

app.put('/update/:id', async (req, res) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body
    }
  )
  res.send(result);
});

app.listen(port, () => {
  console.log("server start");
});
