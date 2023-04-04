const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailHelper = require("../utils/mailHelper");
const crypto = require("crypto");

exports.home = (req, res) => {
  res.send("Hello ! And Welcome to full stack E-commerce project.I am Krishna(A Full Stack Web Developer)");
};

//createuser
exports.createUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("Name Email & Password must be Required");
    }
    const userExits = await User.findOne({ email });
    if (userExits) {
      throw new Error("Email Already Exists");
    }

    const myEncyPassword = await bcrypt.hash(password, 10)

    // Creating & Inserting user into the Database
    const user = await User.create({
      name,
      email,
      password: myEncyPassword,
    });

    // Token
    const token = jwt.sign({ user_id: user._id, email },
      process.env.SECRET_KEY,
      { expiresIn: '2h' }
    );
    // console.log(token);
    user.token = token
    await user.save();

    user.password = undefined
    return res.status(200).json(user)

  } catch (error) {
    return res.status(400).send("user already registered");
  }
};

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

  //login
  exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body
      if (!(email && password)) {
        return res.status(400).send("Email And Password required")
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).send("User not registerd");
      }
  
      if (user && (await bcrypt.compare(password, user.password))) {
  
        const token = jwt.sign({ user_id: user._id, email, user_role: user.role },
          process.env.SECRET_KEY,
          {
            expiresIn: '2h'
          }
        );
        user.token = token;
        await user.save();
        user.password = undefined;
  
        const options = {
          expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
          httpOnly: true,
        };
        res.cookie("token", token, options).status(200).json({
          success: true,
          user,
          token,
        });
      }
      res.status(400).send("Incorrect credincial ");
    } catch (error) {
      console.log(error.message);
    }
    next();
  };
  

// isLoggedin
exports.isloggedin = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "isLogin Failed",
    });
  }
};


  //signout
  exports.signout = async (req, res, next) => {
    try {
        res.clearCookie("token");
        res.status(200).json({
            success: true,
            message: "Signout success.",
        });
    } catch (error) {
        console.log(error.message);
        next(error);
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

  exports.admineditUser = async (req, res) => {
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

  exports.admindeleteUser = async (req, res) => {
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
      // console.log(`resetToken ${resetToken}`);

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