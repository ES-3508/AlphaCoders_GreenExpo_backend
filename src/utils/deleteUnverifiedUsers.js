import cron from "node-cron";
import User from "../models/auth/userModel.js";

const deleteUnverifiedUsers = async () => {
  console.log("Running cron job to delete unverified users...");

  try {
    await User.deleteMany({
      isVerified: false,
      verificationExpires: { $lt: new Date() },
    });
    console.log("Expired unverified users deleted successfully.");
  } catch (error) {
    console.error("Error deleting unverified users:", error);
  }
};

// Schedule the cron job to run every hour
const scheduleDeleteUnverifiedUsers = () => {
  cron.schedule("0 * * * *", deleteUnverifiedUsers);
};

export default scheduleDeleteUnverifiedUsers;
