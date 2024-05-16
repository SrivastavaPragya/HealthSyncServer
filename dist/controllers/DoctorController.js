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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDoctor = exports.CreateDoctor = void 0;
const models_1 = require("../models");
const SECRET = "SECr3mm";
const CreateDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, PatientCount, HospitalId } = req.body;
    try {
        const newDoctor = new models_1.Doctor({
            name,
            PatientCount,
            HospitalId
        });
        const hospital = yield models_1.Hospital.findById(HospitalId);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        // Push the new doctor into the doctors array of the hospital
        hospital.doctors.push(newDoctor);
        // Save the hospital with the updated doctors array
        yield hospital.save();
        const doctor = yield newDoctor.save();
        res.status(201).json({ message: "Doctor created successfully", doctor });
    }
    catch (error) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
});
exports.CreateDoctor = CreateDoctor;
// to update doctors profile
const updateDoctor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const updates = req.body;
        // Check if the id is valid
        if (!id) {
            return res.status(400).json({ error: 'Doctor ID is required' });
        }
        // Find the doctor by id
        const doctor = yield models_1.Doctor.findById(id);
        // If doctor not found, return error
        if (!doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        // Update the doctor
        const updatedDoctor = yield models_1.Doctor.findByIdAndUpdate(id, updates, { new: true });
        return res.status(200).json(updatedDoctor);
    }
    catch (error) {
        return res.status(500).json({ error: 'Internal server error' });
    }
});
exports.updateDoctor = updateDoctor;
