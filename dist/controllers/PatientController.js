"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePatientProfile = exports.LoginPatient = exports.CreatePatient = void 0;
const models_1 = require("../models");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SECRET = "SECr3mm";
const CreatePatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, address, email, phoneNumber, password } = req.body;
    try {
        // Create a new patient
        const newPatient = new models_1.Patient({
            name,
            address,
            email,
            phoneNumber,
            password
        });
        // Save the new patient 
        const savedPatient = yield newPatient.save();
        // Respond with the created patient data
        res.status(201).json({
            message: "Patient created successfully",
            patientId: savedPatient._id,
            name: savedPatient.name,
            email: savedPatient.email
        });
    }
    catch (error) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
});
exports.CreatePatient = CreatePatient;
const LoginPatient = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const patient = yield models_1.Patient.findOne({ email: email });
        // Check if patient exists
        if (!patient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        if (patient.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ email: patient.email, id: patient._id }, SECRET, { expiresIn: '1h' });
        res.status(200).json({
            message: "Login successful",
            token
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.LoginPatient = LoginPatient;
const UpdatePatientProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.patient) {
        return res.status(401).json({ message: "'Unauthorized'" });
    }
    const PatientId = req.patient.id;
    const updates = req.body;
    try {
        const patient = yield models_1.Patient.findByIdAndUpdate(PatientId, updates, { new: true });
        if (!patient) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(patient);
    }
    catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});
exports.UpdatePatientProfile = UpdatePatientProfile;
