//Dependencies
const restful = require("node-restful");
const mongoose = restful.mongoose;

//Schema
const submissionSchema = new mongoose.Schema({
    candidateName: String,
    documentURL: String    
});

//Return model
module.exports = restful.model("Submissions", submissionSchema);