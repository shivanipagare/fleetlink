import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";  // ✅ NOT server.js
import Vehicle from "../src/models/vehicle.js";

beforeAll(async () => {
  const mongoUri = "mongodb://127.0.0.1:27017/fleetlink_test";
  await mongoose.connect(mongoUri);
});

afterEach(async () => {
  // clean test data after each test
  await Vehicle.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Vehicle API", () => {
  it("should add a new vehicle", async () => {
    const res = await request(app).post("/api/vehicles").send({
      name: "Truck A",
      capacityKg: 5000,
      tyres: 6,
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe("Truck A");
  });

  it("should fetch all vehicles", async () => {
    await Vehicle.create({ name: "Van X", capacityKg: 1000, tyres: 4 });

    const res = await request(app).get("/api/vehicles");

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
