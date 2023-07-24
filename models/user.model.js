const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    occupation: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["user", "seller", "admin"],
      default: "user",
      required: true,
    },
  },
  { timestamps: true }
);

//signup
userSchema.static.signup = async function (
  name,
  email,
  password,
  image,
  address,
  occupation
) {
  if (!name || !email || !password || !image || !address || !occupation) {
    throw new Error("All field must be filled.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Invalid email");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password is not strong(must contain 8+ chars, uppercase, lowercase, number and symbol"
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashPassword,
    image,
    address,
    occupation,
  });

  return user;
};

/* LOGIN */

userSchema.static.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All field must be filled.");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("Incorrect email or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Incorrect email or password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
