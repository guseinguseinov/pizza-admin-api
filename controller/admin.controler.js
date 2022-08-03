import generateResponseMessage from '../global/index.js';
import { generateAccessToken } from '../middleware/auth.js';
import UserModel from '../models/User.js';
import { config } from 'dotenv';
import crypto from 'crypto';

config();

const adminCtrl = {
    async login(req, res) {
        const { email, password } = req.body;

        const hashedPassword = crypto
            .pbkdf2Sync(password, process.env.SECRET_SALT, 100000, 64, 'sha512')
            .toString('hex');  
        
        const user = await UserModel.findOne({ email, password: hashedPassword });  
        if (!user) {
            return res.status(404).json( generateResponseMessage(404, "Email or password is wrong", null));
        }
        
        const { isAdmin } = user.toObject();
        if (!isAdmin) {
            return res.status(403).json( generateResponseMessage(403, "Access denied User is not admin", null) );
        }
    
        if (user) {
            const { password, ...userRestData } = user.toObject();
            const token = generateAccessToken(userRestData);
            return res.status(200).json( generateResponseMessage(200, "Access token generated", token) );    
        }
    },
    async getAllusers(req, res) {
        const users = await UserModel.find();
        if (!users) {
            return res.status(404).json( generateResponseMessage(404, 'There is no users', null));
        }
    
        res.status(200).json( generateResponseMessage(200, null, users));    
    },
    async getUser(req, res) {
        const user = await UserModel.findById(req.params.id);
        if (!user) {
            return res.status(404).json( generateResponseMessage(404, 'There is no user', null));
        }
    
        res.status(200).json( generateResponseMessage(200, null, user));
    },
    async changeUserInfo(req, res) {
        await UserModel.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json( generateResponseMessage(200, "User info updated", null));
    },
    async deleteUser(req, res) {
        await UserModel.findByIdAndDelete(req.params.id);
        res.status(204).json( generateResponseMessage(204, "User deleted succesfully", null));
    }
}

export default adminCtrl;