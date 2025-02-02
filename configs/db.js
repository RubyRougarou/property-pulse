const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    if (mongoose.connections[0].readyState) return false;

    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB successfully.😀");
  } catch (err) {
    console.log("ridi: ", err);
  }
};

export default connectDb;
