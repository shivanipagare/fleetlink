import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const addVehicle = async (vehicleData) => {
  const res = await axios.post(`${BASE_URL}/vehicles`, vehicleData);
  return res.data;
};

export const searchVehicles = async (params) => {
  const res = await axios.get(`${BASE_URL}/vehicles/available`, { params });
  return res.data;
};
