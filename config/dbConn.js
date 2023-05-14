import mongoose from "mongoose";

export const dbConn = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_DEV_URI);
  } catch (error) {
    console.log(error);
  }
}

mongoose.connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});