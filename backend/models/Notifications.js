const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    modelName: { type: String },
    modelSkuId:{type:String},
    resolved: { type: Boolean, default: false },
});

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
