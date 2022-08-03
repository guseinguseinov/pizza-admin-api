import express from "express";
import mongoose from "mongoose";
import { config } from 'dotenv';

import adminRoute from "./routes/adminRoute.js";
import adminProductRoute from "./routes/productAdminRoute.js";
 
config();
await mongoose.connect(process.env.DB_CONNECTION_STRING);

const admin = express();

// admin
admin.use(express.urlencoded({ extended: true }));
admin.use(express.json());

admin.use('/', adminRoute);
admin.use('/products', adminProductRoute);

export default admin;