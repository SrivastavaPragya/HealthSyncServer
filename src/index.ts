import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { InitDatabase } from "./db/Connection";
import { HospitalRoute, PatientRoute } from "./routes";
import { DoctorRoute } from "./routes/DoctorRoute";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;
InitDatabase();

app.use(cors());
app.use(bodyParser.json());
app.use("/patient", PatientRoute);
app.use("/hospital", HospitalRoute);
app.use("/doctor", DoctorRoute);


// Test Route 
app.get("/",(req,res)=>{
    res.json({
        message:"Welcome to HealthSyncServer!"
    })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
