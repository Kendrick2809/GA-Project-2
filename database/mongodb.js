require("dotenv").config();

const mongoose = require("mongoose");

const connStr = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@generalassembly.qzxpjfv.mongodb.net/test`;

const DB = mongoose.connect(connStr, { dbName: "GA_Project2" });

module.exports = DB;
