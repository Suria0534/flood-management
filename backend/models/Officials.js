const mongoose = require('mongoose');

const officialSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    designation: String,
    department: String,
    contact: String,
}, {collection: "officialsinfos"});

module.exports = mongoose.model('OfficialsInfo', officialSchema);
