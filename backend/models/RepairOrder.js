const mongoose = require('mongoose');

const repairOrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  address: { type: String },
  model: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductModel'
  },
  assignedParts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SparePart',
    },
  ],
  completed: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
  completionDate: { type: Date }
});

const RepairOrder = mongoose.model('RepairOrder', repairOrderSchema);

module.exports = RepairOrder;
