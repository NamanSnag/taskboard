const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  taskOrder: {
    type: Array,
    default: [],
  },
},{
    timestamps: true,
});

const List = mongoose.model("List", listSchema);

module.exports = List;
