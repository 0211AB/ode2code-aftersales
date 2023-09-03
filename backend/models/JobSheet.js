const mongoose = require('mongoose');

const jobSheetSchema = new mongoose.Schema({
    serviceCenter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ServiceCenter',
        required: true,
    },
    customer: { type: String, required: true },
    contactNumber: { type: String },
    deviceIssue: { type: String, required: true },
    assignedParts: [
        {
            sparePart: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'SparePart',
            },
            quantity: { type: Number, default: 1 },
        },
    ],
    completed: { type: Boolean, default: false },
    createdDate: { type: Date, default: Date.now },
    diagnosticsNotes: String,
    repairNotes: String,
    images: [String],
});

const JobSheet = mongoose.model('JobSheet', jobSheetSchema);

module.exports = JobSheet;
