const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
const RepairOrder = require("../models/RepairOrder");
var ObjectId = require("mongodb").ObjectId;

exports.signupUser = async (req, res) => {
    try {

        const username = faker.internet.userName(req.body.name)
        var user = {
            ...req.body, username
        }

        var usr = new User(user);
        const token = await usr.generateAuthToken();
        await usr.save();
        res.status(201).json({ token, ID: usr._id, user: usr, Message: "User Sign Up Succesful" });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.createUser = async (req, res) => {
    try {

        if (req.user.role !== 'admin')
            throw new Error('Only Admin Can Create Authorized Users')

        const username = faker.internet.userName(req.body.name)
        var user = {
            ...req.body, username
        }

        var usr = new User(user);
        const token = await usr.generateAuthToken();
        await usr.save();
        res.status(201).json({ token, user: usr, Message: "User Creation Succesful" });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.loginUser = async (req, res) => {
    try {
        const password = req.body.password;
        const email = req.body.email;
        const role = req.body.role

        const user = await User.findOne({ email, role });

        if (!user) res.status(404).json({ Message: "User not found" });
        else {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = await user.generateAuthToken();
                // const saved_user = await user.save();

                res
                    .status(200)
                    .json({ token, ID: user._id, user, Message: "Login Successful" });
            } else {
                res.status(400).json({ Message: "Incorrect Credentials" });
            }
        }
    } catch (e) {
        console.log(e);
        res.status(404).json(e);
    }
};

exports.updateUserRole = async (req, res) => {
    try {

        if (req.user.role !== 'admin')
            return res.status(404).json({ message: "Only Admin Can Update Role" });

        const email = req.body.email;
        const user = await User.findOne({ email });

        if (!user) res.status(404).json({ message: "User not found" });

        user.role = req.body.role
        await user.save();
        res.status(200).json({ message: "Role Updated Succesfully" });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getUserDetails = async (req, res) => {
    try {
        res.status(200).json(req.user);

    } catch (e) {
        res.status(404).json(e);
    }
};

exports.requestPickup = async (req, res) => {
    try {

        var requests = await RepairOrder.find({ user: req.user._id });
        if (requests.length > 0) {
            var lastRequestStatus = requests[requests.length - 1].completed
            if (lastRequestStatus === false)
                return res.status(400).json({ Message: "A request is already underway" });
            else {
                var request = new RepairOrder({
                    user: req.user._id,
                    address: req.body.address,
                    model: ObjectId(req.body.model),
                })

                await request.save();
            }
        }
        else {
            var request = new RepairOrder({
                user: req.user._id,
                address: req.body.address,
                model: ObjectId(req.body.model),
            })

            await request.save();
        }

        res.status(201).json({ Message: "Request Created Succesfully" });

    } catch (e) {
        console.log(e)
        res.status(404).json(e);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        var users =await User.find({ role: 'user' }).select({password:0,tokens:0,_id:0})
        res.status(200).json(users);

    } catch (e) {
        res.status(404).json(e);
    }
};

exports.getAllAdmins = async (req, res) => {
    try {
        var admins =await User.find({ role: { $ne: 'user' } }).select({password:0,tokens:0,_id:0})
        res.status(200).json(admins);

    } catch (e) {
        res.status(404).json(e);
    }
};