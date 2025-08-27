import express from "express";
import { bookVehicle,cancelBooking  } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", bookVehicle);
router.delete("/:id", cancelBooking);
export default router;
