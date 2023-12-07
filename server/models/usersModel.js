const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: "Please enter valid email",
      },
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["student", "admin", "librarian"],
      default: "student", // patron, admin, librarian
    },
    status: {
      type: String,
      required: true,
      default: "pending", // active, inactive or pending
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", userSchema);
