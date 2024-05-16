import mongoose, { Schema, Document } from "mongoose";

import { DoctorDoc } from "./Doctor";

interface HospitalDoc extends Document {
  name: string;
  TotalPatientCount: number;
  TotalDoctorCount: number;
  doctors: DoctorDoc[];
}

const HospitalSchema = new Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  TotalPatientCount: {
    type: Number,
    required: true,
  },
  TotalDoctorCount: {
    type: Number,
    required: true,
  },
  doctors: [{ type: Schema.Types.ObjectId, ref: "Doctor" }],
});

const Hospital = mongoose.model<HospitalDoc>("Hospital", HospitalSchema);

export { Hospital };
