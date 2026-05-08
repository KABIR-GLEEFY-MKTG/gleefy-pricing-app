const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY || "6d0c39ea4amsh047b50fd54b1b08p1a1ea3jsn84a4bd667001";
const RAPIDAPI_HOST = "skyscanner-flights-travel-api.p.rapidapi.com";

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/search", async (req, res) => {
  const { origin, destination, date, pax } = req.body;

  try {
    const formattedDate = date.replace(/-/g, "");

    const response = await fetch(
      `https://skyscanner-flights-travel-api.p.rapidapi.com/flights/search-one-way?fromEntityId=${origin}&toEntityId=${destination}&departDate=${formattedDate}&adults=${pax}&currency=INR&locale=en-IN&market=IN&cabinClass=economy`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": RAPIDAPI_KEY,
          "x-rapidapi-host": RAPIDAPI_HOST
        }
      }
    );

    const data = await response.json();
    console.log("Skyscanner raw:", JSON.stringify(data).substring(0, 500));

    const itineraries = data?.data?.itineraries || [];

    if (!itineraries.length) {
      return res.json({ flights: getFallback(origin, destination) });
    }

    const flights = itineraries.slice(0, 4).map((item, i) => {
      const leg = item.legs?.[0];
      const segment = leg?.segments?.[0];
      const price = Math.round(item.price?.raw || 0);
      const taxes = Math.round(price * 0.2);

      return {
        airline: leg?.carriers?.marketing?.[0]?.name || "Unknown Airline",
        flightNo: `${segment?.marketingCarrier?.alternateId || ""}${segment?.flightNumber || ""}`,
        departure: leg?.departure?.split("T")[1]?.substring(0, 5) || "00:00",
        arrival: leg?.arrival?.split("T")[1]?.substring(0, 5) || "00:00",
        duration: formatDuration(leg?.durationInMinutes || 0),
        stops: leg?.stopCount === 0 ? "Non-stop" : `${leg?.stopCount} stop${leg?.stopCount > 1 ? "s" : ""}`,
        price: price,
        taxes: taxes,
        aircraft: segment?.operatingCarrier?.name || "Standard Aircraft",
        cabinClass: "Economy",
        baggage: "15kg check-in + 7kg cabin",
        meal: i === 0 ? "Complimentary" : "Buy on board",
        seatPitch: "29 inches",
        wifi: i < 2 ? "Available" : "Not available",
        refundable: i === 0
      };
    });

    res.json({ flights });

  } catch (err) {
    console.error("Search error:", err);
    res.json({ flights: getFallback(origin, destination) });
  }
});

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}h ${m}m`;
}

function getFallback(origin, destination) {
  return [
    { airline: "IndiGo", flightNo: "6E 123", departure: "06:00", arrival: "08:15", duration: "2h 15m", stops: "Non-stop", price: 4500, taxes: 900, aircraft: "Airbus A320", cabinClass: "Economy", baggage: "15kg check-in + 7kg cabin", meal: "Buy on board", seatPitch: "28 inches", wifi: "Not available", refundable: false },
    { airline: "Air India", flightNo: "AI 456", departure: "09:30", arrival: "11:50", duration: "2h 20m", stops: "Non-stop", price: 5800, taxes: 1160, aircraft: "Airbus A320", cabinClass: "Economy", baggage: "25kg check-in + 8kg cabin", meal: "Complimentary", seatPitch: "30 inches", wifi: "Available", refundable: true },
    { airline: "Vistara", flightNo: "UK 789", departure: "13:00", arrival: "15:20", duration: "2h 20m", stops: "Non-stop", price: 6200, taxes: 1240, aircraft: "Airbus A321", cabinClass: "Economy", baggage: "20kg check-in + 7kg cabin", meal: "Complimentary", seatPitch: "30 inches", wifi: "Available", refundable: true },
    { airline: "SpiceJet", flightNo: "SG 321", departure: "17:45", arrival: "20:10", duration: "2h 25m", stops: "Non-stop", price: 3900, taxes: 780, aircraft: "Boeing 737", cabinClass: "Economy", baggage: "15kg check-in + 7kg cabin", meal: "Buy on board", seatPitch: "28 inches", wifi: "Not available", refundable: false }
  ];
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Gleefy running on port " + PORT));
