const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files from the public directory
app.use(express.static('public'));
app.use('/images', express.static('public/images'));

// Mock product data
const products = [
  {
    id: 1,
    name: 'Banarasi Silk Saree',
    price: '₹5,999',
    image: '/images/sarees/banarasi.jpg',
    description: 'Traditional Banarasi silk saree with intricate zari work',
    category: 'silk'
  },
  {
    id: 2,
    name: 'Kanjeevaram Silk',
    price: '₹8,999',
    image: '/images/sarees/kanjeevaram.jpg',
    description: 'Pure Kanjeevaram silk saree with temple border',
    category: 'silk'
  },
  {
    id: 3,
    name: 'Designer Cotton',
    price: '₹2,999',
    image: '/images/sarees/cotton.jpg',
    description: 'Handloom cotton saree with contemporary design',
    category: 'cotton'
  }
];

// API Routes
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';
  const filtered = products.filter(product => 
    product.name.toLowerCase().includes(query) ||
    product.description.toLowerCase().includes(query)
  );
  res.json(filtered);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: 'Product not found' });
  }
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
}); 