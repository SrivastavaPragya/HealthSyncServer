import express, { Request, Response, NextFunction } from "express";
import { CreateHospital, getHospitalDetails } from "../controllers";

const router = express.Router();

//Create Hospital Route
router.post("/signup", CreateHospital);

//Get Hospital Informations
router.post("/info", getHospitalDetails);

export { router as HospitalRoute };
