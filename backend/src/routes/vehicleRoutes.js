import express from "express";
import { getAllVehicles,addVehicle, getAvailableVehicles } from "../controllers/vehicleController.js";

const router = express.Router();
router.get("/", getAllVehicles);
router.post("/", addVehicle);
router.get("/available", getAvailableVehicles);

export default router;
