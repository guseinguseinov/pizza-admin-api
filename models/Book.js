import mongoose from "mongoose";


const BookSchema = new mongoose.Schema({
    user: {
        type: "ObjectId",
        ref: "users",
    },
    totalTables: {
        type: Number,
        default: 10,
    },
    tablesLeft: {
        type: Number,
    },  
    isAviable: {
        type: Boolean,
        default: true,
    },

}, {
    timestamps: true,
});

const BookModel = mongoose.model('carts', BookSchema);

export default BookModel;