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
  const { origin, destination, date, pax, mode, oCity, dCity } = req.body;

  const prompt = `You are a flight pricing engine for Gleefy, a premium Indian travel platform.

Generate exactly 4 realistic flight options for this search:
- Route: ${origin} (${oCity}) to ${destination} (${dCity})
- Travel date: ${date}
- Passengers: ${pax}
- Flight type: ${mode}

Return ONLY a valid JSON array with exactly 4 objects sorted by price ascending. No markdown, no explanation, no code fences.

Each object must have these exact keys:
{
  "airline": "realistic airline name for this route",
  "flightNo": "airline code + number e.g. AI 203",
  "departure": "HH:MM 24h format",
  "arrival": "HH:MM 24h format",
  "duration": "Xh Ym format",
  "stops": "Non-stop OR 1 stop via [city]",
  "price": integer base fare in INR per person,
  "taxes": integer taxes around 20 percent of price,
  "aircraft": "manufacturer and model",
  "cabinClass": "Economy",
  "baggage": "Xkg check-in + Xkg cabin",
  "meal": "Complimentary OR Buy on board",
  "seatPitch": "XX inches",
  "wifi": "Available OR Not available",
  "refundable": true or false
}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    const text = (data.content || []).map(b => b.text || "").join("");
    const clean = text.replace(/```json|```/g, "").trim();
    const flights = JSON.parse(clean);
    res.json({ flights });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Gleefy running on port " + PORT));
