const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, default: "new" },
    raisedOn: { type: Date, default: Date.now },
    issueDescription: { type: String, required: true },
    comments: { type: String },
});

module.exports = mongoose.model("Request", RequestSchema);