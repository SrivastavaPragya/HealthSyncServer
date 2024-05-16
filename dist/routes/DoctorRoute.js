"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorRoute = void 0;
const express_1 = __importDefault(require("express"));
const DoctorController_1 = require("../controllers/DoctorController");
const router = express_1.default.Router();
exports.DoctorRoute = router;
router.post('/signup', DoctorController_1.CreateDoctor);
router.post('/update', DoctorController_1.updateDoctor);
