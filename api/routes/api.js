// Dependencies
const express = require("express");
const router = express.Router();

// Models
const candidate = require("../models/candidate");

// Routes
candidate.methods(["get", "put", "post", "delete"]);
candidate.register(router, "/candidate");


// Return router
module.exports = router;