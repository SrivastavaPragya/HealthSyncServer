import express, { Request, Response, NextFunction } from "express";
import { CreateDoctor, updateDoctor } from "../controllers/DoctorController";

const router = express.Router();

//Create Doctor Route
router.post("/signup", CreateDoctor);

//Update Doctor Route
router.put("/update/:doctorId", updateDoctor);


export { router as DoctorRoute };
