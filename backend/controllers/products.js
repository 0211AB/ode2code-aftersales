const ProductModel = require("../models/ProductModel");
const SparePartModel = require("../models/SparePart");

exports.getHomeProducts = async (req, res) => {
    try {
        const p1 = await ProductModel.find().sort({ createdDate: 1 }).limit(10);
        const p2 = await ProductModel.aggregate()
            .addFields({ "length": { "$size": '$spareParts' } }) //adds a new field, to the existing ones (incl. _id)
            .sort({ "length": -1 })
            .limit(10)
        res.status(201).json({ p1, p2 });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const { page = 1, limit = 12 } = req.query;
        const products = await ProductModel.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await ProductModel.countDocuments();

        res.status(200).json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getAllProductsList = async (req, res) => {
    try {

        const products = await ProductModel.find().select('_id name skuId')
        res.status(200).json(products);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getProductsbyName = async (req, res) => {
    try {
        const params = req.query.text;
        const product = await ProductModel.find({ $text: { $search: `${params}` } }).limit(15);

        res.status(201).json(product);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getSparefromProducts = async (req, res) => {
    try {
        const id = req.query.id;
        const product = await ProductModel.findOne({ skuId: id }).populate('spareParts');
        res.status(201).json(product.spareParts);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.listProducts = async (req, res) => {
    try {
        const products = await ProductModel.find().select('name _id')
        res.status(200).json(products);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.addNewProduct = async (req, res) => {
    try {

        const product = new ProductModel({
            skuId: req.body.skuId,
            name: req.body.name,
            description: req.body.description,
            image: req.body.image,
            spareParts: req.body.compatible.map((item) => item.value),
            display: {
                dimensions: req.body.dimensions,
                size: req.body.size,
            },
            camera: req.body.camera,
            os: req.body.os,
            ram: req.body.ram,
            storage: req.body.storage,
            weight: req.body.weight,
        })

        const saved_product = await product.save()

        res.status(200).json({
            saved_product,
            message: "Product Created Succesfully"
        });

    } catch (e) {
        console.log(e)
        res.status(404).json({ ...e, message: "Could Not Create New Product" });
    }
};




