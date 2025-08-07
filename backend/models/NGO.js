const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    contact: String,
    area: String,
    resources: String,
}, {collection: "ngoinfos"});

module.exports = mongoose.model('NGOInfo', ngoSchema);
