import generateResponseMessage from '../global/index.js';
import ProductModel from '../models/Product.js';

const product = {
    async getAllProducts(req, res) {
        const allProducts =
            await ProductModel.find()
                .populate('reviews')
                .exec();
        res.status(200).json(generateResponseMessage(200, null, allProducts));
    },
    async getProduct(req, res) {
        const product = await ProductModel.findById(req.params.id).populate('reviews').exec();
        res.status(200).json(generateResponseMessage(200, null, product));
    },
    async addProduct(req, res) {
        const { path } = req.file;
        const { name, description, price, weight, dimensions, category } = req.body;
        const newProduct = await ProductModel({
            name,
            description,
            image: path,
            price,
            weight,
            dimensions,
            category
        });
        await newProduct.save();
        res.status(201).json(generateResponseMessage(201, 'New product created', newProduct));
    },
    async editProduct(req, res) {
        if (req.file) {
            console.log('update req.file')
            const product = await ProductModel.findByIdAndUpdate(req.params.id, {
                image: req.file.path,
                ...req.body
            });
            await product.save();

        }else {
            console.log('update req.boy')
            const product = await ProductModel.findByIdAndUpdate(req.params.id, req.body);
            await product.save();
        }
        res.status(200).json(generateResponseMessage(200, "Product info updated", null));
    },
    async deleteProduct(req, res) {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.status(204).json(generateResponseMessage(204, "Product deleted succesfully", null));
    }
}

export default product;