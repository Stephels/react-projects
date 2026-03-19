import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const NationalityApp = () => {
  const [name, setName] = useState(""); // To store the input name
  const [countryInfo, setCountryInfo] = useState(null); // To store the fetched data
  const inputRef = useRef(null); // To set focus on the input field

  // Automatically focus on the input field when the component loads
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  // Function to fetch data from the API
  const fetchNationality = async () => {
    if (name.trim() === "") {
      alert("Please enter a valid name.");
      return;
    }

    try {
      const response = await fetch(`https://api.nationalize.io?name=${name}`);
      const data = await response.json();

      if (data.country && data.country.length > 0) {
        // Save the first country object from the response
        setCountryInfo(data.country[0]);
      } else {
        setCountryInfo(null);
        alert("No data found for this name.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch nationality data. Please try again later.");
    }
  };

  return (
    <>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Nationality App</h1>
        <p className="text-center">Enter a name to predict the nationality:</p>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter a name"
            ref={inputRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button className="btn btn-primary" onClick={fetchNationality}>
            Predict Nationality
          </button>
        </div>

        {/* Show the fetched country info */}
        {countryInfo && (
          <div className="mt-4">
            <p className="fs-5">
              <strong>Country:</strong> {countryInfo.country_id}
            </p>
            <p className="fs-5">
              <strong>Probability:</strong>{" "}
              {(countryInfo.probability * 100).toFixed(2)}%
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default NationalityApp;
