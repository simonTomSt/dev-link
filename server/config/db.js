const config = require("config");
const mongoose = require("mongoose");

const db = config.get("mongoURI");
const connectDB = async () => {
    try {
        console.log(db);
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log("Mongo db connected");
    } catch (err) {
        console.log(err.message);

        process.exit(1);
    }
};

module.exports = connectDB;
