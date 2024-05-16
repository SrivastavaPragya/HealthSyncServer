import {Request,Response,NextFunction} from 'express'
import { PatientInput,PatientLogin } from '../dto'
import { Patient } from '../models'
import jwt, { JwtPayload } from 'jsonwebtoken';
// const SECRET= process.env.SECRET;
const SECRET= "SECr3mm";


export const CreatePatient = async (req: Request, res: Response, next: NextFunction) => {
    const { name, address, email, phoneNumber, password } = req.body as PatientInput;

    try {
        // Create a new patient
        const newPatient = new Patient({
            name,
            address,
            email,
            phoneNumber,
            password 
        });

        // Save the new patient 
        const savedPatient = await newPatient.save();

        // Respond with the created patient data
        res.status(201).json({
            message: "Patient created successfully",
            patientId: savedPatient._id,
            name: savedPatient.name,
            email: savedPatient.email
        });
    } catch (error:any) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
};



export const LoginPatient = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body as PatientLogin;

    try {
        
        const patient = await Patient.findOne({ email: email });

        // Check if patient exists
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }

      
        if (patient.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        console.log(SECRET);

        if(!SECRET){
            return res.status(500).json({ message: "Secret Not Defined" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { email: patient.email, id: patient._id },
            SECRET, 
            { expiresIn: '1h' }
        );

       
        res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
    
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const UpdatePatientProfile = async (req: Request & { patient?: JwtPayload }, res: Response, next: NextFunction) => {
    
    if(!req.patient){
        return res.status(401).json({ message: "Unauthorized" });
      }

      const PatientId=req.patient.id;
      const updates=req.body;
    try {
       
        const patient = await Patient.findByIdAndUpdate(PatientId, updates, { new: true });
        if (!patient) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(patient);

    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};