"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./db/conn");
const routes_1 = require("./routes");
const DoctorRoute_1 = require("./routes/DoctorRoute");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/patient', routes_1.PatientRoute);
app.use('/hospital', routes_1.HospitalRoute);
app.use('/doctor', DoctorRoute_1.DoctorRoute);
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
