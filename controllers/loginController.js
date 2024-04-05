require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../schema/User");
const secretKey = process.env.TOKEN; // Corrected variable name

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user with the given email exists
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({
        status: false,
        entity: "Email not found",
      });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordValid = await bcrypt.compare(password, existingUser.password);

    if (!passwordValid) {
      return res.json({
        status: false,
        entity: "Password does not match",
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
      },
      secretKey
    );

    // Send success response with user data and token
    res.status(200).json({
      status: true,
      entity: {
        id: existingUser.id,
        email: existingUser.email,
        name: existingUser.name,
        token,
      },
    });
  } catch (error) {
    // Handle errors
    console.error("Error in login:", error);
    res.json({
      status: false,
      entity: "Error in login",
      error: error.message,
    });
  }
};

module.exports = { loginUser };
