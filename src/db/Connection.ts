const mongoose = require("mongoose");

export const InitDatabase = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connection Established!");
    }).catch((e:any) => {
        console.log(e);
    });
}
