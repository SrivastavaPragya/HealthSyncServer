import { Request, Response, NextFunction } from "express";
import { DoctorInput } from "../dto";
import { Doctor, Hospital } from "../models";

export const CreateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, PatientCount, HospitalId } = req.body as DoctorInput;

  try {
    const newDoctor = new Doctor({
      name,
      PatientCount,
      HospitalId,
    });

    const hospital = await Hospital.findById(HospitalId);

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // Push the new doctor into the doctors array of the hospital
    hospital.doctors.push(newDoctor);

    // Save the hospital with the updated doctors array
    await hospital.save();

    const doctor = await newDoctor.save();

    res.status(201).json({ message: "Doctor created successfully", doctor });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.errors });
  }
};



// to update doctors profile
export const updateDoctor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { doctorId } = req.params;
    const updates = req.body;

    // Check if the id is valid
    if (!doctorId) {
      return res.status(400).json({ error: "Doctor ID is required" });
    }

    // Find the doctor by id
    const doctor = await Doctor.findById(doctorId);

    // If doctor not found, return error
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    // Update the doctor
    const updatedDoctor = await Doctor.findByIdAndUpdate(doctorId, updates, {
      new: true,
    });

    return res.status(200).json(updatedDoctor);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
