import mongoose, { Schema, Document } from "mongoose";

export interface DoctorDoc extends Document {
  name: string;
  PatientCount: number;
  HospitalId: mongoose.Schema.Types.ObjectId;
}

const DocSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  PatientCount: {
    type: Number,
    required: true,
  },
  HospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
  },
});

const Doctor = mongoose.model<DoctorDoc>("Doctor", DocSchema);

export { Doctor };
