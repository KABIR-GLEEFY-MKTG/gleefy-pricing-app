const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

/* ================= UI ================= */

app.get("/", (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>Gleefy</title>

    <style>
      body {
        background: #0B0B0B;
        color: white;
        font-family: Arial;
        padding: 40px;
      }

      h1 { font-size: 40px; }

      .bar {
        display: flex;
        gap: 10px;
        margin-bottom: 20px;
      }

      input {
        padding: 12px;
        width: 200px;
      }

      button {
        padding: 12px;
        background: #CBB38E;
        border: none;
        cursor: pointer;
      }

      .dropdown {
        position: absolute;
        background: #222;
        width: 200px;
      }

      .dropdown div {
        padding: 8px;
        cursor: pointer;
      }

      .dropdown div:hover {
        background: #444;
      }
    </style>
  </head>

  <body>

  <h1>Gleefy</h1>

  <div class="bar">
    <div>
      <input id="origin" placeholder="From">
      <div id="originList" class="dropdown"></div>
    </div>

    <div>
      <input id="destination" placeholder="To">
      <div id="destinationList" class="dropdown"></div>
    </div>

    <input id="date" type="date">

    <button onclick="search()">Search</button>
  </div>

  <div id="result"></div>

  <script>

  const cities = [
    { city:"Delhi", code:"DEL" },
    { city:"Mumbai", code:"BOM" },
    { city:"Bangalore", code:"BLR" },
    { city:"Goa", code:"GOI" },
    { city:"Paris", code:"CDG" },
    { city:"London", code:"LHR" },
    { city:"Dubai", code:"DXB" }
  ];

  origin.oninput = () => showList("origin");
  destination.oninput = () => showList("destination");

  function showList(field) {
    const value = document.getElementById(field).value.toLowerCase();
    const list = document.getElementById(field + "List");

    const matches = cities.filter(c => c.city.toLowerCase().includes(value));

    list.innerHTML = matches.map(c =>
      "<div onclick=\\"selectCity('${field}','"+c.code+"')\\">" +
      c.city + " (" + c.code + ")" +
      "</div>"
    ).join("");
  }

  function selectCity(field, code) {
    document.getElementById(field).value = code;
    document.getElementById(field + "List").innerHTML = "";
  }

  async function search() {
    const res = await fetch("/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        origin: origin.value,
        destination: destination.value,
        date: date.value
      })
    });

    const data = await res.json();

    document.getElementById("result").innerHTML = \`
      <h2>\${data.destination}</h2>
      <p>\${data.airline}</p>
      <p>₹\${data.flightPrice}</p>
      <h3>Total ₹\${data.total}</h3>
    \`;
  }

  </script>

  </body>
  </html>
  `);
});

/* ================= API ================= */

app.post("/generate", async (req, res) => {
  const { origin, destination } = req.body;

  try {
    const response = await fetch(
      "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v2/prices/nearest-places-matrix?origin=" + origin + "&currency=INR",
      {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": "6d0c39ea4amsh047b50fd54b1b08p1a1ea3jsn84a4bd667001",
          "X-RapidAPI-Host": "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com"
        }
      }
    );

    const data = await response.json();

    const first = Object.values(data.data)[0];

    res.json({
      destination,
      airline: "Live API",
      flightPrice: first?.price || 45000,
      total: (first?.price || 45000) + 120000
    });

  } catch {
    res.json({
      destination,
      airline: "Fallback",
      flightPrice: 50000,
      total: 170000
    });
  }
});

app.listen(3001, () => console.log("http://localhost:3001"));