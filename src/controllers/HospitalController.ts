import { Request, Response, NextFunction } from "express";
import { HospitalInput } from "../dto";
import { Hospital } from "../models";

export const CreateHospital = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, TotalPatientCount, TotalDoctorCount } =
    req.body as HospitalInput;
  try {
    const newHospital = new Hospital({
      name,
      TotalPatientCount,
      TotalDoctorCount,
    });
    const hospital = await newHospital.save();
    res.status(201).json({ message: "Hospital crrated suceesfully", hospital });
  } catch (error: any) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: error.errors });
  }
};

export const getHospitalDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { hospitalId } = req.body;

  try {
    const hospital = await Hospital.findById(hospitalId).populate("doctors");

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }
    res.status(200).json({ hospital });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error });
  }
};
