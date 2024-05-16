import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

interface PatientDoc extends Document {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: string;
}

const patientSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
    minlength: [10, "Address must be at least 10 characters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (v: string) {
        return /\+\d{1,3}\d{9,15}/.test(v);
      },
      message: `phoneNo is not a valid phone number!`,
    },
    required: [true, "Phone number is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [8, "Password must be at least 8 characters long"],
    maxlength: [15, "Password must not be more than 15 characters long"],
    validate: {
      validator: function (v: string) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(v);
      },
      message:
        "Password must contain at least one upper character, one lower character, and one number.",
    },
  },
});

const Patient = mongoose.model<PatientDoc>("Patient", patientSchema);

export { Patient };
