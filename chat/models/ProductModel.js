const mongoose = require('mongoose');

const productModelSchema = new mongoose.Schema({
    skuId: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    spareParts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SparePart',
        },
    ],
    createdDate: { type: Date, default: Date.now },
    display: {
        dimensions: { type: String },
        size: { type: String },
    },
    camera: { type: String },
    os: { type: String },
    ram: { type: String },
    storage: { type: String },
    weight: { type: String },
    warrantyPeriod: { type: Number, default: 0 },
});

productModelSchema.index({ name: 'text' });

const ProductModel = mongoose.model('ProductModel', productModelSchema);

module.exports = ProductModel;
