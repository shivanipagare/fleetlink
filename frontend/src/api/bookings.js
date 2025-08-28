import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const bookVehicle = async (bookingData) => {
  const res = await axios.post(`${BASE_URL}/bookings`, bookingData);
  return res.data;
};

export const cancelBooking = async (bookingId) => {
  const res = await axios.delete(`${BASE_URL}/bookings/${bookingId}`);
  return res.data;
};
