const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');
const RepairOrder = require("../models/RepairOrder");
const Notification = require("../models/Notifications");
var ObjectId = require("mongodb").ObjectId;

exports.getAllNotifications = async (req, res) => {
    try {
        var notifs = await Notification.find({ resolved: false }).select({ _id: 0 })
        res.status(200).json(notifs);

    } catch (e) {
        res.status(404).json(e);
    }
};

exports.createNewNotifications = async (req, res) => {
    try {
        var notifExists = await Notification.findOne(req.body)
        if (notifExists)
            return res.status(404).json({ message: 'Your Request Is Already Being Processed' })
        var notif = new Notification(req.body)
        await notif.save();
        res.status(200).json({ ...notif, message: 'Notification sent to admins' });

    } catch (e) {
        res.status(404).json(e);
    }
};

exports.updateNotifications = async (req, res) => {
    try {
        var notifExists = await Notification.findOne(req.body)
        if (notifExists === null)
            return res.status(404).json({ message: 'Notification Not Found' })
        notifExists.resolved = true
        await notifExists.save();
        res.status(200).json({ ...notifExists, message: 'Notification Status Updated' });

    } catch (e) {
        res.status(404).json(e);
    }
};

