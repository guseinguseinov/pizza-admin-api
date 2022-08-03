import mongoose from "mongoose";


const ReviewSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: "ObjectId",
        ref: "users",
        required: true,
    },
    product: {
        type: "ObjectId",
        ref: "products",
        required: true,
    }       
   
}, {
    timestamps: true,
});

const ReviewModel = mongoose.model('reviews', ReviewSchema);

export default ReviewModel;