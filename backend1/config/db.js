import mongoose from "mongoose";
import colors from "colors";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`connected to MongoDb Data-Base!`.bgGreen.white);
  } catch (error) {
    console.log(`Error while connecting to MONGO_DB ${error}`.bgRed.white);
  }
};

export default connectDB;