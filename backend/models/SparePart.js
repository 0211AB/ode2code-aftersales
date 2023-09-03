const mongoose = require('mongoose');

const sparePartSchema = new mongoose.Schema({
  sku: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  type: { type: String },
  description: { type: String },
  crossCompatibleModels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ProductModel',
    },
  ],
  price: { type: String },
  quantity: { type: Number },
  available: { type: Boolean, default: false },
  locations: { type: String }, // Warehouse location
});

const SparePart = mongoose.model('SparePart', sparePartSchema);

module.exports = SparePart;
