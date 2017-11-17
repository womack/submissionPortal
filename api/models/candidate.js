//Dependencies
const restful = require("node-restful");
const mongoose = restful.mongoose;

//Schema
const candidateSchema = new mongoose.Schema({
    name: String,
    startTime: Number,
    started: Boolean,
    key: Number,
    documentURL: String    
});

//Return model
module.exports = restful.model("Candidates", candidateSchema);