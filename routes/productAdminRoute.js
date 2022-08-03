import express from 'express';
import product from '../controller/product.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const adminProductRoute = express.Router();
const imageUpload = upload.single('image');

adminProductRoute.get('/', authenticateToken, product.getAllProducts);
adminProductRoute.get('/:id', authenticateToken, product.getProduct);
adminProductRoute.post('/', imageUpload, authenticateToken, product.addProduct);
adminProductRoute.patch('/:id', authenticateToken, product.editProduct);
adminProductRoute.delete('/:id', authenticateToken, product.deleteProduct);

export default adminProductRoute;