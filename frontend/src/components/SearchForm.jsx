import React, { useState } from "react";

function SearchForm({ onSearch }) {
  const [capacityRequired, setCapacityRequired] = useState("");
  const [fromPincode, setFromPincode] = useState("");
  const [toPincode, setToPincode] = useState("");
  const [startTime, setStartTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ capacityRequired, fromPincode, toPincode, startTime });
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="number"
        value={capacityRequired}
        onChange={(e) => setCapacityRequired(e.target.value)}
        placeholder="Capacity Required (KG)"
        required
      />
      <input
        type="text"
        value={fromPincode}
        onChange={(e) => setFromPincode(e.target.value)}
        placeholder="From Pincode"
        required
      />
      <input
        type="text"
        value={toPincode}
        onChange={(e) => setToPincode(e.target.value)}
        placeholder="To Pincode"
        required
      />
      <input
        type="datetime-local"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
        required
      />
      <button type="submit">Search Vehicles</button>
    </form>
  );
}

export default SearchForm;
