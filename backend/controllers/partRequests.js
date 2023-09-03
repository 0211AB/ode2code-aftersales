const ProductModel = require("../models/ProductModel");
const SparePartModel = require("../models/SparePart");
const PartRequest = require('../models/PartRequest')
var ObjectId = require("mongodb").ObjectId;

exports.createRequest = async (req, res) => {
    try {

        const partRequest = new PartRequest({
            user: req.user._id,
            requestedParts: req.body.parts.map((p) => new ObjectId(p)),
            price: req.body.price,
            estimatedDeliveryDate: new Date(Date.now() + 12096e5)
        })

        await partRequest.save()

        res.status(201).json({ message: 'Yayy!!!' });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getRequestsByUser = async (req, res) => {
    try {
        const partRequests = await PartRequest.find({ user: req.user._id }).populate('requestedParts')
        res.status(201).json(partRequests);

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getRequestsById = async (req, res) => {
    try {
        if (req.body.order === "")
            return res.status(404).json({ message: "Order Id Required" });

        const partRequest = await PartRequest.findById(req.body.order).populate('requestedParts')
        res.status(201).json(partRequest);

    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "Invalid Object Id" });
    }
};

exports.updateRequestsById = async (req, res) => {
    try {
        const id = req.query.id
        const partRequest = await PartRequest.findByIdAndUpdate(id, req.body, { new: true }).populate('requestedParts')
        res.status(201).json({ ...partRequest, message: "Updated Status" });

    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "Invalid Object Id" });
    }
};

exports.getRevenueData = async (req, res) => {
    try {
        const partRequest = await PartRequest.find({}).populate('requestedParts', { type: 1, price: 1, _id: 0 }).select({ requestedParts: 1, _id: 0 })
        var ans = []

        for (var i = 0; i < partRequest.length; i++)
            ans.push(partRequest[i].requestedParts[0])

        const sum = ans.reduce((total, item) => total + Number(item.price), 0);
        const BackHousing = ans.reduce((total, item) => item.type === 'Back Housing' ? total + Number(item.price) : total, 0)
        const Battery = ans.reduce((total, item) => item.type === 'Battery' ? total + Number(item.price) : total, 0)
        const Charger = ans.reduce((total, item) => item.type === 'Charger' ? total + Number(item.price) : total, 0)
        const DataCable = ans.reduce((total, item) => item.type === 'Data Cable' ? total + Number(item.price) : total, 0)
        const LCDModule = ans.reduce((total, item) => item.type === 'LCD Module' ? total + Number(item.price) : total, 0)
        const LCM = ans.reduce((total, item) => item.type === 'LCM' ? total + Number(item.price) : total, 0)
        const Mainboard = ans.reduce((total, item) => item.type === 'Mainboard' ? total + Number(item.price) : total, 0)
        const Sideboard = ans.reduce((total, item) => item.type === 'Sideboard' ? total + Number(item.price) : total, 0)
        const PCB = ans.reduce((total, item) => item.type === 'PCB' ? total + Number(item.price) : total, 0)
        const Speaker = ans.reduce((total, item) => item.type === 'Speaker' ? total + Number(item.price) : total, 0)

        res.status(200).json({ sum, BackHousing, Battery, Charger, DataCable, LCDModule, LCM, Mainboard, Sideboard, PCB, Speaker });

    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "No Revenue Data Found" });
    }
};

exports.getShareData = async (req, res) => {
    try {
        const partRequest = await PartRequest.find({}).populate('requestedParts', { type: 1, price: 1, _id: 0 }).select({ requestedParts: 1, _id: 0 })
        var ans = []

        for (var i = 0; i < partRequest.length; i++)
            ans.push(partRequest[i].requestedParts[0])

        const BackHousing = ans.filter((item) => { if (item.type === 'Back Housing') return item }).length
        const Battery = ans.filter((item) => { if (item.type === 'Battery') return item }).length
        const Charger = ans.filter((item) => { if (item.type === 'Charger') return item }).length
        const DataCable = ans.filter((item) => { if (item.type === 'Data Cable') return item }).length
        const LCDModule = ans.filter((item) => { if (item.type === 'LCD Module') return item }).length
        const LCM = ans.filter((item) => { if (item.type === 'LCM') return item }).length
        const Mainboard = ans.filter((item) => { if (item.type === 'Mainboard') return item }).length
        const Sideboard = ans.filter((item) => { if (item.type === 'Sideboard') return item }).length
        const PCB = ans.filter((item) => { if (item.type === 'PCB') return item }).length
        const Speaker = ans.filter((item) => { if (item.type === 'Speaker') return item }).length

        res.status(201).json({ BackHousing, Battery, Charger, DataCable, LCDModule, LCM, Mainboard, Sideboard, PCB, Speaker });

    } catch (e) {
        console.log(e)
        res.status(404).json({ message: "No Revenue Data Found" });
    }
};

exports.getAllRequests = async (req, res) => {
    try {
        const partRequests = await PartRequest.find({ status: { $ne: 'completed' } }).populate('requestedParts').populate('user', 'fullName email')
        res.status(200).json(partRequests);
    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};
