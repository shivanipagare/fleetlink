import React, { useState } from "react";
import { addVehicle } from "../api/vehicles";

function AddVehicleForm() {
  const [form, setForm] = useState({
    name: "",
    capacityKg: "",
    tyres: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVehicle(form);
      setMessage(" Vehicle added successfully!");
      setForm({
        name: "",
        capacityKg: "",
        tyres: "",
      });
    } catch (err) {
      setMessage("Failed to add vehicle.");
    }
  };

  return (
    <div className="card">
      <h2>Add New Vehicle</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Vehicle Name"
          required
        />
        <input
          name="capacityKg"
          type="number"
          value={form.capacityKg}
          onChange={handleChange}
          placeholder="Capacity (KG)"
          required
        />
        <input
          name="tyres"
          type="number"
          value={form.tyres}
          onChange={handleChange}
          placeholder="Tyres"
          required
        />
        <button type="submit">Add Vehicle</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default AddVehicleForm;
