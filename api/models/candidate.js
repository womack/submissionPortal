//Dependencies
const restful = require("node-restful");
const mongoose = restful.mongoose;

//Schema
const candidateSchema = new mongoose.Schema({
    name: String,
    countDownDate: Number,
    submitted: Boolean,
    givenKey: Number,
    exerciseURL: String,
    timeGiven: Number,
    url: String
});

//Return model
module.exports = restful.model("Candidates", candidateSchema);