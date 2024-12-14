const mongoose = require('mongoose');

const uri = "mongodb+srv://passthefoodDB:passthefoodDBpassword@cluster0.xen2e.mongodb.net/passthefoodDb?retryWrites=true&w=majority&appName=Cluster0";

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions)
    console.log("Successfully connected to MongoDB!");
  } catch(error){
        console.log(error);
  }
}

module.exports = connectDB

