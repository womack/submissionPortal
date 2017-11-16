// Dependencies
const express = require("express");
const router = express.Router();

// Models
const submission = require("../models/submission");
const candidate = require("../models/candidate");

// Routes
candidate.methods(["get", "put", "post", "delete"]);
candidate.register(router, "/candidate");
submission.methods(["get", "put", "post", "delete"]);
submission.register(router, "/submission");

// Return router
module.exports = router;