import React from "react";
import { cancelBooking } from "../api/bookings";

function BookingConfirmation({ booking, onCancel }) {
  if (!booking) return null;

  const handleCancel = async () => {
    try {
      await cancelBooking(booking._id);
      alert("Booking cancelled ");
      onCancel(); // reset parent state
    } catch (err) {
      alert(err.response?.data?.error || "Cancel failed");
    }
  };

  return (
    <div className="card success">
      <h2>Booking Confirmed **</h2>
      <p>Vehicle ID: {booking.vehicleId}</p>
      <p>From: {booking.fromPincode}</p>
      <p>To: {booking.toPincode}</p>
      <p>Start: {new Date(booking.startTime).toLocaleString()}</p>
      <p>End: {new Date(booking.endTime).toLocaleString()}</p>

      <button onClick={handleCancel} className="danger-btn">
        Cancel Booking
      </button>
    </div>
  );
}

export default BookingConfirmation;
