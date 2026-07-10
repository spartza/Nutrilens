const express = require('express');
const { getProductDetails } = require('../controllers/product.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();

// GET request for barcode scan -> http://localhost:5000/api/products/:barcode
router.get('/:barcode', protect, getProductDetails);

module.exports = router;