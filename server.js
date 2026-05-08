const express = require("express");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gleefy</title>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Bodoni+Moda:ital,wght@0,600;1,600&display=swap" rel="stylesheet">
<style>
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0B0B0B; color: #E7E1D7; font-family: 'Montserrat', sans-serif; min-height: 100vh; padding-bottom: 60px; }
h1 { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 40px; font-weight: 600; letter-spacing: 0.02em; text-align: center; padding: 36px 0 4px; }
.tagline { text-align: center; font-size: 11px; color: #6B6560; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 30px; }
.wrap { max-width: 700px; margin: 0 auto; padding: 0 18px; }
.toggle-row { display: flex; justify-content: center; margin-bottom: 16px; gap: 0; }
.toggle-btn { background: transparent; color: #CBB38E; border: 1px solid #CBB38E; padding: 8px 22px; font-size: 11px; font-weight: 700; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'Montserrat', sans-serif; transition: all 0.18s; }
.toggle-btn:first-child { border-radius: 6px 0 0 6px; }
.toggle-btn:last-child { border-radius: 0 6px 6px 0; }
.toggle-btn.active { background: #CBB38E; color: #000; }
.options-row { display: flex; justify-content: center; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
.option-btn { background: transparent; color: #6B6560; border: 1px solid #2A2A2A; padding: 6px 16px; font-size: 11px; font-weight: 600; cursor: pointer; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'Montserrat', sans-serif; border-radius: 20px; transition: all 0.18s; }
.option-btn.active { border-color: #CBB38E; color: #CBB38E; }
.search-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; margin-bottom: 12px; display: flex; align-items: stretch; position: relative; overflow: visible; }
.field-wrap { flex: 1; position: relative; }
.field-inner { display: flex; flex-direction: column; padding: 12px 16px; border-right: 0.5px solid #2A2A2A; height: 100%; }
.field-label { font-size: 10px; color: #6B6560; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px; }
.city-input { background: transparent; border: none; outline: none; color: #E7E1D7; font-size: 15px; font-family: 'Montserrat', sans-serif; width: 100%; caret-color: #CBB38E; }
.city-input::placeholder { color: #444; }
.dropdown { position: absolute; top: 100%; left: 0; right: 0; background: #1C1C1C; border: 0.5px solid #333; border-top: none; z-index: 200; border-radius: 0 0 8px 8px; overflow: hidden; }
.dd-item { padding: 11px 16px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 0.5px solid #222; transition: background 0.12s; }
.dd-item:hover { background: #252525; }
.dd-city { color: #E7E1D7; font-size: 14px; }
.dd-country { color: #6B6560; font-size: 12px; margin-left: 6px; }
.dd-code { color: #CBB38E; font-size: 13px; font-weight: 600; }
.swap-btn { background: transparent; border: none; border-right: 0.5px solid #2A2A2A; color: #CBB38E; font-size: 20px; cursor: pointer; padding: 0 14px; flex-shrink: 0; }
.date-wrap { border-left: 0.5px solid #2A2A2A; padding: 12px 16px; flex-shrink: 0; display: flex; flex-direction: column; min-width: 130px; }
input[type="date"] { background: transparent; border: none; outline: none; color: #E7E1D7; font-size: 14px; font-family: 'Montserrat', sans-serif; color-scheme: dark; cursor: pointer; margin-top: 4px; }
.bottom-row { display: flex; gap: 10px; margin-bottom: 28px; flex-wrap: wrap; }
.pax-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; display: flex; align-items: center; padding: 0 14px; gap: 10px; flex-shrink: 0; }
.pax-btn { background: none; border: none; color: #CBB38E; font-size: 22px; cursor: pointer; line-height: 1; padding: 4px; font-family: 'Montserrat', sans-serif; }
.pax-num { color: #E7E1D7; font-size: 16px; font-weight: 500; min-width: 18px; text-align: center; }
.search-btn { flex: 1; background: #CBB38E; color: #000; border: none; border-radius: 10px; padding: 16px 0; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'Montserrat', sans-serif; }
.search-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.err-box { background: #2A1010; border: 0.5px solid #5A2020; border-radius: 8px; padding: 12px 16px; color: #E07070; font-size: 13px; margin-bottom: 18px; }
.results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.route-label { font-size: 15px; font-weight: 500; }
.flight-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; margin-bottom: 12px; overflow: hidden; }
.flight-card.best { border-color: #CBB38E; }
.flight-main { padding: 18px 20px; cursor: pointer; display: flex; align-items: center; gap: 14px; }
.flight-main:hover { background: #151515; }
.best-badge { background: #CBB38E; color: #000; font-size: 9px; font-weight: 800; padding: 3px 7px; border-radius: 3px; letter-spacing: 0.1em; white-space: nowrap; flex-shrink: 0; }
.flight-info { flex: 1; min-width: 0; }
.airline-row { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; }
.airline-name { font-size: 14px; font-weight: 500; }
.flight-no { font-size: 12px; color: #6B6560; }
.time-row { display: flex; align-items: center; gap: 10px; }
.time { font-size: 18px; font-weight: 600; }
.connector { flex: 1; display: flex; align-items: center; gap: 6px; }
.line { height: 0.5px; flex: 1; background: #333; }
.dur { font-size: 11px; color: #6B6560; white-space: nowrap; }
.stops-row { margin-top: 5px; display: flex; gap: 8px; align-items: center; }
.stops-txt { font-size: 12px; color: #6B6560; }
.ref-badge { font-size: 10px; color: #5AA97B; background: #1A2E22; padding: 2px 7px; border-radius: 4px; }
.price-col { text-align: right; flex-shrink: 0; }
.price-num { color: #CBB38E; font-size: 22px; font-weight: 700; }
.price-sub { color: #6B6560; font-size: 11px; margin-top: 2px; }
.chevron { color: #6B6560; font-size: 16px; flex-shrink: 0; transition: transform 0.2s; }
.flight-detail { border-top: 0.5px solid #2A2A2A; padding: 16px 20px; background: #0E0E0E; }
.detail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin-bottom: 14px; }
.detail-lbl { font-size: 10px; color: #6B6560; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 3px; }
.detail-val { font-size: 13px; color: #E7E1D7; }
.detail-footer { border-top: 0.5px solid #2A2A2A; padding-top: 14px; display: flex; justify-content: space-between; align-items: center; }
.total-amt { font-size: 15px; font-weight: 600; color: #E7E1D7; }
.book-btn { background: #CBB38E; color: #000; border: none; padding: 9px 22px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Montserrat', sans-serif; }
.skel { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 22px 20px; margin-bottom: 12px; }
.skel-line { background: #222; border-radius: 4px; animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
.disclaimer { text-align: center; margin-top: 24px; font-size: 11px; color: #3A3530; }
.return-card { display: none; }
.return-card.show { display: flex; }
</style>
</head>
<body>
<h1>Gleefy</h1>
<p class="tagline">Luxury Travel Rates</p>
<div class="wrap">

  <div class="toggle-row">
    <button class="toggle-btn active" id="domBtn" onclick="setMode('domestic')">Domestic</button>
    <button class="toggle-btn" id="intlBtn" onclick="setMode('international')">International</button>
  </div>

  <div class="options-row">
    <button class="option-btn active" id="oneWayBtn" onclick="setTrip('oneway')">One Way</button>
    <button class="option-btn" id="roundBtn" onclick="setTrip('round')">Round Trip</button>
    <button class="option-btn active" id="econBtn" onclick="setCabin('economy')">Economy</button>
    <button class="option-btn" id="premEconBtn" onclick="setCabin('premium_economy')">Premium Economy</button>
    <button class="option-btn" id="bizBtn" onclick="setCabin('business')">Business</button>
    <button class="option-btn" id="firstBtn" onclick="setCabin('first')">First Class</button>
  </div>

  <div class="search-card">
    <div class="field-wrap">
      <div class="field-inner">
        <div class="field-label">From</div>
        <input class="city-input" id="originInput" placeholder="City or airport" oninput="filterCities('origin')" onfocus="filterCities('origin')" onblur="setTimeout(()=>hideDD('origin'),200)">
      </div>
      <div class="dropdown" id="originDD" style="display:none"></div>
    </div>
    <button class="swap-btn" onclick="swapCities()">⇄</button>
    <div class="field-wrap">
      <div class="field-inner">
        <div class="field-label">To</div>
        <input class="city-input" id="destInput" placeholder="City or airport" oninput="filterCities('dest')" onfocus="filterCities('dest')" onblur="setTimeout(()=>hideDD('dest'),200)">
      </div>
      <div class="dropdown" id="destDD" style="display:none"></div>
    </div>
    <div class="date-wrap">
      <div class="field-label">Depart</div>
      <input type="date" id="dateInput">
    </div>
  </div>

  <div class="search-card return-card" id="returnCard">
    <div class="field-inner" style="flex:1">
      <div class="field-label">Return Date</div>
      <input type="date" id="returnDateInput" style="background:transparent;border:none;outline:none;color:#E7E1D7;font-size:15px;font-family:Montserrat,sans-serif;color-scheme:dark;cursor:pointer;margin-top:4px;">
    </div>
  </div>

  <div class="bottom-row">
    <div class="pax-card">
      <span class="field-label" style="white-space:nowrap">Passengers</span>
      <button class="pax-btn" onclick="changePax(-1)">-</button>
      <span class="pax-num" id="paxNum">1</span>
      <button class="pax-btn" onclick="changePax(1)">+</button>
    </div>
    <button class="search-btn" id="searchBtn" onclick="doSearch()">Search Flights</button>
  </div>

  <div id="errBox" class="err-box" style="display:none"></div>
  <div id="loading" style="display:none">
    <div class="skel"><div class="skel-line" style="height:14px;width:130px;margin-bottom:10px"></div><div class="skel-line" style="height:24px;width:220px"></div></div>
    <div class="skel"><div class="skel-line" style="height:14px;width:110px;margin-bottom:10px"></div><div class="skel-line" style="height:24px;width:200px"></div></div>
    <div class="skel"><div class="skel-line" style="height:14px;width:150px;margin-bottom:10px"></div><div class="skel-line" style="height:24px;width:180px"></div></div>
  </div>
  <div id="results"></div>
</div>

<script>
const cities = [
  {city:"Delhi",code:"DEL",country:"India",type:"both"},
  {city:"Mumbai",code:"BOM",country:"India",type:"both"},
  {city:"Bangalore",code:"BLR",country:"India",type:"both"},
  {city:"Goa",code:"GOI",country:"India",type:"both"},
  {city:"Chennai",code:"MAA",country:"India",type:"both"},
  {city:"Hyderabad",code:"HYD",country:"India",type:"both"},
  {city:"Kolkata",code:"CCU",country:"India",type:"both"},
  {city:"Jaipur",code:"JAI",country:"India",type:"both"},
  {city:"Pune",code:"PNQ",country:"India",type:"both"},
  {city:"Ahmedabad",code:"AMD",country:"India",type:"both"},
  {city:"Paris",code:"CDG",country:"France",type:"international"},
  {city:"London",code:"LHR",country:"United Kingdom",type:"international"},
  {city:"Dubai",code:"DXB",country:"UAE",type:"international"},
  {city:"New York",code:"JFK",country:"USA",type:"international"},
  {city:"Singapore",code:"SIN",country:"Singapore",type:"international"},
  {city:"Tokyo",code:"HND",country:"Japan",type:"international"},
  {city:"Bangkok",code:"BKK",country:"Thailand",type:"international"},
  {city:"Sydney",code:"SYD",country:"Australia",type:"international"},
  {city:"Frankfurt",code:"FRA",country:"Germany",type:"international"},
  {city:"Toronto",code:"YYZ",country:"Canada",type:"international"},
];

let mode = 'domestic';
let tripType = 'oneway';
let cabinClass = 'economy';
let originCode = '', destCode = '';
let pax = 1;

const today = new Date().toISOString().split('T')[0];
document.getElementById('dateInput').min = today;
document.getElementById('dateInput').value = today;
document.getElementById('returnDateInput').min = today;

function setMode(m) {
  mode = m;
  originCode = ''; destCode = '';
  document.getElementById('originInput').value = '';
  document.getElementById('destInput').value = '';
  document.getElementById('domBtn').classList.toggle('active', m==='domestic');
  document.getElementById('intlBtn').classList.toggle('active', m==='international');
  document.getElementById('results').innerHTML = '';
}

function setTrip(t) {
  tripType = t;
  document.getElementById('oneWayBtn').classList.toggle('active', t==='oneway');
  document.getElementById('roundBtn').classList.toggle('active', t==='round');
  const rc = document.getElementById('returnCard');
  if (t === 'round') { rc.classList.add('show'); } else { rc.classList.remove('show'); }
}

function setCabin(c) {
  cabinClass = c;
  document.getElementById('econBtn').classList.toggle('active', c==='economy');
  document.getElementById('premEconBtn').classList.toggle('active', c==='premium_economy');
  document.getElementById('bizBtn').classList.toggle('active', c==='business');
  document.getElementById('firstBtn').classList.toggle('active', c==='first');
}

function filterCities(field) {
  const inputEl = document.getElementById(field==='origin' ? 'originInput' : 'destInput');
  const ddEl = document.getElementById(field==='origin' ? 'originDD' : 'destDD');
  const val = inputEl.value.toLowerCase();
  const matches = cities.filter(c =>
    (c.type === mode || c.type === 'both') &&
    (c.city.toLowerCase().includes(val) || c.code.toLowerCase().includes(val))
  ).slice(0, 6);
  if (!matches.length) { ddEl.style.display='none'; return; }
  ddEl.innerHTML = matches.map(c =>
    '<div class="dd-item" onmousedown="selectCity(' + "'"+field+"'" + ',' + "'"+c.code+"'" + ',' + "'"+c.city+"'" + ')">' +
    '<span><span class="dd-city">' + c.city + '</span><span class="dd-country">' + c.country + '</span></span>' +
    '<span class="dd-code">' + c.code + '</span></div>'
  ).join('');
  ddEl.style.display = 'block';
}

function selectCity(field, code, city) {
  if (field === 'origin') {
    originCode = code;
    document.getElementById('originInput').value = city + ' (' + code + ')';
    hideDD('origin');
  } else {
    destCode = code;
    document.getElementById('destInput').value = city + ' (' + code + ')';
    hideDD('dest');
  }
}

function hideDD(field) {
  document.getElementById(field==='origin' ? 'originDD' : 'destDD').style.display = 'none';
}

function swapCities() {
  const oVal = document.getElementById('originInput').value;
  const dVal = document.getElementById('destInput').value;
  document.getElementById('originInput').value = dVal;
  document.getElementById('destInput').value = oVal;
  const tmp = originCode; originCode = destCode; destCode = tmp;
}

function changePax(d) {
  pax = Math.max(1, Math.min(9, pax + d));
  document.getElementById('paxNum').textContent = pax;
}

function showErr(msg) {
  const b = document.getElementById('errBox');
  b.textContent = msg; b.style.display = 'block';
}

function hideErr() { document.getElementById('errBox').style.display = 'none'; }

async function doSearch() {
  hideErr();
  if (!originCode) { showErr('Please select a departure city.'); return; }
  if (!destCode) { showErr('Please select a destination city.'); return; }
  if (originCode === destCode) { showErr('Origin and destination cannot be the same.'); return; }
  const date = document.getElementById('dateInput').value;
  if (!date) { showErr('Please select a travel date.'); return; }
  const returnDate = document.getElementById('returnDateInput').value;
  if (tripType === 'round' && !returnDate) { showErr('Please select a return date.'); return; }

  const btn = document.getElementById('searchBtn');
  btn.disabled = true; btn.textContent = 'Searching...';
  document.getElementById('loading').style.display = 'block';
  document.getElementById('results').innerHTML = '';

  const oCity = cities.find(c => c.code === originCode);
  const dCity = cities.find(c => c.code === destCode);

  try {
    const resp = await fetch('/search', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        origin: originCode,
        destination: destCode,
        date: date,
        returnDate: returnDate,
        pax: pax,
        tripType: tripType,
        cabinClass: cabinClass
      })
    });

    const data = await resp.json();
    if (!data.flights || !data.flights.length) {
      showErr('No flights found. Please try a different route or date.');
      return;
    }
    renderResults(data.flights, oCity, dCity, date, returnDate);
  } catch(e) {
    showErr('Could not fetch flights. Please try again.');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Search Flights';
    document.getElementById('loading').style.display = 'none';
  }
}

function renderResults(flights, oCity, dCity, date, returnDate) {
  const dateStr = new Date(date + 'T00:00:00').toLocaleDateString('en-IN', {day:'numeric', month:'short', year:'numeric'});
  const cabinLabel = cabinClass === 'economy' ? 'Economy' : cabinClass === 'premium_economy' ? 'Premium Economy' : cabinClass === 'business' ? 'Business' : 'First Class';
  const tripLabel = tripType === 'round' ? 'Round Trip' : 'One Way';
  let html = '<div class="results-header"><div><span class="route-label">' + oCity.city + ' to ' + dCity.city + '</span><span style="font-size:13px;color:#6B6560;margin-left:10px">' + dateStr + ' · ' + pax + ' pax · ' + cabinLabel + ' · ' + tripLabel + '</span></div><span style="font-size:13px;color:#6B6560">' + flights.length + ' options</span></div>';

  flights.forEach(function(f, i) {
    const total = (f.price + f.taxes) * pax;
    html += '<div class="flight-card' + (i===0?' best':'') + '" id="fc'+i+'">' +
      '<div class="flight-main" onclick="toggleCard('+i+')">' +
      (i===0?'<div class="best-badge">BEST</div>':'') +
      '<div class="flight-info">' +
      '<div class="airline-row"><span class="airline-name">' + f.airline + '</span><span class="flight-no">' + f.flightNo + '</span></div>' +
      '<div class="time-row"><span class="time">' + f.departure + '</span><div class="connector"><div class="line"></div><span class="dur">' + f.duration + '</span><div class="line"></div></div><span class="time">' + f.arrival + '</span></div>' +
      '<div class="stops-row"><span class="stops-txt">' + f.stops + '</span>' + (f.refundable?'<span class="ref-badge">Refundable</span>':'') + '</div>' +
      '</div>' +
      '<div class="price-col"><div class="price-num">Rs.' + f.price.toLocaleString('en-IN') + '</div><div class="price-sub">per person</div></div>' +
      '<div class="chevron" id="chev'+i+'">▾</div>' +
      '</div>' +
      '<div class="flight-detail" id="fd'+i+'" style="display:none">' +
      '<div class="detail-grid">' +
      '<div><div class="detail-lbl">Aircraft</div><div class="detail-val">' + f.aircraft + '</div></div>' +
      '<div><div class="detail-lbl">Class</div><div class="detail-val">' + f.cabinClass + '</div></div>' +
      '<div><div class="detail-lbl">Baggage</div><div class="detail-val">' + f.baggage + '</div></div>' +
      '<div><div class="detail-lbl">Meal</div><div class="detail-val">' + f.meal + '</div></div>' +
      '<div><div class="detail-lbl">Seat Pitch</div><div class="detail-val">' + f.seatPitch + '</div></div>' +
      '<div><div class="detail-lbl">Wi-Fi</div><div class="detail-val">' + f.wifi + '</div></div>' +
      '</div>' +
      '<div class="detail-footer"><div><span style="font-size:13px;color:#6B6560">Total: </span><span class="total-amt">Rs.' + total.toLocaleString('en-IN') + '</span></div>' +
      '<button class="book-btn">Book Now</button></div>' +
      '</div></div>';
  });

  html += '<p class="disclaimer">Prices are indicative estimates for reference only.</p>';
  document.getElementById('results').innerHTML = html;
}

function toggleCard(i) {
  const fd = document.getElementById('fd' + i);
  const ch = document.getElementById('chev' + i);
  const open = fd.style.display === 'block';
  fd.style.display = open ? 'none' : 'block';
  ch.style.transform = open ? 'none' : 'rotate(180deg)';
}
</script>
</body>
</html>`);
});

app.post("/search", async (req, res) => {
  const { origin, destination, date, returnDate, pax, tripType, cabinClass } = req.body;

  const cabinMap = {
    economy: 1,
    premium_economy: 2,
    business: 3,
    first: 4
  };

  const tripMap = {
    oneway: 2,
    round: 1
  };

  try {
    let url = "https://serpapi.com/search.json?engine=google_flights" +
      "&departure_id=" + origin +
      "&arrival_id=" + destination +
      "&outbound_date=" + date +
      "&adults=" + pax +
      "&currency=INR&hl=en&gl=in" +
      "&type=" + (tripMap[tripType] || 2) +
      "&travel_class=" + (cabinMap[cabinClass] || 1) +
      "&api_key=" + process.env.SERPAPI_KEY;

    if (tripType === 'round' && returnDate) {
      url += "&return_date=" + returnDate;
    }

    const response = await fetch(url);
    const data = await response.json();
    const rawFlights = data.best_flights || data.other_flights || [];

    if (!rawFlights.length) {
      return res.status(500).json({ error: "No flights found" });
    }

    const cabinLabel = {1:"Economy", 2:"Premium Economy", 3:"Business", 4:"First Class"};
    const baggageMap = {1:"15kg check-in + 7kg cabin", 2:"20kg check-in + 10kg cabin", 3:"32kg check-in + 15kg cabin", 4:"40kg check-in + 18kg cabin"};
    const seatMap = {1:"29 inches", 2:"34 inches", 3:"60 inches", 4:"78 inches"};
    const cabinNum = cabinMap[cabinClass] || 1;

    const flights = rawFlights.slice(0, 4).map((item, i) => {
      const leg = item.flights && item.flights[0];
      const price = item.price || 0;
      return {
        airline: leg && leg.airline ? leg.airline : "Unknown",
        flightNo: leg && leg.flight_number ? leg.flight_number : "N/A",
        departure: leg && leg.departure_airport && leg.departure_airport.time ? leg.departure_airport.time.split(" ")[1] : "00:00",
        arrival: leg && leg.arrival_airport && leg.arrival_airport.time ? leg.arrival_airport.time.split(" ")[1] : "00:00",
        duration: (function(m){ return Math.floor(m/60)+"h "+(m%60)+"m"; })(item.total_duration || 0),
        stops: item.flights && item.flights.length === 1 ? "Non-stop" : (item.flights ? item.flights.length - 1 : 0) + " stop",
        price: price,
        taxes: Math.round(price * 0.2),
        aircraft: leg && leg.airplane ? leg.airplane : "Standard Aircraft",
        cabinClass: cabinLabel[cabinNum],
        baggage: baggageMap[cabinNum],
        meal: cabinNum >= 2 ? "Complimentary" : i === 0 ? "Complimentary" : "Buy on board",
        seatPitch: seatMap[cabinNum],
        wifi: cabinNum >= 2 ? "Available" : i < 2 ? "Available" : "Not available",
        refundable: cabinNum >= 3
      };
    });

    res.json({ flights });

  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "Failed to fetch flights" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Gleefy running on port " + PORT));
