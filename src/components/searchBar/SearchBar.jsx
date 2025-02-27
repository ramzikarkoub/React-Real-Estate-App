import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
  const location = useLocation();
  const isRentPage = location.pathname.includes("/rent");
  const isBuyPage = location.pathname.includes("/buy");

  const [filters, setFilters] = useState({
    location: "",
    type: isRentPage ? "rent" : isBuyPage ? "buy" : "any",
    property: "any",
    minPrice: "",
    maxPrice: "",
    bedroom: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFilters((prev) => ({ ...prev, [id]: value }));
  };

  useEffect(() => {
    onSearch(filters);
  }, [filters]);

  return (
    <form className="search-bar">
      <div className="search-field">
        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          placeholder="Enter location"
          value={filters.location}
          onChange={handleChange}
        />
      </div>

      {!isRentPage && !isBuyPage && (
        <div className="search-field">
          <label htmlFor="type">Type</label>
          <select id="type" value={filters.type} onChange={handleChange}>
            <option value="any">Any</option>
            <option value="rent">Rent</option>
            <option value="buy">Buy</option>
          </select>
        </div>
      )}

      <div className="search-field">
        <label htmlFor="property">Property</label>
        <select id="property" value={filters.property} onChange={handleChange}>
          <option value="any">Any</option>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="condo">Condo</option>
          <option value="land">Land</option>
        </select>
      </div>

      <div className="search-field">
        <label htmlFor="minPrice">Min Price</label>
        <input
          type="number"
          id="minPrice"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={handleChange}
        />
      </div>

      <div className="search-field">
        <label htmlFor="maxPrice">Max Price</label>
        <input
          type="number"
          id="maxPrice"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={handleChange}
        />
      </div>

      <div className="search-field">
        <label htmlFor="bedroom">Bedroom</label>
        <input
          type="number"
          id="bedroom"
          placeholder="Bedrooms"
          value={filters.bedroom}
          onChange={handleChange}
        />
      </div>

      {/* <button type="submit" className="search-button">
        Search
      </button> */}
    </form>
  );
}
