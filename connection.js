require("dotenv").config();
const mongoose = require("mongoose");

const connectionURL = process.env.MONGODB_URI;

// const connectionParams = {
//   // useNewUrlParser: true,
//   // useUnifiedTopology: true,
// };

const connectDB = async () => {
  console.log(connectionURL);
  try {
    await mongoose.connect(connectionURL); // Use mongoose.connect directly
    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

connectDB();
