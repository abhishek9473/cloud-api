const mongoose = require("mongoose");

// Define the Folder schema
const folderSchema = new mongoose.Schema({
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Folder = mongoose.models.Folder || mongoose.model("Folder", folderSchema);

module.exports = Folder;
