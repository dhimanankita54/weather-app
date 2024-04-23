import React, { useEffect, useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { toast } from "react-toastify";
import "./search.css";
import debounce from "lodash.debounce";

function Inputs({ query, setQuery, units, setUnits, debounceChange }) {
  const [city, setCity] = useState(query || "");

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;
    if (units !== selectedUnit) setUnits(selectedUnit);
  };

  const handleSearchClick = () => {
    if (city !== "") setQuery({ q: city });
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info("Fetching users location.");
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon,
        });
      });
    }
  };

  const handleChange = (e) => {
    setCity(e.currentTarget.value);
    debounceChange(e.currentTarget.value);
    console.log(city);
  };

  useEffect(() => {
    setCity(query)
  },[query])

  return (
    <div>
      <div>
        <UilLocationPoint
          size={25}
          className="location-icon"
          onClick={handleLocationClick}
        />
        <input
          value={city}
          onChange={handleChange}
          type="text"
          placeholder="Search for city...."
          className="input"
        />
        <UilSearch
          size={25}
          className="search-icon"
          onClick={handleSearchClick}
        />
      </div>
    </div>
  );
}

export default Inputs;
