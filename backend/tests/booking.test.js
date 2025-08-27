import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";
import Vehicle from "../src/models/vehicle.js";
import Booking from "../src/models/booking.js";

beforeAll(async () => {
  const mongoUri = "mongodb://127.0.0.1:27017/fleetlink_test";
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  await Booking.deleteMany();
  await Vehicle.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Booking API", () => {
  let vehicle;

  beforeEach(async () => {
    vehicle = await Vehicle.create({
      name: "Mini Truck",
      capacityKg: 2000,
      tyres: 4,
    });
  });

  it("should create a booking", async () => {
    const res = await request(app).post("/api/bookings").send({
      vehicleId: vehicle._id.toString(),
      fromPincode: "123456",
      toPincode: "654321",
      startTime: new Date().toISOString(),
      customerId: "cust123",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.vehicleId).toBe(vehicle._id.toString());

    const booking = await Booking.findOne({ customerId: "cust123" });
    expect(booking).not.toBeNull();
  });

  it("should cancel a booking", async () => {
    const booking = await Booking.create({
      vehicleId: vehicle._id,
      fromPincode: "123456",
      toPincode: "654321",
      startTime: new Date(),
      endTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
      customerId: "cust999",
    });

    const res = await request(app).delete(`/api/bookings/${booking._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Booking cancelled successfully");

    const deleted = await Booking.findById(booking._id);
    expect(deleted).toBeNull();
  });
});
