const SparePartModel = require("../models/SparePart");
const sJson = require('../data/spareData.json')
const { faker } = require('@faker-js/faker');

exports.getAllSpareParts = async (req, res) => {
    try {
        const parts = await SparePartModel.find({}).select('_id sku name')
        res.status(200).json(parts);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getSparePartByCategory = async (req, res) => {
    try {
        const parts = await SparePartModel.find({ type: req.query.name }).populate('crossCompatibleModels', '-_id name image')
        res.status(201).json(parts);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getSparePartByQuantity = async (req, res) => {
    try {
        const parts = await SparePartModel.find({}).sort({ quantity: 1 }).select({
            _id: 1,
            name: 1,
            sku: 1,
            type: 1,
            price: 1,
            quantity: 1,
        }).limit(50)
        res.status(201).json(parts);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getSparePartByLocation = async (req, res) => {
    try {
        const parts = await SparePartModel.find({}).select({ locations: 1, _id: 0 })
        var ans = []
        for (var i = 0; i < parts.length; i++)
            ans.push(parts[i].locations)

        const North = ans.filter((item) => { if (item === 'North') return item }).length
        const South = ans.filter((item) => { if (item === 'South') return item }).length
        const East = ans.filter((item) => { if (item === 'East') return item }).length
        const West = ans.filter((item) => { if (item === 'West') return item }).length

        res.status(200).json({ North, South, East, West });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.updateSparePartQuantity = async (req, res) => {
    try {
        const id = req.body.id
        const spare = await SparePartModel.findByIdAndUpdate(id, { quantity: Number(req.body.quantity) })
        res.status(200).json({ ...spare, message: "Updated Quantity" });

    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "Invalid Object Id" });
    }
};

exports.createNewSparePart = async (req, res) => {
    try {
        const spare = new SparePartModel({
            sku: req.body.sku,
            name: req.body.name,
            type: req.body.category,
            description: req.body.description,
            crossCompatibleModels: req.body.compatible.map((item) => item.value),
            price: req.body.price,
            quantity: Number(req.body.quantity),
            available: Number(req.body.quantity) > 0,
            locations: req.body.warehouse,
        })

        const saved_spare = await spare.save();
        res.status(200).json({ ...saved_spare, message: "Created New Part Succesfully" });

    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "Unable To Create New Spare Part" });
    }
};