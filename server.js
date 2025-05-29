const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const cors = require("cors");
const app = express();
const port = 4000;

app.use(express.json());
app.use(cors({
  origin: "https://re-rwya.onrender.com", // replace with actual frontend URL
  credentials: true
}));
// Connect to MongoDB
mongoose.connect('mongodb+srv://raghuveermustimalla:12345@cluster0.uotinum.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to Product API');
});

// Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body); // expects id in body
    await newProduct.save();
    res.status(201).json({ success: true, product: newProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Get product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: parseInt(req.params.id) });
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Update product by ID (PUT)
app.put('/api/products/:id', async (req, res) => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { id: parseInt(req.params.id) },
      req.body,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, product: updatedProduct });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ✅ Delete product by ID (DELETE)
app.delete('/api/products/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findOneAndDelete({ id: parseInt(req.params.id) });

    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running at http://0.0.0.0:${port}`);
});

