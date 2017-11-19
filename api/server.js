//Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const apiRoutes = require("./routes/api");


//MongoDB
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/submissionDB", {useMongoClient: true});

//Express
const app = express();
const port = 3001;
app.use(cors({origin: "www.submission.ewomack.com"}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


//Routes
app.use("/api", apiRoutes);

// app.put("/addWeek", (req, res) => {
//     console.log(req.body);
//     trainer.findOneAndUpdate({
//         "name": req.body.name
//     }, {
//         $push: {
//             "feedback": req.body.feedback[0]
//         }
//     }, {
//         new: true
//     }, (err, resp) => {
//         if (err) {
//             return res.send(err)
//         };
//         res.send("Added Successfully");
//     });
// });

//Starting Server
app.listen(port);
console.log(`Running on ${port}`);