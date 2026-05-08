const express = require("express");
const path = require("path");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/search", async (req, res) => {
  const { origin, destination, date, pax } = req.body;

  try {
    const url = "https://serpapi.com/search.json?engine=google_flights" +
      "&departure_id=" + origin +
      "&arrival_id=" + destination +
      "&outbound_date=" + date +
      "&adults=" + pax +
      "&currency=INR" +
      "&hl=en" +
      "&gl=in" +
      "&api_key=" + process.env.SERPAPI_KEY;

    console.log("Calling SerpAPI for:", origin, "->", destination, date);

    const response = await fetch(url);
    const data = await response.json();

    console.log("SerpAPI status:", data.search_metadata?.status);
    console.log("Best flights:", data.best_flights?.length || 0);
    console.log("Other flights:", data.other_flights?.length || 0);

    const rawFlights = data.best_flights || data.other_flights || [];

    if (!rawFlights.length) {
      return res.status(500).json({ error: "No flights found for this route" });
    }

    const flights = rawFlights.slice(0, 4).map((item, i) => {
      const leg = item.flights?.[0];
      const price = item.price || 0;
      const taxes = Math.round(price * 0.2);

      return {
        airline: leg?.airline || "Unknown",
        flightNo: leg?.flight_number || "N/A",
        departure: leg?.departure_airport?.time?.split(" ")[1] || "00:00",
        arrival: leg?.arrival_airport?.time?.split(" ")[1] || "00:00",
        duration: formatDuration(item.total_duration || 0),
        stops: item.flights?.length === 1 ? "Non-stop" : item.flights?.length - 1 + " stop",
        price: price,
        taxes: taxes,
        aircraft: leg?.airplane || "Standard Aircraft",
        cabinClass: "Economy",
        baggage: "15kg check-in + 7kg cabin",
        meal: i === 0 ? "Complimentary" : "Buy on board",
        seatPitch: "29 inches",
        wifi: i < 2 ? "Available" : "Not available",
        refundable: false
      };
    });

    res.json({ flights });

  } catch (err) {
    console.error("SerpAPI error:", err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h + "h " + m + "m";
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Gleefy running on port " + PORT));
