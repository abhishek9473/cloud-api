require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schema/User");
const secretKey = process.env.TOKEN;

const addUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({
        status: false,
        entity: "Email already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user instance
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Generate token
    const token = jwt.sign(
      { id: savedUser.id, email: savedUser.email, name: savedUser.name },
      secretKey
    );

    // Send success response with user data and token
    res.status(201).json({
      status: true,
      entity: {
        name: savedUser.name,
        token,
      },
    });
  } catch (error) {
    // Handle errors
    console.error("Error in adding user:", error);
    res.status(500).json({
      status: false,
      entity: "Error in adding user",
      error: error.message,
    });
  }
};

module.exports = { addUser };
