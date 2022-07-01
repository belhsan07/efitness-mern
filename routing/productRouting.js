import express from 'express';
const router = express.Router();

// Controllers (functions)
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js';

// /api/products/
router.route('/').get(getProducts);

// /api/products/:id
router.route('/:id').get(getProductById);

export default router;
