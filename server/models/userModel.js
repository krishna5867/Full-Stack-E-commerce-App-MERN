const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "Name is Required"],
    trim: true,
    maxlength: [25, "Name must be 25 Character Long"],
  },
  email: {
    type: String,
    require: [true, "Email is Required"],
    unique: true,
  },
  password: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        // required: true,
      }
    }
  ],
  role: {
    type: String,
    default: "user"
  },
  forgotPasswordToken: {
    type: String
  },
  forgotPasswordExpiry: {
    type: String
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
},
  {
    timestamps: true,
  }
);

//forget password
userSchema.methods.getForgotPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.forgotPasswordExpiry = Date.now() + 20 * 60 * 1000;

  return resetToken;
};

// generate token 
userSchema.methods.generateAuthtoken = async function () {
  try {
    let token23 = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY, {
      expiresIn: "1d"
    });
    this.tokens = this.tokens.concat({ token: token23 });
    await this.save();
    return token23;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}


module.exports = mongoose.model("User", userSchema);
