const Product = require('../models/product')
const createProductCotroller = async (req, res) => {
    try {
        const { name, description, price } = req.body;
        if (!name || !description || !price) {
            return res.status(400).json({
                status: 400,
                message: `Invalid Parameters`
            })
        }
        const newProduct = Product({ name, description, price, created_by: req.user.id });
        await newProduct.save();
        res.status(201).json({ status: 201, message: 'Product created successfully' });
    } catch (err) {
        if (!err.status) {
            err.status = 500;
            err.message = `Internal Server Error`
        }
        res.status(err.status).json({ status: err.status, message: err.message })
    }
}
const getProductsCotroller = async (req, res) => {
    try {
        const products = await Product.find();
        return res.status(200).json({ status: 200, message: `Products Found`, products })
    } catch (err) {
        if (!err.status) {
            err.status = 500;
            err.message = `Internal Server Error`
        }
        console.log(err)
        return res.status(err.status).json({ status: err.status, message: err.message })
    }
}
const updateProductCotroller = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: `Invalid Parameters`
            })
        }

        const updatedProduct = await Product.findByIdAndUpdate(id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({
                status: 404,
                message: `Product with ${id} not found`
            })
        }
        res.status(200).json({ status: 200, message: `Product updated successfully` })
    } catch (err) {
        if (!err.status) {
            err.status = 500;
            err.message = `Internal Server Error`
        }
        res.status(err.status).json({ status: err.status, message: err.message })
    }
}
const deleteProductCotroller = async (req, res) => {
    try {
        const { id } = req.query;
        if (!id) {
            return res.status(400).json({
                status: 400,
                message: `Invalid Parameters`
            })
        }

        const deletedProduct = await Product.findByIdAndDelete(id, req.body);
        console.log(deletedProduct)
        if (!deletedProduct) {
            return res.status(404).json({
                status: 404,
                message: `Product with ${id} not found`
            })
        }
        res.status(200).json({ status: 200, message: `Product deleted successfully` })
    } catch (err) {
        console.log(err);
        if (!err.status) {
            err.status = 500;
            err.message = `Internal Server Error`
        }
        res.status(err.status).json({ status: err.status, message: err.message })
    }
}
module.exports = {
    createProductCotroller,
    getProductsCotroller,
    updateProductCotroller,
    deleteProductCotroller
}