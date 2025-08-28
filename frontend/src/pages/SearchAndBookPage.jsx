import React, { useState } from "react";
import SearchForm from "../components/SearchForm";
import VehicleList from "../components/VehicleList";
import BookingConfirmation from "../components/BookingConfirmation";
import { searchVehicles } from "../api/vehicles";
import { bookVehicle } from "../api/bookings";

function SearchAndBookPage() {
    const [vehicles, setVehicles] = useState([]);
    const [booking, setBooking] = useState(null);
    const [searchParams, setSearchParams] = useState(null);

    const handleSearch = async (data) => {
        const results = await searchVehicles(data);
        setVehicles(results);
        setSearchParams(data);
        setBooking(null);
    };

    const handleBook = async (vehicle) => {
        try {
            const res = await bookVehicle({
                vehicleId: vehicle._id,
                fromPincode: searchParams.fromPincode,
                toPincode: searchParams.toPincode,
                startTime: searchParams.startTime,
                customerId: "user-123",
            });
            setBooking(res);
        } catch (err) {
            alert(err.response?.data?.error || "Booking failed");
        }
    };

    return (
        <div className="container">
            <SearchForm onSearch={handleSearch} />
            <VehicleList vehicles={vehicles} onBook={handleBook} />
            <BookingConfirmation
                booking={booking}
                onCancel={() => setBooking(null)}
            />

        </div>
    );
}

export default SearchAndBookPage;
