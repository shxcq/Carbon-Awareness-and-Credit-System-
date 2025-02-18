import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase"; // Ensure correct import path for Firebase
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore"; // Firebase Firestore methods
import UserHeader from "components/Headers/UserHeader.js"; // Correct import for the header component

const CarbonFootprintInput = () => {
  const [carbonFootprint, setCarbonFootprint] = useState({
    carUsageKm: "",
    vehicleType: "",
    fuelType: "",
    publicTransportTrips: "",
    publicTransportMode: "",
    flightsPerYear: "",
    electricityUsage: "",
    heatingMethod: "",
    homeSize: "",
    energyEfficientAppliances: false,
    dietType: "",
    meatFrequency: "",
    recyclingHabit: false,
    wasteGeneration: "",
    renewableEnergyUse: false,
    ecoFriendlyProducts: false,
    sustainableShopping: false,
    carbonOffsetProgram: false,
    carbonOffsetDetails: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", `${user.uid}-userinfo`, "carbonFootprint", "carbonFootprintDoc"); // Document reference within the 'carbonFootprint' collection
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setCarbonFootprint(docSnap.data());
        } else {
          // If document doesn't exist, initialize with default values
          setCarbonFootprint({
            carUsageKm: "",
            vehicleType: "",
            fuelType: "",
            publicTransportTrips: "",
            publicTransportMode: "",
            flightsPerYear: "",
            electricityUsage: "",
            heatingMethod: "",
            homeSize: "",
            energyEfficientAppliances: false,
            dietType: "",
            meatFrequency: "",
            recyclingHabit: false,
            wasteGeneration: "",
            renewableEnergyUse: false,
            ecoFriendlyProducts: false,
            sustainableShopping: false,
            carbonOffsetProgram: false,
            carbonOffsetDetails: "",
          });
        }
      }
    };

    fetchUserData();
  }, []);

  const handleCarbonFootprintChange = (e) => {
    const { id, value, type, checked } = e.target;
    setCarbonFootprint({
      ...carbonFootprint,
      [id]: type === "checkbox" ? checked : value,
    });
  };

  const handleCarbonFootprintSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (user) {
      const userFootprintRef = doc(
        db,
        "users",
        `${user.uid}-userinfo`, // Updated reference
        "carbonFootprint", // Collection reference
        "carbonFootprintDoc" // Document reference
      );

      try {
        // Check if the document exists
        const docSnap = await getDoc(userFootprintRef);
        if (docSnap.exists()) {
          // If document exists, update the document
          await updateDoc(userFootprintRef, carbonFootprint);
          alert("Carbon footprint data updated successfully!");
        } else {
          // If document doesn't exist, create a new document with the provided data
          await setDoc(userFootprintRef, carbonFootprint);
          alert("Carbon footprint data created successfully!");
        }
      } catch (error) {
        console.error("Error submitting carbon footprint: ", error);
        alert("Failed to submit carbon footprint.");
      }
    }
  };

  return (
    <>
      <UserHeader /> {/* Add the UserHeader component here */}

      {/* Carbon Footprint Input Form */}
      <div className="container mt-5">
        <h2>Carbon Footprint Information</h2>
        <form onSubmit={handleCarbonFootprintSubmit}>
          {/* Transportation Section */}
          <h4>Transportation</h4>
          <div className="form-group">
            <label htmlFor="carUsageKm">Number of kilometers driven daily (or miles)</label>
            <input
              id="carUsageKm"
              type="number"
              className="form-control"
              value={carbonFootprint.carUsageKm}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="vehicleType">Type of vehicle (gasoline, electric, hybrid, etc.)</label>
            <input
              id="vehicleType"
              type="text"
              className="form-control"
              value={carbonFootprint.vehicleType}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="fuelType">Fuel type</label>
            <input
              id="fuelType"
              type="text"
              className="form-control"
              value={carbonFootprint.fuelType}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="publicTransportTrips">Number of trips taken weekly</label>
            <input
              id="publicTransportTrips"
              type="number"
              className="form-control"
              value={carbonFootprint.publicTransportTrips}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="publicTransportMode">Mode of transport (bus, train, tram, etc.)</label>
            <input
              id="publicTransportMode"
              type="text"
              className="form-control"
              value={carbonFootprint.publicTransportMode}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="flightsPerYear">Number of flights taken per year (short/long-haul)</label>
            <input
              id="flightsPerYear"
              type="number"
              className="form-control"
              value={carbonFootprint.flightsPerYear}
              onChange={handleCarbonFootprintChange}
            />
          </div>

          {/* Energy Consumption Section */}
          <h4>Energy Consumption</h4>
          <div className="form-group">
            <label htmlFor="electricityUsage">Monthly electricity consumption (kWh)</label>
            <input
              id="electricityUsage"
              type="number"
              className="form-control"
              value={carbonFootprint.electricityUsage}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="heatingMethod">Heating method (gas, electric, renewable energy)</label>
            <input
              id="heatingMethod"
              type="text"
              className="form-control"
              value={carbonFootprint.heatingMethod}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="homeSize">Square footage of home</label>
            <input
              id="homeSize"
              type="number"
              className="form-control"
              value={carbonFootprint.homeSize}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="energyEfficientAppliances">Do you use energy-efficient appliances? (yes/no)</label>
            <input
              id="energyEfficientAppliances"
              type="checkbox"
              className="form-control"
              checked={carbonFootprint.energyEfficientAppliances}
              onChange={handleCarbonFootprintChange}
            />
          </div>

          {/* Food and Diet Section */}
          <h4>Food and Diet</h4>
          <div className="form-group">
            <label htmlFor="dietType">Diet type (vegan, vegetarian, omnivore, etc.)</label>
            <input
              id="dietType"
              type="text"
              className="form-control"
              value={carbonFootprint.dietType}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="meatFrequency">Frequency of eating meat (weekly, daily, etc.)</label>
            <input
              id="meatFrequency"
              type="text"
              className="form-control"
              value={carbonFootprint.meatFrequency}
              onChange={handleCarbonFootprintChange}
            />
          </div>

          {/* Waste Section */}
          <h4>Waste</h4>
          <div className="form-group">
            <label htmlFor="recyclingHabit">Do you recycle? (yes/no)</label>
            <input
              id="recyclingHabit"
              type="checkbox"
              className="form-control"
              checked={carbonFootprint.recyclingHabit}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="wasteGeneration">How much waste do you generate weekly? (bags of waste)</label>
            <input
              id="wasteGeneration"
              type="number"
              className="form-control"
              value={carbonFootprint.wasteGeneration}
              onChange={handleCarbonFootprintChange}
            />
          </div>

          {/* Sustainable Practices Section */}
          <h4>Sustainable Practices</h4>
          <div className="form-group">
            <label htmlFor="renewableEnergyUse">Do you use renewable energy at home? (yes/no)</label>
            <input
              id="renewableEnergyUse"
              type="checkbox"
              className="form-control"
              checked={carbonFootprint.renewableEnergyUse}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="ecoFriendlyProducts">Do you use eco-friendly products? (yes/no)</label>
            <input
              id="ecoFriendlyProducts"
              type="checkbox"
              className="form-control"
              checked={carbonFootprint.ecoFriendlyProducts}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="sustainableShopping">Do you buy second-hand or sustainable goods? (yes/no)</label>
            <input
              id="sustainableShopping"
              type="checkbox"
              className="form-control"
              checked={carbonFootprint.sustainableShopping}
              onChange={handleCarbonFootprintChange}
            />
          </div>

          {/* Carbon Offset Contributions Section */}
          <h4>Carbon Offset Contributions</h4>
          <div className="form-group">
            <label htmlFor="carbonOffsetProgram">Are you participating in any carbon offset programs? (yes/no)</label>
            <input
              id="carbonOffsetProgram"
              type="checkbox"
              className="form-control"
              checked={carbonFootprint.carbonOffsetProgram}
              onChange={handleCarbonFootprintChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="carbonOffsetDetails">If yes, specify (e.g., planting trees, supporting renewable energy, etc.)</label>
            <input
              id="carbonOffsetDetails"
              type="text"
              className="form-control"
              value={carbonFootprint.carbonOffsetDetails}
              onChange={handleCarbonFootprintChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit Carbon Footprint
          </button>
        </form>
      </div>
    </>
  );
};

export default CarbonFootprintInput;
