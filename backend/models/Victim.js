const mongoose = require('mongoose');

const victimSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    age: Number,
    location: String,
    needs: String,
}, {collection: "victiminfos"});

module.exports = mongoose.model('VictimInfo', victimSchema);
