import Vehicle from "../models/vehicle.js";
import Booking from "../models/booking.js";
import { calculateRideDuration } from "../utils/rideDuration.js";

// Add Vehicle
export const addVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || !capacityKg || !tyres) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
};
// Get Available Vehicles
export const getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;

    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res.status(400).json({ error: "Missing required query params" });
    }

    const start = new Date(startTime);
    const duration = calculateRideDuration(fromPincode, toPincode);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    // Vehicles with enough capacity
    const vehicles = await Vehicle.find({ capacityKg: { $gte: capacityRequired } });

    // Filter out booked ones
    const available = [];
    for (const v of vehicles) {
      const overlap = await Booking.findOne({
        vehicleId: v._id,
        $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }]
      });
      if (!overlap) {
        available.push({ ...v.toObject(), estimatedRideDurationHours: duration });
      }
    }

    res.json(available);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
