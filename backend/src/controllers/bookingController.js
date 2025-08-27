import Vehicle from "../models/vehicle.js";
import Booking from "../models/booking.js";
import { calculateRideDuration } from "../utils/rideDuration.js";

// Book Vehicle
export const bookVehicle = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } = req.body;

    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const start = new Date(startTime);
    const duration = calculateRideDuration(fromPincode, toPincode);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });

  
    const overlap = await Booking.findOne({
      vehicleId,
      $or: [{ startTime: { $lt: end }, endTime: { $gt: start } }]
    });
    if (overlap) return res.status(409).json({ error: "Vehicle already booked" });

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId
    });  

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Cancel Booking
export const cancelBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    await booking.deleteOne();
    res.json({ message: "Booking cancelled successfully", id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
