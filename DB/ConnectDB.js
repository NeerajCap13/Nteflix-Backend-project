import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/Netflix`
    );
    console.log(`DB is Connected !! ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log("error", error);
  }
};

export { ConnectDB };
