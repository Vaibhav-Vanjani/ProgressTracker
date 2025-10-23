const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = mongoose.connect(process.env.MONGO_DB_URL).then((response)=>{
    console.log("DB-connection-success !!");
}).catch((err)=>{
    console.log("error while connecting to DB",err);
})

module.exports = dbConnect;