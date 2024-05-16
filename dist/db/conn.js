"use strict";
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connection is successful");
}).catch((e) => {
    console.log(e);
});
