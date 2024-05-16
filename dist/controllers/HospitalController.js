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
exports.getHospitalDetails = exports.CreateHospital = void 0;
const models_1 = require("../models");
const SECRET = "SECr3mm";
const CreateHospital = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, TotalPatientCount, TotalDoctorCount } = req.body;
    try {
        const newHospital = new models_1.Hospital({
            name,
            TotalPatientCount,
            TotalDoctorCount
        });
        const hospital = yield newHospital.save();
        res.status(201).json({ message: "Hospital crrated suceesfully", hospital });
    }
    catch (error) {
        return res.status(400).json({ message: "Validation failed", errors: error.errors });
    }
});
exports.CreateHospital = CreateHospital;
const getHospitalDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { hospitalId } = req.body;
    try {
        const hospital = yield models_1.Hospital.findById(hospitalId).populate('doctors');
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        res.status(200).json({ hospital });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", error });
    }
});
exports.getHospitalDetails = getHospitalDetails;
