import express from "express";
import adminCtrl from "../controller/admin.controler.js";
import { authenticateToken } from "../middleware/auth.js";

const adminRoute = express.Router();

adminRoute.post('/admin/login', adminCtrl.login);
adminRoute.get('/users', authenticateToken, adminCtrl.getAllusers);
adminRoute.get('/users/:id', authenticateToken, adminCtrl.getUser);
adminRoute.patch('/users/:id', authenticateToken, adminCtrl.changeUserInfo);
adminRoute.delete('/users/:id', authenticateToken, adminCtrl.deleteUser);


export default adminRoute;