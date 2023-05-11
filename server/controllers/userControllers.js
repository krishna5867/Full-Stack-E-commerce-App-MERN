const User = require("../models/userModel");
// import generateAuthtoken from "../utils/generateToken.js";
const bcrypt = require("bcryptjs");
const mailHelper = require("../utils/mailHelper");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


exports.home = (req, res) => {
  res.send("Hello ! And Welcome to full stack E-commerce project.I am Krishna(A Full Stack Web Developer)");
};
//registration
exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(422).json({ error: "Please fill in all required fields" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(422).json({ error: "Email is already registered" });
    }

    const user = new User({ name, email, password });

    await user.save();

    res.status(201).json({ status: 201, user, token });
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

//Login
exports.login = async (req, res) => {
  try {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("All fiels required")
  }
    const userValid = await User.findOne({ email: email });

    if (userValid) {
      const isMatch = await bcrypt.compare(password, userValid.password);

      if (!isMatch) {
        res.status(401).json({ error: "invalid details" })
      } else {
        
        const token = await userValid.generateAuthtoken();
        // console.log(token);

        res.cookie("usercookie", token, {
          expires: new Date(Date.now() + 86400000),
          httpOnly: true
        });

        const result = {
          userValid,
          token
        }
        res.status(201).json({ status: 201, result })
      }
    }

  } catch (error) {
    res.status(401).json(error);
    console.log(error);
  }
};

exports.validuser = async (req, res) => {
  try {
      const user = await User.findOne({ _id: req.userId });
      if (user) {
          res.status(201).json({ status: 201, message: "Valid User", validUser: user });
      } else {
          res.status(401).json({ status: 401, message: "User not found" });
      }
  } catch (error) {
      console.error(error);
      res.status(401).json({ status: 401, message: "Error in validating user" });
  }
};

// logout
exports.signout = async (req, res) => {
  try {
    req.rootUser.tokens = req.rootUser.tokens.filter((curelem) => {
      return curelem.token !== req.token
    });

    res.clearCookie("usercookie", { path: "/" });

    req.rootUser.save();

    res.status(201).json({ status: 201, message: 'Signout Successfull' })

  } catch (error) {
    res.status(401).json({ status: 401, error })
  }
}

//getsingleusers
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json({
      success: true,
      user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

//Admin
exports.adminGetUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

exports.adminEditUser = async (req, res) => {
  try {
    const users = await User.findByIdAndUpdate(req.params.id);
    res.status(200).json({
      success: true,
      users
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

exports.adminDeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      user
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};


//password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Email not found")
    }
    const resetToken = user.getForgotPasswordToken();
    await user.save();

    const myUrl = `http://localhost:${process.env.FRONTEND_PORT}/passwordReset/${resetToken}`;
    const message = `Paste This link in your browser to reset password\n\n ${myUrl}`;

    await mailHelper({
      email: user.email,
      subject: "Reset Password - Password reset email",
      message,
    });
    res.status(200).json({
      succes: true,
      message: "Email sent successfully to your registered id",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Failed to sent email"
    })
  }
};

exports.passwordReset = async (req, res) => {
  try {
    const { token } = req.params;

    const forgotPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");
    // console.log(`forgotPasswordToken: ${forgotPasswordToken}`);

    const user = await User.findOne({
      forgotPasswordToken: forgotPasswordToken,
      forgotPasswordExpiry: { $gt: Date.now() },
    });
    // console.log(`user: ${user}`);

    if (!user) {
      throw new Error("Token is invalid or has been expired");
    }

    const { password, confirmPassword } = req.body;

    if (!password || password.trim() === "" || !confirmPassword || confirmPassword.trim() === "") {
      throw new Error("Password and Confirm password fields are required");
    }

    if (password !== confirmPassword) {
      throw new Error("Password and Confirm password does not match");
    }

    user.password = await bcrypt.hash(password, 10);
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Changed Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password, newpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: 'User not found'
      });
    }
    const matchPassword = (user && (await bcrypt.compare(password, user.password)))
    if (!matchPassword) {
      throw new Error('Password not matched')
    }
    const hashedPassword = await bcrypt.hash(newpassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: 'An error occurred while changing the password'
    });
  }
};

