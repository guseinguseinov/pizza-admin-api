import express from 'express';
import product from '../controller/product.controller.js';
import { authenticateToken } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import ReviewModel from '../models/Review.js';

const adminProductRoute = express.Router();
const imageUpload = upload.single('image');

adminProductRoute.get('/', authenticateToken, product.getAllProducts);
adminProductRoute.get('/:id', authenticateToken, product.getProduct);
adminProductRoute.post('/', imageUpload, authenticateToken, product.addProduct);
adminProductRoute.patch('/edit/:id', imageUpload, authenticateToken, product.editProduct);
adminProductRoute.delete('/delete/:id', authenticateToken, product.deleteProduct);

export default adminProductRoute;