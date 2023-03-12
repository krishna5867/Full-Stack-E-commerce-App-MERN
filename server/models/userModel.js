const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is Required"],
    trim: true,
    maxlength: [25, "Name must be 25 Ch Long"],
  },
  email: {
    type: String,
    require: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
  role:{
    type: String,
    default: "user"
  },
  forgotPasswordToken:{
    type: String
  } ,
  forgotPasswordExpiry:{
    type: String 
  }
},
  {
    timestamps: true,
  }
);

userSchema.methods.getForgotPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken )
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return resetToken;
};


module.exports = mongoose.model("User", userSchema);
