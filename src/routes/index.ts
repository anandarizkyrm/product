import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getById,
  updateProduct,
} from '../controller/product';
import { productValidationRules, validate } from '../fieldValidation';
const router = require('express').Router();

router.post('/product', productValidationRules(), validate, createProduct);
router.get('/product', getAllProduct);
router.get('/product/:id', getById);
router.delete('/product/:id', deleteProduct);
router.put('/product/:id', updateProduct);

module.exports = router;
