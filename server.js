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
.tagline { text-align: center; font-size: 11px; color: #6B6560; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 20px; }
.wrap { max-width: 750px; margin: 0 auto; padding: 0 18px; }
.main-tabs { display: flex; justify-content: center; margin-bottom: 28px; }
.main-tab { background: transparent; color: #CBB38E; border: 1px solid #CBB38E; padding: 10px 32px; font-size: 12px; font-weight: 700; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'Montserrat', sans-serif; transition: all 0.18s; }
.main-tab:first-child { border-radius: 6px 0 0 6px; }
.main-tab:last-child { border-radius: 0 6px 6px 0; }
.main-tab.active { background: #CBB38E; color: #000; }
.tab-content { display: none; }
.tab-content.active { display: block; }
.toggle-row { display: flex; justify-content: center; margin-bottom: 16px; }
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
.dd-item { padding: 11px 16px; cursor: pointer; display: flex; justify-content: space-between; align-items: center; border-bottom: 0.5px solid #222; }
.dd-item:hover { background: #252525; }
.dd-city { color: #E7E1D7; font-size: 14px; }
.dd-country { color: #6B6560; font-size: 12px; margin-left: 6px; }
.dd-code { color: #CBB38E; font-size: 13px; font-weight: 600; }
.swap-btn { background: transparent; border: none; border-right: 0.5px solid #2A2A2A; color: #CBB38E; font-size: 20px; cursor: pointer; padding: 0 14px; flex-shrink: 0; }
.date-wrap { border-left: 0.5px solid #2A2A2A; padding: 12px 16px; flex-shrink: 0; display: flex; flex-direction: column; min-width: 130px; }
input[type="date"] { background: transparent; border: none; outline: none; color: #E7E1D7; font-size: 14px; font-family: 'Montserrat', sans-serif; color-scheme: dark; cursor: pointer; margin-top: 4px; width: 100%; }
.return-card { display: none; background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; margin-bottom: 12px; }
.return-card.show { display: flex; }
.bottom-row { display: flex; gap: 10px; margin-bottom: 28px; }
.pax-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; display: flex; align-items: center; padding: 0 14px; gap: 10px; flex-shrink: 0; }
.pax-btn { background: none; border: none; color: #CBB38E; font-size: 22px; cursor: pointer; line-height: 1; padding: 4px; font-family: 'Montserrat', sans-serif; }
.pax-num { color: #E7E1D7; font-size: 16px; font-weight: 500; min-width: 18px; text-align: center; }
.search-btn { flex: 1; background: #CBB38E; color: #000; border: none; border-radius: 10px; padding: 16px 0; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'Montserrat', sans-serif; }
.search-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.err-box { background: #2A1010; border: 0.5px solid #5A2020; border-radius: 8px; padding: 12px 16px; color: #E07070; font-size: 13px; margin-bottom: 18px; }
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
.book-btn { background: #CBB38E; color: #000; border: none; padding: 9px 22px; border-radius: 6px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: 'Montserrat', sans-serif; text-decoration: none; display: inline-block; }
.book-btn:hover { background: #d9c7a8; }
.skel { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 22px 20px; margin-bottom: 12px; }
.skel-line { background: #222; border-radius: 4px; animation: pulse 1.5s ease-in-out infinite; }
@keyframes pulse { 0%,100%{opacity:0.4} 50%{opacity:0.8} }
.disclaimer { text-align: center; margin-top: 24px; font-size: 11px; color: #3A3530; }
.results-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
.route-label { font-size: 15px; font-weight: 500; }
.itin-form { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 24px; margin-bottom: 16px; }
.itin-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.itin-field { display: flex; flex-direction: column; margin-bottom: 12px; }
.itin-label { font-size: 10px; color: #6B6560; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 6px; }
.itin-input { background: #1A1A1A; border: 0.5px solid #2A2A2A; border-radius: 6px; padding: 10px 12px; color: #E7E1D7; font-size: 14px; font-family: 'Montserrat', sans-serif; outline: none; }
.itin-input:focus { border-color: #CBB38E; }
.itin-select { background: #1A1A1A; border: 0.5px solid #2A2A2A; border-radius: 6px; padding: 10px 12px; color: #E7E1D7; font-size: 14px; font-family: 'Montserrat', sans-serif; outline: none; cursor: pointer; }
.itin-textarea { background: #1A1A1A; border: 0.5px solid #2A2A2A; border-radius: 6px; padding: 10px 12px; color: #E7E1D7; font-size: 14px; font-family: 'Montserrat', sans-serif; outline: none; resize: vertical; min-height: 80px; width: 100%; }
.itin-btn { width: 100%; background: #CBB38E; color: #000; border: none; border-radius: 10px; padding: 16px 0; font-size: 13px; font-weight: 700; cursor: pointer; letter-spacing: 0.1em; text-transform: uppercase; font-family: 'Montserrat', sans-serif; }
.itin-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.section-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 20px; margin-bottom: 16px; }
.section-title { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 20px; margin-bottom: 16px; display: flex; align-items: center; gap: 10px; }
.trip-summary { background: #0E0E0E; border-radius: 8px; padding: 16px; margin-bottom: 16px; color: #A09890; font-size: 13px; line-height: 1.8; }
.summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.summary-item { background: #0E0E0E; border-radius: 8px; padding: 14px; text-align: center; }
.summary-label { font-size: 10px; color: #6B6560; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.summary-value { font-size: 18px; font-weight: 600; color: #CBB38E; }
.day-card { background: #0E0E0E; border-radius: 8px; padding: 16px; margin-bottom: 10px; }
.day-title { color: #CBB38E; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
.time-slot { display: flex; gap: 10px; margin-bottom: 8px; }
.time-badge { background: #1A1A1A; border: 0.5px solid #2A2A2A; color: #CBB38E; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 10px; white-space: nowrap; height: fit-content; margin-top: 2px; letter-spacing: 0.06em; }
.day-content { color: #A09890; font-size: 13px; line-height: 1.7; }
.hotel-card { background: #0E0E0E; border-radius: 8px; padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
.hotel-name { color: #E7E1D7; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.hotel-details { color: #6B6560; font-size: 12px; }
.hotel-price { color: #CBB38E; font-size: 16px; font-weight: 700; text-align: right; }
.car-card { background: #0E0E0E; border-radius: 8px; padding: 14px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; }
.car-name { color: #E7E1D7; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.car-details { color: #6B6560; font-size: 12px; }
.activity-card { background: #0E0E0E; border-radius: 8px; padding: 14px; margin-bottom: 10px; }
.activity-name { color: #E7E1D7; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.activity-details { color: #6B6560; font-size: 12px; line-height: 1.6; }
.map-frame { width: 100%; height: 300px; border-radius: 8px; border: 0.5px solid #2A2A2A; }
.stars { color: #CBB38E; font-size: 12px; }
</style>
</head>
<body>
<h1>Gleefy</h1>
<p class="tagline">Luxury Travel Planning</p>
<div class="wrap">
  <div class="main-tabs">
    <button class="main-tab active" onclick="switchTab('flights')">✈ Flights</button>
    <button class="main-tab" onclick="switchTab('itinerary')">🗺 Plan a Trip</button>
  </div>
  <div id="flightsTab" class="tab-content active">
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
    <div class="return-card" id="returnCard">
      <div class="field-inner" style="flex:1;padding:12px 16px;">
        <div class="field-label">Return Date</div>
        <input type="date" id="returnDateInput" style="background:transparent;border:none;outline:none;color:#E7E1D7;font-size:15px;font-family:Montserrat,sans-serif;color-scheme:dark;cursor:pointer;margin-top:4px;width:100%;">
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
    </div>
    <div id="results"></div>
  </div>
  <div id="itineraryTab" class="tab-content">
    <div class="itin-form">
      <div class="itin-row">
        <div class="itin-field">
          <label class="itin-label">Where from?</label>
          <input class="itin-input" id="itinFrom" placeholder="e.g. Mumbai">
        </div>
        <div class="itin-field">
          <label class="itin-label">Destination</label>
          <input class="itin-input" id="itinDest" placeholder="e.g. Paris">
        </div>
      </div>
      <div class="itin-row">
        <div class="itin-field">
          <label class="itin-label">Start Date</label>
          <input class="itin-input" type="date" id="itinStart">
        </div>
        <div class="itin-field">
          <label class="itin-label">End Date</label>
          <input class="itin-input" type="date" id="itinEnd">
        </div>
      </div>
      <div class="itin-row">
        <div class="itin-field">
          <label class="itin-label">Travellers</label>
          <input class="itin-input" type="number" id="itinPax" value="2" min="1" max="20">
        </div>
        <div class="itin-field">
          <label class="itin-label">Budget</label>
          <select class="itin-select" id="itinBudget">
            <option value="budget">Budget</option>
            <option value="mid-range" selected>Mid Range</option>
            <option value="luxury">Luxury</option>
            <option value="ultra-luxury">Ultra Luxury</option>
          </select>
        </div>
      </div>
      <div class="itin-row">
        <div class="itin-field">
          <label class="itin-label">Travel Style</label>
          <select class="itin-select" id="itinStyle">
            <option value="cultural">Cultural & Sightseeing</option>
            <option value="adventure">Adventure & Outdoors</option>
            <option value="relaxation">Relaxation & Wellness</option>
            <option value="food">Food & Nightlife</option>
            <option value="family">Family Friendly</option>
            <option value="romantic">Romantic</option>
            <option value="mixed" selected>Mixed</option>
          </select>
        </div>
        <div class="itin-field">
          <label class="itin-label">Accommodation</label>
          <select class="itin-select" id="itinHotel">
            <option value="budget">Budget / Hostel</option>
            <option value="3star">3 Star Hotel</option>
            <option value="4star" selected>4 Star Hotel</option>
            <option value="5star">5 Star Hotel</option>
            <option value="boutique">Boutique Hotel</option>
            <option value="resort">Luxury Resort</option>
          </select>
        </div>
      </div>
      <div class="itin-field">
        <label class="itin-label">Special requests or interests</label>
        <textarea class="itin-textarea" id="itinNotes" placeholder="e.g. vegetarian food, art museums, beach activities..."></textarea>
      </div>
      <button class="itin-btn" id="itinBtn" onclick="buildItinerary()">Build My Complete Trip</button>
    </div>
    <div id="itinLoading" style="display:none">
      <div class="skel"><div class="skel-line" style="height:20px;width:200px;margin-bottom:14px"></div><div class="skel-line" style="height:14px;width:100%;margin-bottom:8px"></div><div class="skel-line" style="height:14px;width:90%"></div></div>
      <div class="skel"><div class="skel-line" style="height:20px;width:180px;margin-bottom:14px"></div><div class="skel-line" style="height:14px;width:100%"></div></div>
    </div>
    <div id="itinResult"></div>
  </div>
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
let mode='domestic',tripType='oneway',cabinClass='economy',originCode='',destCode='',pax=1;
const today=new Date().toISOString().split('T')[0];
document.getElementById('dateInput').min=today;
document.getElementById('dateInput').value=today;
document.getElementById('returnDateInput').min=today;
document.getElementById('itinStart').min=today;
document.getElementById('itinEnd').min=today;
function switchTab(tab){
  document.getElementById('flightsTab').classList.toggle('active',tab==='flights');
  document.getElementById('itineraryTab').classList.toggle('active',tab==='itinerary');
  document.querySelectorAll('.main-tab').forEach(function(el,i){el.classList.toggle('active',(tab==='flights'&&i===0)||(tab==='itinerary'&&i===1));});
}
function setMode(m){mode=m;originCode='';destCode='';document.getElementById('originInput').value='';document.getElementById('destInput').value='';document.getElementById('domBtn').classList.toggle('active',m==='domestic');document.getElementById('intlBtn').classList.toggle('active',m==='international');document.getElementById('results').innerHTML='';}
function setTrip(t){tripType=t;document.getElementById('oneWayBtn').classList.toggle('active',t==='oneway');document.getElementById('roundBtn').classList.toggle('active',t==='round');document.getElementById('returnCard').classList.toggle('show',t==='round');}
function setCabin(c){cabinClass=c;['econ','premEcon','biz','first'].forEach(function(id){document.getElementById(id+'Btn').classList.remove('active');});document.getElementById({economy:'econ',premium_economy:'premEcon',business:'biz',first:'first'}[c]+'Btn').classList.add('active');}
function filterCities(field){
  const inputEl=document.getElementById(field==='origin'?'originInput':'destInput');
  const ddEl=document.getElementById(field==='origin'?'originDD':'destDD');
  const val=inputEl.value.toLowerCase();
  const matches=cities.filter(c=>(c.type===mode||c.type==='both')&&(c.city.toLowerCase().includes(val)||c.code.toLowerCase().includes(val))).slice(0,6);
  if(!matches.length){ddEl.style.display='none';return;}
  ddEl.innerHTML=matches.map(c=>'<div class="dd-item" onmousedown="selectCity(' + "'"+field+"'," + "'"+c.code+"'," + "'"+c.city+"'" + ')"><span><span class="dd-city">'+c.city+'</span><span class="dd-country">'+c.country+'</span></span><span class="dd-code">'+c.code+'</span></div>').join('');
  ddEl.style.display='block';
}
function selectCity(field,code,city){if(field==='origin'){originCode=code;document.getElementById('originInput').value=city+' ('+code+')';hideDD('origin');}else{destCode=code;document.getElementById('destInput').value=city+' ('+code+')';hideDD('dest');}}
function hideDD(field){document.getElementById(field==='origin'?'originDD':'destDD').style.display='none';}
function swapCities(){const oVal=document.getElementById('originInput').value,dVal=document.getElementById('destInput').value;document.getElementById('originInput').value=dVal;document.getElementById('destInput').value=oVal;const tmp=originCode;originCode=destCode;destCode=tmp;}
function changePax(d){pax=Math.max(1,Math.min(9,pax+d));document.getElementById('paxNum').textContent=pax;}
function showErr(msg){const b=document.getElementById('errBox');b.textContent=msg;b.style.display='block';}
function hideErr(){document.getElementById('errBox').style.display='none';}
async function doSearch(){
  hideErr();
  if(!originCode){showErr('Please select a departure city.');return;}
  if(!destCode){showErr('Please select a destination city.');return;}
  if(originCode===destCode){showErr('Origin and destination cannot be the same.');return;}
  const date=document.getElementById('dateInput').value;
  if(!date){showErr('Please select a travel date.');return;}
  const returnDate=document.getElementById('returnDateInput').value;
  if(tripType==='round'&&!returnDate){showErr('Please select a return date.');return;}
  const btn=document.getElementById('searchBtn');
  btn.disabled=true;btn.textContent='Searching...';
  document.getElementById('loading').style.display='block';
  document.getElementById('results').innerHTML='';
  const oCity=cities.find(c=>c.code===originCode);
  const dCity=cities.find(c=>c.code===destCode);
  try{
    const resp=await fetch('/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({origin:originCode,destination:destCode,date,returnDate,pax,tripType,cabinClass})});
    const data=await resp.json();
    if(!data.flights||!data.flights.length){showErr('No flights found. Please try a different route or date.');return;}
    renderResults(data.flights,oCity,dCity,date);
  }catch(e){showErr('Could not fetch flights. Please try again.');}
  finally{btn.disabled=false;btn.textContent='Search Flights';document.getElementById('loading').style.display='none';}
}
function renderResults(flights,oCity,dCity,date){
  const dateStr=new Date(date+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  const cabinLabel={economy:'Economy',premium_economy:'Premium Economy',business:'Business',first:'First Class'}[cabinClass];
  const tripLabel=tripType==='round'?'Round Trip':'One Way';
  let html='<div class="results-header"><div><span class="route-label">'+oCity.city+' to '+dCity.city+'</span><span style="font-size:13px;color:#6B6560;margin-left:10px">'+dateStr+' · '+pax+' pax · '+cabinLabel+' · '+tripLabel+'</span></div><span style="font-size:13px;color:#6B6560">'+flights.length+' options</span></div>';
  flights.forEach(function(f,i){
    const total=(f.price+f.taxes)*pax;
    const bookingUrl='https://www.google.com/flights?q=flights+from+'+originCode+'+to+'+destCode+'+on+'+date;
    html+='<div class="flight-card'+(i===0?' best':'')+'" id="fc'+i+'"><div class="flight-main" onclick="toggleCard('+i+')">'+(i===0?'<div class="best-badge">BEST</div>':'')+'<div class="flight-info"><div class="airline-row"><span class="airline-name">'+f.airline+'</span><span class="flight-no">'+f.flightNo+'</span></div><div class="time-row"><span class="time">'+f.departure+'</span><div class="connector"><div class="line"></div><span class="dur">'+f.duration+'</span><div class="line"></div></div><span class="time">'+f.arrival+'</span></div><div class="stops-row"><span class="stops-txt">'+f.stops+'</span>'+(f.refundable?'<span class="ref-badge">Refundable</span>':'')+'</div></div><div class="price-col"><div class="price-num">Rs.'+f.price.toLocaleString('en-IN')+'</div><div class="price-sub">per person</div></div><div class="chevron" id="chev'+i+'">▾</div></div><div class="flight-detail" id="fd'+i+'" style="display:none"><div class="detail-grid"><div><div class="detail-lbl">Aircraft</div><div class="detail-val">'+f.aircraft+'</div></div><div><div class="detail-lbl">Class</div><div class="detail-val">'+f.cabinClass+'</div></div><div><div class="detail-lbl">Baggage</div><div class="detail-val">'+f.baggage+'</div></div><div><div class="detail-lbl">Meal</div><div class="detail-val">'+f.meal+'</div></div><div><div class="detail-lbl">Seat Pitch</div><div class="detail-val">'+f.seatPitch+'</div></div><div><div class="detail-lbl">Wi-Fi</div><div class="detail-val">'+f.wifi+'</div></div></div><div class="detail-footer"><div><span style="font-size:13px;color:#6B6560">Total: </span><span class="total-amt">Rs.'+total.toLocaleString('en-IN')+'</span></div><a href="'+bookingUrl+'" target="_blank" class="book-btn">Book Now</a></div></div></div>';
  });
  html+='<p class="disclaimer">Prices are indicative estimates. Book Now links to Google Flights.</p>';
  document.getElementById('results').innerHTML=html;
}
function toggleCard(i){const fd=document.getElementById('fd'+i),ch=document.getElementById('chev'+i);const open=fd.style.display==='block';fd.style.display=open?'none':'block';ch.style.transform=open?'none':'rotate(180deg)';}
async function buildItinerary(){
  const from=document.getElementById('itinFrom').value.trim();
  const dest=document.getElementById('itinDest').value.trim();
  const start=document.getElementById('itinStart').value;
  const end=document.getElementById('itinEnd').value;
  const travellers=document.getElementById('itinPax').value;
  const budget=document.getElementById('itinBudget').value;
  const style=document.getElementById('itinStyle').value;
  const hotel=document.getElementById('itinHotel').value;
  const notes=document.getElementById('itinNotes').value.trim();
  if(!from||!dest||!start||!end){alert('Please fill in all required fields.');return;}
  const btn=document.getElementById('itinBtn');
  btn.disabled=true;btn.textContent='Building Your Trip...';
  document.getElementById('itinLoading').style.display='block';
  document.getElementById('itinResult').innerHTML='';
  try{
    const resp=await fetch('/itinerary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({from,dest,start,end,travellers,budget,style,hotel,notes})});
    const data=await resp.json();
    if(data.error){alert('Could not build itinerary. Please try again.');return;}
    document.getElementById('itinResult').innerHTML=data.html;
  }catch(e){alert('Could not build itinerary. Please try again.');}
  finally{btn.disabled=false;btn.textContent='Build My Complete Trip';document.getElementById('itinLoading').style.display='none';}
}
</script>
</body>
</html>`);
});

app.post("/search", async (req, res) => {
  const { origin, destination, date, returnDate, pax, tripType, cabinClass } = req.body;
  const cabinMap={economy:1,premium_economy:2,business:3,first:4};
  const cabinLabel={1:"Economy",2:"Premium Economy",3:"Business",4:"First Class"};
  const baggageMap={1:"15kg check-in + 7kg cabin",2:"20kg check-in + 10kg cabin",3:"32kg check-in + 15kg cabin",4:"40kg check-in + 18kg cabin"};
  const seatMap={1:"29 inches",2:"34 inches",3:"60 inches",4:"78 inches"};
  const cabinNum=cabinMap[cabinClass]||1;
  const tripNum=tripType==='round'?1:2;
  try{
    let url="https://serpapi.com/search.json?engine=google_flights&departure_id="+origin+"&arrival_id="+destination+"&outbound_date="+date+"&adults="+pax+"&currency=INR&hl=en&gl=in&type="+tripNum+"&travel_class="+cabinNum+"&api_key="+process.env.SERPAPI_KEY;
    if(tripType==='round'&&returnDate) url+="&return_date="+returnDate;
    const response=await fetch(url);
    const data=await response.json();
    const rawFlights=data.best_flights||data.other_flights||[];
    if(!rawFlights.length) return res.status(500).json({error:"No flights found"});
    const flights=rawFlights.slice(0,4).map((item,i)=>{
      const leg=item.flights&&item.flights[0];
      const price=item.price||0;
      return{airline:leg?leg.airline||"Unknown":"Unknown",flightNo:leg?leg.flight_number||"N/A":"N/A",departure:leg&&leg.departure_airport?leg.departure_airport.time.split(" ")[1]:"00:00",arrival:leg&&leg.arrival_airport?leg.arrival_airport.time.split(" ")[1]:"00:00",duration:Math.floor((item.total_duration||0)/60)+"h "+((item.total_duration||0)%60)+"m",stops:item.flights&&item.flights.length===1?"Non-stop":(item.flights?item.flights.length-1:0)+" stop",price,taxes:Math.round(price*0.2),aircraft:leg?leg.airplane||"Standard Aircraft":"Standard Aircraft",cabinClass:cabinLabel[cabinNum],baggage:baggageMap[cabinNum],meal:cabinNum>=2?"Complimentary":i===0?"Complimentary":"Buy on board",seatPitch:seatMap[cabinNum],wifi:cabinNum>=2?"Available":i<2?"Available":"Not available",refundable:cabinNum>=3};
    });
    res.json({flights});
  }catch(err){console.error(err);res.status(500).json({error:"Failed"});}
});

app.post("/itinerary", async (req, res) => {
  const { from, dest, start, end, travellers, budget, style, hotel, notes } = req.body;
  const days = Math.round((new Date(end) - new Date(start)) / (1000*60*60*24)) + 1;

  const prompt = `You are a luxury travel planner. Create a ${days}-day trip plan for ${travellers} travellers going from ${from} to ${dest}, ${start} to ${end}, ${budget} budget, ${style} style, ${hotel} accommodation. Special requests: ${notes||'None'}.

You MUST respond with ONLY a valid JSON object. No text before or after. No markdown. No explanation. Just the raw JSON.

Use this exact structure:
{"summary":"2-3 sentence trip summary","totalBudgetINR":"estimated budget range e.g. Rs.1,50,000 - Rs.2,00,000","days":[{"day":1,"title":"day title","morning":"morning activity with real place name","afternoon":"afternoon activity with real place name","evening":"evening activity with real place name","meals":"restaurant recommendations"}],"hotels":[{"name":"real hotel name","stars":4,"pricePerNightINR":12000,"highlight":"key feature"},{"name":"another real hotel","stars":5,"pricePerNightINR":25000,"highlight":"key feature"}],"cars":[{"type":"Sedan","company":"rental company","pricePerDayINR":3500,"features":"AC, GPS"},{"type":"SUV","company":"company","pricePerDayINR":5500,"features":"7 seater, AC"}],"activities":[{"name":"activity name","duration":"2-3 hours","priceINR":500,"description":"brief description"},{"name":"activity","duration":"half day","priceINR":1200,"description":"description"},{"name":"activity","duration":"full day","priceINR":2000,"description":"description"}],"tips":["tip 1","tip 2","tip 3"]}`;

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({contents:[{parts:[{text:prompt}]}],generationConfig:{temperature:0.5,maxOutputTokens:2048}}) }
    );
    const data = await response.json();
    console.log("Gemini response:", JSON.stringify(data).substring(0,300));
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
    text = text.replace(/```json|```/g,"").trim();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("No JSON in response");
    const itin = JSON.parse(jsonMatch[0]);

    const flightsUrl="https://www.google.com/flights?q=flights+from+"+encodeURIComponent(from)+"+to+"+encodeURIComponent(dest);
    const hotelsUrl="https://www.google.com/travel/hotels/"+encodeURIComponent(dest);
    const carsUrl="https://www.google.com/search?q=car+rental+in+"+encodeURIComponent(dest);
    const mapsUrl="https://www.google.com/maps/search/"+encodeURIComponent(dest);

    let html='<div>';
    html+='<div class="section-card"><div style="font-family:Bodoni Moda,serif;color:#CBB38E;font-size:26px;margin-bottom:8px">'+dest+' — '+days+' Day Trip</div>';
    html+='<div class="trip-summary">'+itin.summary+'</div>';
    html+='<div class="summary-grid"><div class="summary-item"><div class="summary-label">Duration</div><div class="summary-value">'+days+' Days</div></div><div class="summary-item"><div class="summary-label">Travellers</div><div class="summary-value">'+travellers+'</div></div><div class="summary-item"><div class="summary-label">Est. Budget</div><div class="summary-value" style="font-size:13px">'+itin.totalBudgetINR+'</div></div></div></div>';
    html+='<div class="section-card"><div class="section-title">✈️ Flights</div><div style="color:#A09890;font-size:13px;margin-bottom:12px">Search and book flights for your trip dates</div><a href="'+flightsUrl+'" target="_blank" class="book-btn">Search Flights on Google</a></div>';
    html+='<div class="section-card"><div class="section-title">🗓️ Day by Day Itinerary</div>';
    itin.days.forEach(function(d){
      html+='<div class="day-card"><div class="day-title">Day '+d.day+' — '+d.title+'</div>';
      html+='<div class="time-slot"><span class="time-badge">Morning</span><span class="day-content">'+d.morning+'</span></div>';
      html+='<div class="time-slot"><span class="time-badge">Afternoon</span><span class="day-content">'+d.afternoon+'</span></div>';
      html+='<div class="time-slot"><span class="time-badge">Evening</span><span class="day-content">'+d.evening+'</span></div>';
      html+='<div style="margin-top:8px;color:#6B6560;font-size:12px">🍽️ '+d.meals+'</div></div>';
    });
    html+='</div>';
    html+='<div class="section-card"><div class="section-title">🏨 Hotels</div>';
    itin.hotels.forEach(function(h){
      const stars='★'.repeat(h.stars)+'☆'.repeat(5-h.stars);
      html+='<div class="hotel-card"><div><div class="hotel-name">'+h.name+'</div><div class="stars">'+stars+'</div><div class="hotel-details" style="margin-top:4px">'+h.highlight+'</div></div><div><div class="hotel-price">Rs.'+h.pricePerNightINR.toLocaleString('en-IN')+'</div><div style="color:#6B6560;font-size:11px">per night</div><a href="'+hotelsUrl+'" target="_blank" class="book-btn" style="margin-top:8px;display:inline-block;font-size:10px;padding:6px 12px">Book</a></div></div>';
    });
    html+='</div>';
    html+='<div class="section-card"><div class="section-title">🚗 Car Rentals</div>';
    itin.cars.forEach(function(c){
      html+='<div class="car-card"><div><div class="car-name">'+c.type+'</div><div class="car-details">'+c.company+' · '+c.features+'</div></div><div><div style="color:#CBB38E;font-size:16px;font-weight:700">Rs.'+c.pricePerDayINR.toLocaleString('en-IN')+'</div><div style="color:#6B6560;font-size:11px">per day</div><a href="'+carsUrl+'" target="_blank" class="book-btn" style="margin-top:8px;display:inline-block;font-size:10px;padding:6px 12px">Book</a></div></div>';
    });
    html+='</div>';
    html+='<div class="section-card"><div class="section-title">🎯 Activities</div>';
    itin.activities.forEach(function(a){
      html+='<div class="activity-card"><div class="activity-name">'+a.name+'</div><div class="activity-details">⏱ '+a.duration+' · Rs.'+a.priceINR.toLocaleString('en-IN')+' per person<br>'+a.description+'</div></div>';
    });
    html+='</div>';
    html+='<div class="section-card"><div class="section-title">🗺️ Explore the Map</div>';
    html+='<iframe class="map-frame" src="https://maps.google.com/maps?q='+encodeURIComponent(dest)+'&output=embed" frameborder="0" allowfullscreen></iframe>';
    html+='<a href="'+mapsUrl+'" target="_blank" class="book-btn" style="margin-top:12px;display:inline-block">Open in Google Maps</a></div>';
    html+='<div class="section-card"><div class="section-title">💡 Travel Tips</div><ul style="padding-left:16px">';
    itin.tips.forEach(function(t){html+='<li style="color:#A09890;font-size:13px;line-height:2">'+t+'</li>';});
    html+='</ul></div></div>';

    res.json({html});
  } catch(err) {
    console.error("Itinerary error:", err.message);
    res.status(500).json({error:"Failed to build itinerary"});
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log("Gleefy running on port " + PORT));
