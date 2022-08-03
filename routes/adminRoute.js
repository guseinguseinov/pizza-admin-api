import express from "express";
import adminCtrl from "../controller/admin.controler.js";
import { authenticateToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const adminRoute = express.Router();

const imageUpload = upload.single('profilePicture');

adminRoute.post('/admin/login', adminCtrl.login);
adminRoute.get('/users', authenticateToken, adminCtrl.getAllusers);
adminRoute.get('/users/:id', authenticateToken, adminCtrl.getUser);
adminRoute.patch('/users/edit/:id', imageUpload, authenticateToken, adminCtrl.changeUserInfo);
adminRoute.delete('/users/delete/:id', authenticateToken, adminCtrl.deleteUser);


export default adminRoute;