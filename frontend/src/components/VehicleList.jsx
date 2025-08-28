import React from "react";

function VehicleList({ vehicles, onBook }) {
  if (!vehicles.length) return <p>No vehicles found 🚗</p>;

  return (
    <div className="vehicle-list">
      {vehicles.map((v) => (
        <div key={v._id} className="card">
          <h3>{v.name}</h3>
          <p>Capacity: {v.capacityKg}</p>
          <p>Tyres: {v.tyres}</p>
          <p>Estimated Duration: {v.estimatedRideDurationHours} hrs</p>
          <button onClick={() => onBook(v)}>Book Now</button>
        </div>
      ))}
    </div>
  );
}

export default VehicleList;
