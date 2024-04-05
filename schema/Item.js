const mongoose = require("mongoose");

// Define the Folder schema
const itemSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  folderId: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Item = mongoose.models.Item || mongoose.model("Item", itemSchema);

module.exports = Item;
