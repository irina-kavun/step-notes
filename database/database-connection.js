const mongoose = require('mongoose');
// const mongoURI = "mongodb+srv://Users:123@cluster0-aj2no.mongodb.net/test?retryWrites=true&w=majority";
const mongoURI = "mongodb+srv://test:test@cluster0-uj202.mongodb.net/testNote?retryWrites=true&w=majority";

async function connectDB() {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log('connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;
