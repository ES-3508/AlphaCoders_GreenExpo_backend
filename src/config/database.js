import mongoose from "mongoose";

export const ConnectMongoDb = async () => {
  const mongo_url = process.env.MONGO_URL;
  try {
    await mongoose.connect(mongo_url);
    console.log("Database connected succesfully");
  } catch (error) {
    console.log(`error while connecting database: ${error}`);
  }
};
