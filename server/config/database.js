const mongoose = require("mongoose");

require('dotenv').config();

const dbConnect = async ()=>{
    await mongoose.connect(process.env.DB_URL)
    .then(console.log("database connection successfull"))
    .catch((error)=>{
        console.log(error);
        console.log("Error while connecting to Database");
        process.exit(1);
    })
}

module.exports = dbConnect;