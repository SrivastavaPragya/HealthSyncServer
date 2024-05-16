import express, { Request, Response, NextFunction } from "express";
import {
  CreatePatient,
  LoginPatient,
  UpdatePatientProfile,
} from "../controllers";
import { authenticateJwt } from "../middleware/auth";

const router = express.Router();

//Patient Signup
router.post("/signup", CreatePatient);

//Patient Login
router.post("/login", LoginPatient);

//Patient Update Profile
router.put("/update", authenticateJwt, UpdatePatientProfile);

export { router as PatientRoute };
