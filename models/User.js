import mongoose from "mongoose";
import crypto from 'crypto';
import { config } from 'dotenv';

config();

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    profilePicture : String,
    gender: {
        type: String,
        required: true,
        trim: true,
        enum: ["male", "female"],
    },
    birthDate: {
        type: Date,
        required: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        unique:true,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    cart: [{ type: "ObjectId", ref: "carts"}],
}, {
    timestamps: true
});


UserSchema.pre('save', function (next){
    this.password = crypto
        .pbkdf2Sync(this.password, process.env.SECRET_SALT, 100000, 64, 'sha512')
        .toString('hex');  
    next();
});

const UserModel = mongoose.model('users', UserSchema);

export default UserModel;