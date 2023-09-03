const mongoose = require('mongoose');

const partRequestSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    requestedParts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SparePart',
        }
    ],
    priorityLevel: { type: String, enum: ['urgent', 'high', 'medium', 'low',], default: 'low' },
    status: {
        type: String, enum: [
            "pending-approval",
            "in-progress",
            "dispatched-from-warehouse",
            "in-transit",
            "completed",
            "rejected"
        ], default: 'pending-approval'
    },
    price: { type: String },
    estimatedDeliveryDate: { type: Date },
}, { timestamps: true });

const PartRequest = mongoose.model('PartRequest', partRequestSchema);

module.exports = PartRequest;
