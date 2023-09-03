const ProductModel = require("../models/ProductModel");
const SparePartModel = require("../models/SparePart");
const PartRequest = require('../models/PartRequest')
const RepairOrder = require('../models/RepairOrder')
var ObjectId = require("mongodb").ObjectId;


exports.getRepairsByUser = async (req, res) => {
    try {
        var requests = await RepairOrder.find({ user: req.user._id }).populate('model', 'name skuId').select({ user: 0 });
        res.status(201).json(requests);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getRepairsByUserAdmin = async (req, res) => {
    try {
        var requests = await RepairOrder.find({ _id: new ObjectId(req.body.order) }).populate('model', 'name skuId').select({ user: 0 });
        res.status(201).json(requests);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getRepairsList = async (req, res) => {
    try {
        var requests = await RepairOrder.find({ completed: false }).populate('model', 'name skuId').populate('user', 'fullName name email').populate('assignedParts', 'name sku price')

        res.status(200).json(requests);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.updateRepairStatus = async (req, res) => {
    try {
        const id = req.body.id
        var requests = await RepairOrder.findByIdAndUpdate(id, { completed: true })
        res.status(200).json({ message: "Updated Status Successfully" });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};