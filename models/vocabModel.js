const mongoose = require("mongoose");

const vocabSchema = new mongoose.Schema({
    token: { type: String, unique: true, required: true },
    id: { type: Number, unique: true, required: true }
});

module.exports = mongoose.model("Vocab", vocabSchema);
