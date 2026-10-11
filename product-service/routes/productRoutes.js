const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');

// GET /api/products
router.get('/', productController.getAllProducts); 

// GET /api/products/:id
router.get('/:id', productController.getProductById);

// POST /api/products
router.post('/', authMiddleware, productController.createProduct); 

// PUT /api/products/:id
// router.put('/:id', authMiddleware, productController.updateProduct);

// DELETE /api/products/:id
// router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;