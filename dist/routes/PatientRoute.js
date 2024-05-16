"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientRoute = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
exports.PatientRoute = router;
router.post('/signup', controllers_1.CreatePatient);
router.post('/login', controllers_1.LoginPatient);
router.use(auth_1.authenticateJwt);
router.post('/update', controllers_1.UpdatePatientProfile);
