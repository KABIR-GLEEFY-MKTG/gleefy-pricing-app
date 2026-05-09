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
.main-tabs { display: flex; justify-content: center; margin-bottom: 28px; flex-wrap: wrap; gap: 0; }
.main-tab { background: transparent; color: #CBB38E; border: 1px solid #CBB38E; padding: 8px 10px; font-size: 9px; font-weight: 700; cursor: pointer; letter-spacing: 0.05em; text-transform: uppercase; font-family: 'Montserrat', sans-serif; transition: all 0.18s; border-right: none; }
.main-tab:first-child { border-radius: 6px 0 0 6px; }
.main-tab:last-child { border-radius: 0 6px 6px 0; border-right: 1px solid #CBB38E; }
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
.section-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 20px; margin-bottom: 16px; }
.section-title { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 20px; margin-bottom: 16px; }
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
.trip-summary { background: #0E0E0E; border-radius: 8px; padding: 16px; margin-bottom: 16px; color: #A09890; font-size: 13px; line-height: 1.8; }
.summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
.summary-item { background: #0E0E0E; border-radius: 8px; padding: 14px; text-align: center; }
.summary-label { font-size: 10px; color: #6B6560; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.summary-value { font-size: 18px; font-weight: 600; color: #CBB38E; }
.day-card { background: #0E0E0E; border-radius: 8px; padding: 16px; margin-bottom: 10px; }
.day-title { color: #CBB38E; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 10px; }
.time-slot { display: flex; gap: 10px; margin-bottom: 8px; }
.time-badge { background: #1A1A1A; border: 0.5px solid #2A2A2A; color: #CBB38E; font-size: 9px; font-weight: 700; padding: 2px 8px; border-radius: 10px; white-space: nowrap; height: fit-content; margin-top: 2px; }
.day-content { color: #A09890; font-size: 13px; line-height: 1.7; }
.activity-card { background: #0E0E0E; border-radius: 8px; padding: 14px; margin-bottom: 10px; }
.activity-name { color: #E7E1D7; font-size: 14px; font-weight: 600; margin-bottom: 4px; }
.activity-details { color: #6B6560; font-size: 12px; line-height: 1.6; }
.map-frame { width: 100%; height: 300px; border-radius: 8px; border: 0.5px solid #2A2A2A; }
.car-strip { background: #0E0E0E; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 16px 20px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center; gap: 12px; }
.car-strip-left { flex: 1; }
.car-strip-model { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 17px; margin-bottom: 3px; }
.car-strip-brand { color: #6B6560; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
.car-strip-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 6px; }
.car-tag { background: #1A1A1A; border: 0.5px solid #2A2A2A; color: #A09890; font-size: 10px; padding: 2px 8px; border-radius: 10px; }
.car-tag.gold { border-color: #CBB38E; color: #CBB38E; }
.car-strip-desc { color: #6B6560; font-size: 12px; line-height: 1.5; }
.car-strip-right { text-align: right; flex-shrink: 0; }
.car-strip-price { color: #CBB38E; font-size: 20px; font-weight: 700; }
.car-strip-label { color: #6B6560; font-size: 11px; margin-bottom: 8px; }
.car-strip-cities { display: flex; flex-wrap: wrap; gap: 4px; justify-content: flex-end; margin-bottom: 8px; }
.city-dot { background: #1A1A1A; color: #6B6560; font-size: 10px; padding: 2px 7px; border-radius: 10px; }
.featured-bar { background: #CBB38E; color: #000; font-size: 9px; font-weight: 800; padding: 2px 8px; border-radius: 3px; letter-spacing: 0.1em; display: inline-block; margin-bottom: 6px; }
.car-form { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 24px; margin-bottom: 20px; }
.car-filter-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px; }
.drive-toggle { display: flex; justify-content: center; gap: 0; margin-bottom: 16px; }
.drive-btn { background: transparent; color: #CBB38E; border: 1px solid #CBB38E; padding: 8px 24px; font-size: 11px; font-weight: 700; cursor: pointer; letter-spacing: 0.08em; text-transform: uppercase; font-family: 'Montserrat', sans-serif; transition: all 0.18s; }
.drive-btn:first-child { border-radius: 6px 0 0 6px; }
.drive-btn:last-child { border-radius: 0 6px 6px 0; }
.drive-btn.active { background: #CBB38E; color: #000; }
.rest-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
.rest-card.featured { border-color: #CBB38E; }
.rest-header { padding: 18px 20px; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.rest-name { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 20px; margin-bottom: 4px; }
.rest-cuisine { color: #6B6560; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
.rest-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.rest-tag { background: #1A1A1A; border: 0.5px solid #2A2A2A; color: #A09890; font-size: 10px; padding: 2px 8px; border-radius: 10px; }
.rest-tag.gold { border-color: #CBB38E; color: #CBB38E; }
.rest-right { text-align: right; flex-shrink: 0; }
.rest-price { color: #CBB38E; font-size: 16px; font-weight: 700; }
.rest-price-label { color: #6B6560; font-size: 11px; margin-bottom: 6px; }
.rest-stars { color: #CBB38E; font-size: 14px; margin-bottom: 6px; }
.rest-body { padding: 0 20px 20px; border-top: 0.5px solid #1A1A1A; }
.rest-desc { color: #A09890; font-size: 13px; line-height: 1.7; margin: 14px 0 12px; }
.menu-title { font-size: 10px; color: #6B6560; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
.menu-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.menu-item { background: #0E0E0E; border-radius: 8px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; gap: 10px; }
.menu-item-left { flex: 1; }
.menu-item-name { color: #E7E1D7; font-size: 13px; font-weight: 600; margin-bottom: 3px; }
.menu-item-desc { color: #6B6560; font-size: 12px; line-height: 1.5; }
.menu-item-tags { display: flex; gap: 4px; margin-top: 4px; flex-wrap: wrap; }
.menu-item-tag { font-size: 9px; color: #5AA97B; background: #1A2E22; padding: 1px 6px; border-radius: 4px; }
.menu-item-price { color: #CBB38E; font-size: 14px; font-weight: 700; white-space: nowrap; }
.rest-footer { display: flex; justify-content: space-between; align-items: center; }
.rest-form { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 24px; margin-bottom: 20px; }
.hotel-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
.hotel-card.featured { border-color: #CBB38E; }
.hotel-header { padding: 18px 20px; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.hotel-name { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 22px; margin-bottom: 4px; }
.hotel-type { color: #6B6560; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
.hotel-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.hotel-tag { background: #1A1A1A; border: 0.5px solid #2A2A2A; color: #A09890; font-size: 10px; padding: 2px 8px; border-radius: 10px; }
.hotel-tag.gold { border-color: #CBB38E; color: #CBB38E; }
.hotel-right { text-align: right; flex-shrink: 0; }
.hotel-price { color: #CBB38E; font-size: 22px; font-weight: 700; }
.hotel-price-label { color: #6B6560; font-size: 11px; margin-bottom: 4px; }
.hotel-stars { color: #CBB38E; font-size: 16px; margin-bottom: 4px; }
.hotel-review { color: #5AA97B; font-size: 12px; font-weight: 600; }
.hotel-body { padding: 0 20px 20px; border-top: 0.5px solid #1A1A1A; }
.hotel-desc { color: #A09890; font-size: 13px; line-height: 1.7; margin: 14px 0 12px; }
.amenities-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 14px; }
.amenity { background: #0E0E0E; border-radius: 6px; padding: 8px 10px; font-size: 11px; color: #A09890; text-align: center; }
.rooms-title { font-size: 10px; color: #6B6560; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
.room-items { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.room-item { background: #0E0E0E; border-radius: 8px; padding: 12px 14px; display: flex; justify-content: space-between; align-items: center; }
.room-name { color: #E7E1D7; font-size: 13px; font-weight: 600; margin-bottom: 3px; }
.room-desc { color: #6B6560; font-size: 12px; }
.room-price { color: #CBB38E; font-size: 14px; font-weight: 700; white-space: nowrap; }
.hotel-footer { display: flex; justify-content: space-between; align-items: center; }
.hotel-form { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 24px; margin-bottom: 20px; }
.place-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
.place-card.featured { border-color: #CBB38E; }
.place-card.gem { border-color: #7B6B9E; }
.place-header { padding: 18px 20px; display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; }
.place-name { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 20px; margin-bottom: 4px; }
.place-name.gem-name { color: #B8A9D9; }
.place-category { color: #6B6560; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 8px; }
.place-tags { display: flex; flex-wrap: wrap; gap: 6px; }
.place-tag { background: #1A1A1A; border: 0.5px solid #2A2A2A; color: #A09890; font-size: 10px; padding: 2px 8px; border-radius: 10px; }
.place-tag.gold { border-color: #CBB38E; color: #CBB38E; }
.place-tag.purple { border-color: #7B6B9E; color: #B8A9D9; }
.place-body { padding: 0 20px 20px; border-top: 0.5px solid #1A1A1A; }
.place-desc { color: #A09890; font-size: 13px; line-height: 1.7; margin: 14px 0 12px; }
.place-info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 14px; }
.place-info-item { background: #0E0E0E; border-radius: 8px; padding: 12px; }
.place-info-label { font-size: 9px; color: #6B6560; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 5px; }
.place-info-value { font-size: 13px; color: #E7E1D7; line-height: 1.5; }
.insider-tip { background: #0E0E0E; border-left: 2px solid #CBB38E; border-radius: 0 8px 8px 0; padding: 12px 14px; margin-bottom: 14px; }
.insider-tip.gem-tip { border-left-color: #7B6B9E; }
.insider-label { font-size: 9px; color: #CBB38E; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px; }
.insider-label.gem-label { color: #B8A9D9; }
.insider-text { color: #A09890; font-size: 13px; line-height: 1.6; }
.place-footer { display: flex; justify-content: space-between; align-items: center; }
.crowd-bar { display: flex; align-items: center; gap: 8px; }
.crowd-label { font-size: 11px; color: #6B6560; }
.crowd-dots { display: flex; gap: 3px; }
.crowd-dot { width: 8px; height: 8px; border-radius: 50%; background: #2A2A2A; }
.crowd-dot.active.busy { background: #E07070; }
.crowd-dot.active.moderate { background: #CBB38E; }
.crowd-dot.active.quiet { background: #5AA97B; }
.gem-bar { background: #7B6B9E22; border: 0.5px solid #7B6B9E; border-radius: 3px; color: #B8A9D9; font-size: 9px; font-weight: 800; padding: 2px 8px; letter-spacing: 0.1em; display: inline-block; margin-bottom: 6px; }
.place-form { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 24px; margin-bottom: 20px; }
/* EXPERIENCE TAB */
.exp-form { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 24px; margin-bottom: 20px; }
.exp-domain-card { background: #0E0E0E; border: 0.5px solid #2A2A2A; border-radius: 12px; padding: 20px; margin-bottom: 16px; }
.exp-domain-header { display: flex; align-items: center; gap: 12px; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 0.5px solid #2A2A2A; }
.exp-domain-icon { font-size: 28px; }
.exp-domain-title { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 20px; }
.exp-domain-subtitle { color: #6B6560; font-size: 12px; margin-top: 2px; }
.exp-item { background: #111; border: 0.5px solid #2A2A2A; border-radius: 8px; padding: 14px; margin-bottom: 10px; }
.exp-item.featured { border-color: #CBB38E; }
.exp-item-name { color: #E7E1D7; font-size: 14px; font-weight: 600; margin-bottom: 4px; display: flex; justify-content: space-between; align-items: flex-start; }
.exp-item-price { color: #CBB38E; font-size: 14px; font-weight: 700; white-space: nowrap; margin-left: 10px; }
.exp-item-desc { color: #6B6560; font-size: 12px; line-height: 1.6; margin-bottom: 8px; }
.exp-item-tags { display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 8px; }
.exp-item-tag { background: #1A1A1A; border: 0.5px solid #2A2A2A; color: #A09890; font-size: 10px; padding: 2px 8px; border-radius: 10px; }
.exp-item-tag.gold { border-color: #CBB38E; color: #CBB38E; }
.exp-tip { background: #0B0B0B; border-left: 2px solid #CBB38E; padding: 8px 12px; border-radius: 0 6px 6px 0; color: #A09890; font-size: 12px; line-height: 1.5; margin-bottom: 8px; }
/* PROFILE */
.profile-form { background: #111; border: 0.5px solid #2A2A2A; border-radius: 10px; padding: 24px; margin-bottom: 20px; }
.profile-section-title { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 16px; margin: 20px 0 12px; padding-top: 16px; border-top: 0.5px solid #2A2A2A; }
.profile-section-title:first-of-type { border-top: none; margin-top: 0; padding-top: 0; }
.profile-result { background: #111; border: 0.5px solid #CBB38E; border-radius: 12px; padding: 24px; margin-top: 20px; }
.domain-insight { background: #0E0E0E; border-left: 2px solid #CBB38E; border-radius: 0 8px 8px 0; padding: 14px; margin-bottom: 10px; }
.domain-insight-title { font-size: 11px; font-weight: 700; color: #CBB38E; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 6px; }
.domain-insight-text { font-size: 13px; color: #A09890; line-height: 1.7; }
.pdf-btn { background: transparent; border: 1px solid #CBB38E; color: #CBB38E; padding: 10px 24px; border-radius: 6px; font-size: 12px; font-weight: 700; cursor: pointer; font-family: 'Montserrat', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; transition: all 0.18s; }
.pdf-btn:hover { background: #CBB38E; color: #000; }
/* COST PLAN */
.cost-card { background: #111; border: 0.5px solid #2A2A2A; border-radius: 12px; margin-bottom: 16px; overflow: hidden; }
.cost-header { background: #0E0E0E; padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; }
.cost-category { font-family: 'Bodoni Moda', serif; color: #CBB38E; font-size: 18px; }
.cost-total { color: #CBB38E; font-size: 20px; font-weight: 700; }
.cost-body { padding: 16px 20px; }
.cost-line { display: flex; justify-content: space-between; align-items: center; padding: 8px 0; border-bottom: 0.5px solid #1A1A1A; }
.cost-line:last-child { border-bottom: none; }
.cost-line-name { color: #A09890; font-size: 13px; }
.cost-line-amount { color: #E7E1D7; font-size: 13px; font-weight: 600; }
.grand-total-card { background: #CBB38E; border-radius: 12px; padding: 20px; margin-bottom: 16px; display: flex; justify-content: space-between; align-items: center; }
.grand-total-label { color: #000; font-size: 14px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; }
.grand-total-amount { color: #000; font-size: 28px; font-weight: 700; font-family: 'Bodoni Moda', serif; }
.exec-day { background: #0E0E0E; border-radius: 8px; padding: 16px; margin-bottom: 10px; }
.exec-day-title { color: #CBB38E; font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }
.exec-slot { display: flex; gap: 12px; margin-bottom: 8px; align-items: flex-start; }
.exec-time { color: #CBB38E; font-size: 11px; font-weight: 700; white-space: nowrap; min-width: 50px; margin-top: 1px; }
.exec-task { flex: 1; }
.exec-task-name { color: #E7E1D7; font-size: 13px; font-weight: 600; margin-bottom: 2px; }
.exec-task-detail { color: #6B6560; font-size: 12px; line-height: 1.5; }
.exec-task-cost { color: #CBB38E; font-size: 11px; font-weight: 600; margin-top: 2px; }
</style>
</head>
<body>
<h1>Gleefy</h1>
<p class="tagline">Luxury Experience Planning</p>
<div class="wrap">

  <div class="main-tabs">
    <button class="main-tab active" onclick="switchTab('flights')">✈ Flights</button>
    <button class="main-tab" onclick="switchTab('hotels')">🏨 Hotels</button>
    <button class="main-tab" onclick="switchTab('cars')">🚗 Cars</button>
    <button class="main-tab" onclick="switchTab('restaurants')">🍽️ Dining</button>
    <button class="main-tab" onclick="switchTab('sightseeing')">🏛️ Sights</button>
    <button class="main-tab" onclick="switchTab('gems')">💎 Gems</button>
    <button class="main-tab" onclick="switchTab('experiences')">🌟 Experiences</button>
    <button class="main-tab" onclick="switchTab('itinerary')">🗺 Plan Trip</button>
    <button class="main-tab" onclick="switchTab('profile')">👤 Client</button>
    <button class="main-tab" onclick="switchTab('costplan')">💰 Cost Plan</button>
  </div>

  <!-- FLIGHTS TAB -->
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
    <div id="flightCarSection" style="display:none">
      <div class="section-card">
        <div class="section-title">🚗 Add a Chauffeur Car</div>
        <div style="color:#A09890;font-size:13px;margin-bottom:16px">Book a luxury chauffeur car at your destination.</div>
        <div id="flightCarLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:60px;width:100%"></div></div></div>
        <div id="flightCarResults"></div>
      </div>
    </div>
  </div>

  <!-- HOTELS TAB -->
  <div id="hotelsTab" class="tab-content">
    <div class="hotel-form">
      <div class="itin-row"><div class="itin-field"><label class="itin-label">City</label><input class="itin-input" id="hotelCity" placeholder="e.g. Mumbai, Paris, Dubai"></div><div class="itin-field"><label class="itin-label">Category</label><select class="itin-select" id="hotelCategory"><option value="all">All</option><option value="3star">3 Star</option><option value="4star">4 Star</option><option value="5star">5 Star</option><option value="boutique">Boutique</option><option value="resort">Luxury Resort</option><option value="heritage">Heritage</option><option value="villa">Private Villa</option></select></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Check In</label><input class="itin-input" type="date" id="hotelCheckin"></div><div class="itin-field"><label class="itin-label">Check Out</label><input class="itin-input" type="date" id="hotelCheckout"></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Guests</label><input class="itin-input" type="number" id="hotelGuests" value="2" min="1" max="20"></div><div class="itin-field"><label class="itin-label">Budget per Night</label><select class="itin-select" id="hotelBudget"><option value="budget">Under Rs.3000</option><option value="mid">Rs.3000-8000</option><option value="luxury" selected>Rs.8000-25000</option><option value="ultra">Rs.25000+</option></select></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Location</label><select class="itin-select" id="hotelLocation"><option value="any">Any</option><option value="city-center">City Center</option><option value="beachfront">Beachfront</option><option value="airport">Near Airport</option><option value="business">Business District</option></select></div><div class="itin-field"><label class="itin-label">Must Have</label><select class="itin-select" id="hotelAmenity"><option value="any">No Preference</option><option value="pool">Pool</option><option value="spa">Spa</option><option value="gym">Gym</option><option value="restaurant">Fine Dining</option><option value="rooftop">Rooftop Bar</option><option value="butler">Butler</option></select></div></div>
      <button class="itin-btn" id="hotelSearchBtn" onclick="searchHotels()">Find Hotels</button>
    </div>
    <div id="hotelLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:80px;width:100%"></div></div></div>
    <div id="hotelResults"></div>
  </div>

  <!-- CARS TAB -->
  <div id="carsTab" class="tab-content">
    <div class="car-form">
      <div class="drive-toggle"><button class="drive-btn active" id="chauffeurBtn" onclick="setDrive('chauffeur')">Chauffeur</button><button class="drive-btn" id="bothDriveBtn" onclick="setDrive('both')">Chauffeur + Self Drive</button></div>
      <div class="car-filter-row"><div class="itin-field"><label class="itin-label">City</label><select class="itin-select" id="carCity"><option>Mumbai</option><option>Delhi</option><option>Bangalore</option><option>Goa</option><option>Chennai</option><option>Hyderabad</option><option>Jaipur</option><option>Dubai</option><option>London</option><option>Singapore</option></select></div><div class="itin-field"><label class="itin-label">Category</label><select class="itin-select" id="carCategory"><option value="all">All</option><option value="sedan">Luxury Sedan</option><option value="suv">Luxury SUV</option><option value="sports">Sports</option><option value="supercar">Supercar</option><option value="limousine">Limousine</option><option value="vintage">Vintage</option></select></div></div>
      <div class="car-filter-row"><div class="itin-field"><label class="itin-label">Pickup Date</label><input class="itin-input" type="date" id="carPickup"></div><div class="itin-field"><label class="itin-label">Return Date</label><input class="itin-input" type="date" id="carReturn"></div></div>
      <button class="itin-btn" id="carSearchBtn" onclick="searchCars()">Find Luxury Cars</button>
    </div>
    <div id="carLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:80px;width:100%"></div></div></div>
    <div id="carResults"></div>
  </div>

  <!-- RESTAURANTS TAB -->
  <div id="restaurantsTab" class="tab-content">
    <div class="rest-form">
      <div class="itin-row"><div class="itin-field"><label class="itin-label">City</label><input class="itin-input" id="restCity" placeholder="e.g. Mumbai, Paris"></div><div class="itin-field"><label class="itin-label">Cuisine</label><select class="itin-select" id="restCuisine"><option value="all">All</option><option value="indian">Indian</option><option value="italian">Italian</option><option value="japanese">Japanese</option><option value="french">French</option><option value="chinese">Chinese</option><option value="mediterranean">Mediterranean</option><option value="thai">Thai</option><option value="seafood">Seafood</option><option value="steakhouse">Steakhouse</option><option value="fusion">Fusion</option></select></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Budget</label><select class="itin-select" id="restBudget"><option value="budget">Under Rs.500</option><option value="mid" selected>Rs.500-2000</option><option value="fine">Rs.2000-5000</option><option value="luxury">Rs.5000+</option></select></div><div class="itin-field"><label class="itin-label">Ambience</label><select class="itin-select" id="restAmbience"><option value="all">Any</option><option value="romantic">Romantic</option><option value="family">Family</option><option value="business">Business</option><option value="casual">Casual</option><option value="rooftop">Rooftop</option><option value="beachside">Beachside</option></select></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Dietary</label><select class="itin-select" id="restDiet"><option value="all">No Preference</option><option value="vegetarian">Vegetarian</option><option value="vegan">Vegan</option><option value="halal">Halal</option><option value="gluten-free">Gluten Free</option><option value="jain">Jain</option></select></div><div class="itin-field"><label class="itin-label">Distance</label><select class="itin-select" id="restDist"><option value="walking">Walking</option><option value="short">Short Drive</option><option value="any" selected>Any</option></select></div></div>
      <button class="itin-btn" id="restSearchBtn" onclick="searchRestaurants()">Find Restaurants</button>
    </div>
    <div id="restLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:80px;width:100%"></div></div></div>
    <div id="restResults"></div>
  </div>

  <!-- SIGHTSEEING TAB -->
  <div id="sightseeingTab" class="tab-content">
    <div class="place-form">
      <div class="itin-row"><div class="itin-field"><label class="itin-label">City</label><input class="itin-input" id="sightCity" placeholder="e.g. Paris, Delhi"></div><div class="itin-field"><label class="itin-label">Category</label><select class="itin-select" id="sightCategory"><option value="all">All</option><option value="history">History</option><option value="art">Art & Culture</option><option value="nature">Nature</option><option value="architecture">Architecture</option><option value="religious">Religious</option><option value="museum">Museums</option><option value="viewpoint">Viewpoints</option></select></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Budget</label><select class="itin-select" id="sightBudget"><option value="free">Free</option><option value="budget">Under Rs.500</option><option value="mid" selected>Rs.500-2000</option><option value="premium">Rs.2000+</option></select></div><div class="itin-field"><label class="itin-label">Best Time</label><select class="itin-select" id="sightTime"><option value="any">Any</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="night">Night</option></select></div></div>
      <button class="itin-btn" id="sightSearchBtn" onclick="searchPlaces('sightseeing')">Find Sightseeing Spots</button>
    </div>
    <div id="sightLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:80px;width:100%"></div></div></div>
    <div id="sightResults"></div>
  </div>

  <!-- HIDDEN GEMS TAB -->
  <div id="gemsTab" class="tab-content">
    <div class="place-form">
      <div class="itin-row"><div class="itin-field"><label class="itin-label">City or Region</label><input class="itin-input" id="gemCity" placeholder="e.g. Paris, Rajasthan"></div><div class="itin-field"><label class="itin-label">Type</label><select class="itin-select" id="gemCategory"><option value="all">All</option><option value="cafe">Secret Cafes</option><option value="nature">Untouched Nature</option><option value="art">Street Art</option><option value="history">Forgotten History</option><option value="food">Local Food</option><option value="viewpoint">Secret Viewpoints</option><option value="market">Local Markets</option></select></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Crowd</label><select class="itin-select" id="gemCrowd"><option value="very-quiet">Very Quiet</option><option value="quiet" selected>Quiet</option><option value="moderate">Moderate</option></select></div><div class="itin-field"><label class="itin-label">Best Time</label><select class="itin-select" id="gemTime"><option value="any">Any</option><option value="morning">Morning</option><option value="afternoon">Afternoon</option><option value="evening">Evening</option><option value="night">Night</option></select></div></div>
      <button class="itin-btn" id="gemSearchBtn" onclick="searchPlaces('gems')">Discover Hidden Gems</button>
    </div>
    <div id="gemLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:80px;width:100%"></div></div></div>
    <div id="gemResults"></div>
  </div>

  <!-- EXPERIENCES TAB -->
  <div id="experiencesTab" class="tab-content">
    <div class="exp-form">
      <div style="color:#A09890;font-size:13px;margin-bottom:20px;line-height:1.7">Enter your destination and we will generate curated experience recommendations across all 6 Gleefy domains — Sport, Travel, Music, Festivals, Events and Spiritual — all in one place.</div>
      <div class="itin-row">
        <div class="itin-field"><label class="itin-label">Destination City</label><input class="itin-input" id="expDest" placeholder="e.g. Mumbai, Dubai, London"></div>
        <div class="itin-field"><label class="itin-label">Budget Level</label><select class="itin-select" id="expBudget"><option value="mid">Mid Range</option><option value="luxury" selected>Luxury</option><option value="ultra">Ultra Luxury</option></select></div>
      </div>
      <div class="itin-row">
        <div class="itin-field"><label class="itin-label">Travel Dates</label><input class="itin-input" type="date" id="expStart"></div>
        <div class="itin-field"><label class="itin-label">Return Date</label><input class="itin-input" type="date" id="expEnd"></div>
      </div>
      <div class="itin-row">
        <div class="itin-field"><label class="itin-label">Number of People</label><input class="itin-input" type="number" id="expPeople" value="2" min="1" max="20"></div>
        <div class="itin-field"><label class="itin-label">Interests</label><input class="itin-input" id="expInterests" placeholder="e.g. cricket, EDM, yoga, wine tasting"></div>
      </div>
      <button class="itin-btn" id="expBtn" onclick="buildExperiences()">Discover All Experiences</button>
    </div>
    <div id="expLoading" style="display:none">
      <div class="skel"><div class="skel-line" style="height:20px;width:200px;margin-bottom:14px"></div><div class="skel-line" style="height:14px;width:100%;margin-bottom:8px"></div><div class="skel-line" style="height:14px;width:90%"></div></div>
      <div class="skel"><div class="skel-line" style="height:20px;width:180px;margin-bottom:14px"></div><div class="skel-line" style="height:14px;width:100%"></div></div>
    </div>
    <div id="expResults"></div>
  </div>

  <!-- ITINERARY TAB -->
  <div id="itineraryTab" class="tab-content">
    <div class="itin-form">
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Where from?</label><input class="itin-input" id="itinFrom" placeholder="e.g. Mumbai"></div><div class="itin-field"><label class="itin-label">Destination</label><input class="itin-input" id="itinDest" placeholder="e.g. Paris"></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Start Date</label><input class="itin-input" type="date" id="itinStart"></div><div class="itin-field"><label class="itin-label">End Date</label><input class="itin-input" type="date" id="itinEnd"></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Travellers</label><input class="itin-input" type="number" id="itinPax" value="2" min="1" max="20"></div><div class="itin-field"><label class="itin-label">Budget</label><select class="itin-select" id="itinBudget"><option value="budget">Budget</option><option value="mid-range" selected>Mid Range</option><option value="luxury">Luxury</option><option value="ultra-luxury">Ultra Luxury</option></select></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Travel Style</label><select class="itin-select" id="itinStyle"><option value="cultural">Cultural</option><option value="adventure">Adventure</option><option value="relaxation">Relaxation</option><option value="food">Food & Nightlife</option><option value="family">Family</option><option value="romantic">Romantic</option><option value="mixed" selected>Mixed</option></select></div><div class="itin-field"><label class="itin-label">Accommodation</label><select class="itin-select" id="itinHotel"><option value="budget">Budget</option><option value="3star">3 Star</option><option value="4star" selected>4 Star</option><option value="5star">5 Star</option><option value="boutique">Boutique</option><option value="resort">Luxury Resort</option></select></div></div>
      <div class="itin-field"><label class="itin-label">Special requests</label><textarea class="itin-textarea" id="itinNotes" placeholder="e.g. IPL match, Coldplay concert, Kumbh Mela, vegetarian food, hidden gems..."></textarea></div>
      <button class="itin-btn" id="itinBtn" onclick="buildItinerary()">Build My Complete Trip</button>
    </div>
    <div id="itinLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:20px;width:200px;margin-bottom:14px"></div><div class="skel-line" style="height:14px;width:100%"></div></div></div>
    <div id="itinResult"></div>
  </div>

  <!-- CLIENT PROFILE TAB -->
  <div id="profileTab" class="tab-content">
    <div class="profile-form">
      <div class="profile-section-title">👤 Basic Information</div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Full Name</label><input class="itin-input" id="profName" placeholder="Client name"></div><div class="itin-field"><label class="itin-label">Age</label><input class="itin-input" type="number" id="profAge" placeholder="Age"></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Location</label><input class="itin-input" id="profLocation" placeholder="e.g. Mumbai"></div><div class="itin-field"><label class="itin-label">Occupation</label><input class="itin-input" id="profOccupation" placeholder="e.g. Entrepreneur"></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Budget Style</label><select class="itin-select" id="profBudget"><option value="budget">Budget</option><option value="mid">Mid Range</option><option value="luxury">Luxury</option><option value="ultra">Ultra HNW</option></select></div><div class="itin-field"><label class="itin-label">Group Size</label><select class="itin-select" id="profGroup"><option value="solo">Solo</option><option value="couple">Couple</option><option value="small">Small Group</option><option value="large">Large Group</option><option value="family">Family</option></select></div></div>

      <div class="profile-section-title">✈️ Travel</div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Favourite Destinations</label><input class="itin-input" id="profDestinations" placeholder="e.g. Maldives, Europe, Japan"></div><div class="itin-field"><label class="itin-label">Travel Style</label><select class="itin-select" id="profTravelStyle"><option value="luxury">Luxury</option><option value="adventure">Adventure</option><option value="cultural">Cultural</option><option value="relaxation">Relaxation</option><option value="mixed">Mixed</option></select></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Cabin Class</label><select class="itin-select" id="profCabin"><option value="economy">Economy</option><option value="business">Business</option><option value="first">First Class</option><option value="private">Private Jet</option></select></div><div class="itin-field"><label class="itin-label">Dietary</label><input class="itin-input" id="profDiet" placeholder="e.g. Vegetarian, None"></div></div>
      <div class="itin-field"><label class="itin-label">Past Travel Experiences</label><textarea class="itin-textarea" id="profPastTravel" placeholder="e.g. Visited 30+ countries, loves beach holidays..."></textarea></div>

      <div class="profile-section-title">⚽ Sport</div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Favourite Sports</label><input class="itin-input" id="profSports" placeholder="e.g. Cricket, F1, Golf"></div><div class="itin-field"><label class="itin-label">Participation</label><select class="itin-select" id="profSportType"><option value="spectator">Spectator</option><option value="participant">Participant</option><option value="both">Both</option></select></div></div>
      <div class="itin-field"><label class="itin-label">Dream Sport Experiences</label><textarea class="itin-textarea" id="profSportDream" placeholder="e.g. IPL finals, Wimbledon, F1 paddock access..."></textarea></div>

      <div class="profile-section-title">🎵 Music</div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Favourite Genres</label><input class="itin-input" id="profMusicGenre" placeholder="e.g. Bollywood, EDM, Classical"></div><div class="itin-field"><label class="itin-label">Favourite Artists</label><input class="itin-input" id="profMusicArtist" placeholder="e.g. Coldplay, AR Rahman"></div></div>
      <div class="itin-field"><label class="itin-label">Music Experiences</label><textarea class="itin-textarea" id="profMusicExp" placeholder="e.g. Intimate concerts, NH7 Weekender, live classical..."></textarea></div>

      <div class="profile-section-title">🎪 Festivals & Events</div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Festival Types</label><input class="itin-input" id="profFestivals" placeholder="e.g. Music, cultural, food festivals"></div><div class="itin-field"><label class="itin-label">Events Attended</label><input class="itin-input" id="profEvents" placeholder="e.g. Sunburn, Lollapalooza, Holi"></div></div>
      <div class="itin-field"><label class="itin-label">Dream Festival / Event</label><textarea class="itin-textarea" id="profFestDream" placeholder="e.g. Burning Man, Tomorrowland, Glastonbury..."></textarea></div>

      <div class="profile-section-title">🕉️ Spiritual</div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Spiritual Interests</label><input class="itin-input" id="profSpiritual" placeholder="e.g. Yoga, Meditation, Pilgrimage"></div><div class="itin-field"><label class="itin-label">Sacred Places Visited</label><input class="itin-input" id="profSacred" placeholder="e.g. Varanasi, Rishikesh, Vatican"></div></div>
      <div class="itin-field"><label class="itin-label">Spiritual Goals</label><textarea class="itin-textarea" id="profSpiritDream" placeholder="e.g. Kailash Yatra, Vipassana, Kumbh Mela..."></textarea></div>

      <div class="profile-section-title">📝 Additional Notes</div>
      <div class="itin-field"><label class="itin-label">Any other requirements</label><textarea class="itin-textarea" id="profNotes" placeholder="e.g. Wheelchair access, anniversary trip, corporate gifting..."></textarea></div>
      <button class="itin-btn" id="profBtn" onclick="buildProfile()">Build Client Profile</button>
    </div>
    <div id="profLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:20px;width:200px;margin-bottom:14px"></div><div class="skel-line" style="height:14px;width:100%"></div></div></div>
    <div id="profResult"></div>
  </div>

  <!-- COST PLAN TAB -->
  <div id="costplanTab" class="tab-content">
    <div class="exp-form">
      <div style="color:#A09890;font-size:13px;margin-bottom:20px;line-height:1.7">Generate a complete cost breakdown and day-by-day execution plan. You can plan a single domain experience or combine multiple domains into one trip.</div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Client Name</label><input class="itin-input" id="cpName" placeholder="Client name"></div><div class="itin-field"><label class="itin-label">Destination</label><input class="itin-input" id="cpDest" placeholder="e.g. Dubai, Paris, Goa"></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Start Date</label><input class="itin-input" type="date" id="cpStart"></div><div class="itin-field"><label class="itin-label">End Date</label><input class="itin-input" type="date" id="cpEnd"></div></div>
      <div class="itin-row"><div class="itin-field"><label class="itin-label">Number of People</label><input class="itin-input" type="number" id="cpPeople" value="2" min="1" max="50"></div><div class="itin-field"><label class="itin-label">Budget Level</label><select class="itin-select" id="cpBudget"><option value="mid">Mid Range</option><option value="luxury" selected>Luxury</option><option value="ultra">Ultra Luxury</option></select></div></div>
      <div class="itin-label" style="margin-bottom:10px;font-size:10px;color:#6B6560;text-transform:uppercase;letter-spacing:0.1em">Select Experience Domains</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:16px">
        <div id="cpd_sport" onclick="toggleCPDomain('sport')" style="background:#1A1A1A;border:0.5px solid #2A2A2A;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all 0.18s"><div style="font-size:22px;margin-bottom:4px">⚽</div><div style="font-size:10px;color:#6B6560;text-transform:uppercase;letter-spacing:0.06em">Sport</div></div>
        <div id="cpd_travel" onclick="toggleCPDomain('travel')" style="background:#1A1A1A;border:0.5px solid #CBB38E;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all 0.18s;background:#1E1A12"><div style="font-size:22px;margin-bottom:4px">✈️</div><div style="font-size:10px;color:#CBB38E;text-transform:uppercase;letter-spacing:0.06em">Travel</div></div>
        <div id="cpd_music" onclick="toggleCPDomain('music')" style="background:#1A1A1A;border:0.5px solid #2A2A2A;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all 0.18s"><div style="font-size:22px;margin-bottom:4px">🎵</div><div style="font-size:10px;color:#6B6560;text-transform:uppercase;letter-spacing:0.06em">Music</div></div>
        <div id="cpd_festivals" onclick="toggleCPDomain('festivals')" style="background:#1A1A1A;border:0.5px solid #2A2A2A;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all 0.18s"><div style="font-size:22px;margin-bottom:4px">🎪</div><div style="font-size:10px;color:#6B6560;text-transform:uppercase;letter-spacing:0.06em">Festivals</div></div>
        <div id="cpd_events" onclick="toggleCPDomain('events')" style="background:#1A1A1A;border:0.5px solid #2A2A2A;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all 0.18s"><div style="font-size:22px;margin-bottom:4px">🎭</div><div style="font-size:10px;color:#6B6560;text-transform:uppercase;letter-spacing:0.06em">Events</div></div>
        <div id="cpd_spiritual" onclick="toggleCPDomain('spiritual')" style="background:#1A1A1A;border:0.5px solid #2A2A2A;border-radius:8px;padding:12px;text-align:center;cursor:pointer;transition:all 0.18s"><div style="font-size:22px;margin-bottom:4px">🕉️</div><div style="font-size:10px;color:#6B6560;text-transform:uppercase;letter-spacing:0.06em">Spiritual</div></div>
      </div>
      <div class="itin-field"><label class="itin-label">Experience Details</label><textarea class="itin-textarea" id="cpDetails" placeholder="e.g. VIP tickets to IPL final, private Coldplay concert experience, Kumbh Mela pilgrimage, Tomorrowland festival, spa retreat..."></textarea></div>
      <button class="itin-btn" id="cpBtn" onclick="buildCostPlan()">Generate Cost Plan & Execution Schedule</button>
    </div>
    <div id="cpLoading" style="display:none"><div class="skel"><div class="skel-line" style="height:20px;width:200px;margin-bottom:14px"></div><div class="skel-line" style="height:14px;width:100%"></div></div></div>
    <div id="cpResult"></div>
  </div>

</div>
<script>
const cities=[{city:"Delhi",code:"DEL",country:"India",type:"both"},{city:"Mumbai",code:"BOM",country:"India",type:"both"},{city:"Bangalore",code:"BLR",country:"India",type:"both"},{city:"Goa",code:"GOI",country:"India",type:"both"},{city:"Chennai",code:"MAA",country:"India",type:"both"},{city:"Hyderabad",code:"HYD",country:"India",type:"both"},{city:"Kolkata",code:"CCU",country:"India",type:"both"},{city:"Jaipur",code:"JAI",country:"India",type:"both"},{city:"Pune",code:"PNQ",country:"India",type:"both"},{city:"Ahmedabad",code:"AMD",country:"India",type:"both"},{city:"Paris",code:"CDG",country:"France",type:"international"},{city:"London",code:"LHR",country:"United Kingdom",type:"international"},{city:"Dubai",code:"DXB",country:"UAE",type:"international"},{city:"New York",code:"JFK",country:"USA",type:"international"},{city:"Singapore",code:"SIN",country:"Singapore",type:"international"},{city:"Tokyo",code:"HND",country:"Japan",type:"international"},{city:"Bangkok",code:"BKK",country:"Thailand",type:"international"},{city:"Sydney",code:"SYD",country:"Australia",type:"international"},{city:"Frankfurt",code:"FRA",country:"Germany",type:"international"},{city:"Toronto",code:"YYZ",country:"Canada",type:"international"}];
let mode='domestic',tripType='oneway',cabinClass='economy',originCode='',destCode='',pax=1,driveType='chauffeur';
let currentDestCity='';
let cpDomains=['travel'];
const today=new Date().toISOString().split('T')[0];
document.getElementById('dateInput').min=today;document.getElementById('dateInput').value=today;
document.getElementById('returnDateInput').min=today;
document.getElementById('itinStart').min=today;document.getElementById('itinEnd').min=today;
document.getElementById('carPickup').min=today;document.getElementById('carPickup').value=today;document.getElementById('carReturn').min=today;
document.getElementById('hotelCheckin').min=today;document.getElementById('hotelCheckin').value=today;document.getElementById('hotelCheckout').min=today;
document.getElementById('cpStart').min=today;document.getElementById('cpEnd').min=today;
document.getElementById('expStart').min=today;document.getElementById('expEnd').min=today;

const tabIds=['flightsTab','hotelsTab','carsTab','restaurantsTab','sightseeingTab','gemsTab','experiencesTab','itineraryTab','profileTab','costplanTab'];
const tabKeys=['flights','hotels','cars','restaurants','sightseeing','gems','experiences','itinerary','profile','costplan'];

function switchTab(tab){
  tabIds.forEach(function(id){document.getElementById(id).classList.remove('active');});
  document.getElementById(tab+'Tab').classList.add('active');
  document.querySelectorAll('.main-tab').forEach(function(el,i){el.classList.toggle('active',tabKeys[i]===tab);});
}

function toggleCPDomain(d){
  const idx=cpDomains.indexOf(d);
  if(idx>-1)cpDomains.splice(idx,1);
  else cpDomains.push(d);
  const el=document.getElementById('cpd_'+d);
  const selected=cpDomains.includes(d);
  el.style.borderColor=selected?'#CBB38E':'#2A2A2A';
  el.style.background=selected?'#1E1A12':'#1A1A1A';
  el.querySelector('div:last-child').style.color=selected?'#CBB38E':'#6B6560';
}

function setMode(m){mode=m;originCode='';destCode='';document.getElementById('originInput').value='';document.getElementById('destInput').value='';document.getElementById('domBtn').classList.toggle('active',m==='domestic');document.getElementById('intlBtn').classList.toggle('active',m==='international');document.getElementById('results').innerHTML='';document.getElementById('flightCarSection').style.display='none';}
function setTrip(t){tripType=t;document.getElementById('oneWayBtn').classList.toggle('active',t==='oneway');document.getElementById('roundBtn').classList.toggle('active',t==='round');document.getElementById('returnCard').classList.toggle('show',t==='round');}
function setCabin(c){cabinClass=c;['econ','premEcon','biz','first'].forEach(function(id){document.getElementById(id+'Btn').classList.remove('active');});document.getElementById({economy:'econ',premium_economy:'premEcon',business:'biz',first:'first'}[c]+'Btn').classList.add('active');}
function setDrive(d){driveType=d;document.getElementById('chauffeurBtn').classList.toggle('active',d==='chauffeur');document.getElementById('bothDriveBtn').classList.toggle('active',d==='both');}
function filterCities(field){const inputEl=document.getElementById(field==='origin'?'originInput':'destInput');const ddEl=document.getElementById(field==='origin'?'originDD':'destDD');const val=inputEl.value.toLowerCase();const matches=cities.filter(c=>(c.type===mode||c.type==='both')&&(c.city.toLowerCase().includes(val)||c.code.toLowerCase().includes(val))).slice(0,6);if(!matches.length){ddEl.style.display='none';return;}ddEl.innerHTML=matches.map(c=>'<div class="dd-item" onmousedown="selectCity('+"'"+field+"',"+"'"+c.code+"',"+"'"+c.city+"'"+')">'+'<span><span class="dd-city">'+c.city+'</span><span class="dd-country">'+c.country+'</span></span><span class="dd-code">'+c.code+'</span></div>').join('');ddEl.style.display='block';}
function selectCity(field,code,city){if(field==='origin'){originCode=code;document.getElementById('originInput').value=city+' ('+code+')';hideDD('origin');}else{destCode=code;document.getElementById('destInput').value=city+' ('+code+')';hideDD('dest');}}
function hideDD(field){document.getElementById(field==='origin'?'originDD':'destDD').style.display='none';}
function swapCities(){const oVal=document.getElementById('originInput').value,dVal=document.getElementById('destInput').value;document.getElementById('originInput').value=dVal;document.getElementById('destInput').value=oVal;const tmp=originCode;originCode=destCode;destCode=tmp;}
function changePax(d){pax=Math.max(1,Math.min(9,pax+d));document.getElementById('paxNum').textContent=pax;}
function showErr(msg){const b=document.getElementById('errBox');b.textContent=msg;b.style.display='block';}
function hideErr(){document.getElementById('errBox').style.display='none';}

function getCrowdDots(level){const levels={low:1,quiet:1,'very-quiet':1,moderate:2,busy:3,high:3};const filled=levels[(level||'').toLowerCase()]||2;const type=filled===1?'quiet':filled===2?'moderate':'busy';let d='';for(let i=0;i<3;i++)d+='<div class="crowd-dot'+(i<filled?' active '+type:'')+'"></div>';return d;}

function renderCarStrip(cars,containerId){
  let html='';
  cars.slice(0,3).forEach(function(c,i){
    const bookUrl='https://www.google.com/search?q='+encodeURIComponent(c.brand+' '+c.model+' chauffeur '+currentDestCity);
    html+='<div class="car-strip"><div class="car-strip-left">'+(i===0?'<div class="featured-bar">FEATURED</div><br>':'')+'<div class="car-strip-model">'+c.model+'</div><div class="car-strip-brand">'+c.brand+'</div><div class="car-strip-tags"><span class="car-tag">'+c.category+'</span><span class="car-tag">'+c.seats+' Seats</span><span class="car-tag gold">👤 Chauffeur</span></div><div class="car-strip-desc">'+c.description+'</div></div><div class="car-strip-right"><div class="car-strip-price">Rs.'+c.pricePerDay.toLocaleString('en-IN')+'</div><div class="car-strip-label">per day</div><div class="car-strip-cities">';
    c.cities.slice(0,3).forEach(function(ct){html+='<span class="city-dot">'+ct+'</span>';});
    html+='</div><a href="'+bookUrl+'" target="_blank" class="book-btn" style="font-size:11px;padding:7px 14px">Book</a></div></div>';
  });
  document.getElementById(containerId).innerHTML=html;
}

async function doSearch(){
  hideErr();
  if(!originCode){showErr('Please select a departure city.');return;}
  if(!destCode){showErr('Please select a destination city.');return;}
  if(originCode===destCode){showErr('Origin and destination cannot be the same.');return;}
  const date=document.getElementById('dateInput').value;
  if(!date){showErr('Please select a travel date.');return;}
  const returnDate=document.getElementById('returnDateInput').value;
  if(tripType==='round'&&!returnDate){showErr('Please select a return date.');return;}
  const btn=document.getElementById('searchBtn');btn.disabled=true;btn.textContent='Searching...';
  document.getElementById('loading').style.display='block';document.getElementById('results').innerHTML='';document.getElementById('flightCarSection').style.display='none';
  const oCity=cities.find(c=>c.code===originCode);const dCity=cities.find(c=>c.code===destCode);
  currentDestCity=dCity?dCity.city:'';
  try{
    const resp=await fetch('/search',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({origin:originCode,destination:destCode,date,returnDate,pax,tripType,cabinClass})});
    const data=await resp.json();
    if(!data.flights||!data.flights.length){showErr('No flights found.');return;}
    renderResults(data.flights,oCity,dCity,date);
    loadFlightCars(dCity?dCity.city:'',date);
  }catch(e){showErr('Could not fetch flights.');}
  finally{btn.disabled=false;btn.textContent='Search Flights';document.getElementById('loading').style.display='none';}
}

async function loadFlightCars(city,date){
  if(!city)return;
  document.getElementById('flightCarSection').style.display='block';
  document.getElementById('flightCarLoading').style.display='block';
  document.getElementById('flightCarResults').innerHTML='';
  try{const resp=await fetch('/cars',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({city,category:'all',pickup:date,ret:date,driveType:'chauffeur'})});const data=await resp.json();if(data.cars&&data.cars.length)renderCarStrip(data.cars,'flightCarResults');}catch(e){}
  finally{document.getElementById('flightCarLoading').style.display='none';}
}

function renderResults(flights,oCity,dCity,date){
  const dateStr=new Date(date+'T00:00:00').toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  const cabinLabel={economy:'Economy',premium_economy:'Premium Economy',business:'Business',first:'First Class'}[cabinClass];
  let html='<div class="results-header"><div><span class="route-label">'+oCity.city+' to '+dCity.city+'</span><span style="font-size:13px;color:#6B6560;margin-left:10px">'+dateStr+' · '+pax+' pax · '+cabinLabel+'</span></div><span style="font-size:13px;color:#6B6560">'+flights.length+' options</span></div>';
  flights.forEach(function(f,i){
    const total=(f.price+f.taxes)*pax;
    const bookingUrl='https://www.google.com/flights?q=flights+from+'+originCode+'+to+'+destCode+'+on+'+date;
    html+='<div class="flight-card'+(i===0?' best':'')+'" id="fc'+i+'"><div class="flight-main" onclick="toggleCard('+i+')">'+(i===0?'<div class="best-badge">BEST</div>':'')+'<div class="flight-info"><div class="airline-row"><span class="airline-name">'+f.airline+'</span><span class="flight-no">'+f.flightNo+'</span></div><div class="time-row"><span class="time">'+f.departure+'</span><div class="connector"><div class="line"></div><span class="dur">'+f.duration+'</span><div class="line"></div></div><span class="time">'+f.arrival+'</span></div><div class="stops-row"><span class="stops-txt">'+f.stops+'</span>'+(f.refundable?'<span class="ref-badge">Refundable</span>':'')+'</div></div><div class="price-col"><div class="price-num">Rs.'+f.price.toLocaleString('en-IN')+'</div><div class="price-sub">per person</div></div><div class="chevron" id="chev'+i+'">▾</div></div><div class="flight-detail" id="fd'+i+'" style="display:none"><div class="detail-grid"><div><div class="detail-lbl">Aircraft</div><div class="detail-val">'+f.aircraft+'</div></div><div><div class="detail-lbl">Class</div><div class="detail-val">'+f.cabinClass+'</div></div><div><div class="detail-lbl">Baggage</div><div class="detail-val">'+f.baggage+'</div></div><div><div class="detail-lbl">Meal</div><div class="detail-val">'+f.meal+'</div></div><div><div class="detail-lbl">Seat Pitch</div><div class="detail-val">'+f.seatPitch+'</div></div><div><div class="detail-lbl">Wi-Fi</div><div class="detail-val">'+f.wifi+'</div></div></div><div class="detail-footer"><div><span style="font-size:13px;color:#6B6560">Total: </span><span class="total-amt">Rs.'+total.toLocaleString('en-IN')+'</span></div><a href="'+bookingUrl+'" target="_blank" class="book-btn">Book Now</a></div></div></div>';
  });
  document.getElementById('results').innerHTML=html+'<p class="disclaimer">Prices are indicative.</p>';
}
function toggleCard(i){const fd=document.getElementById('fd'+i),ch=document.getElementById('chev'+i);const open=fd.style.display==='block';fd.style.display=open?'none':'block';ch.style.transform=open?'none':'rotate(180deg)';}

async function searchHotels(){
  const city=document.getElementById('hotelCity').value.trim();if(!city){alert('Please enter a city.');return;}
  const checkin=document.getElementById('hotelCheckin').value;const checkout=document.getElementById('hotelCheckout').value;
  if(!checkin||!checkout){alert('Please select dates.');return;}
  const btn=document.getElementById('hotelSearchBtn');btn.disabled=true;btn.textContent='Finding...';
  document.getElementById('hotelLoading').style.display='block';document.getElementById('hotelResults').innerHTML='';
  try{
    const resp=await fetch('/hotels',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({city,category:document.getElementById('hotelCategory').value,checkin,checkout,guests:document.getElementById('hotelGuests').value,budget:document.getElementById('hotelBudget').value,location:document.getElementById('hotelLocation').value,amenity:document.getElementById('hotelAmenity').value})});
    const data=await resp.json();if(!data.hotels||!data.hotels.length){alert('Could not find hotels.');return;}
    const nights=Math.max(1,Math.round((new Date(checkout)-new Date(checkin))/(1000*60*60*24)));
    let html='<div style="display:flex;justify-content:space-between;margin-bottom:20px"><span style="font-size:15px;font-weight:500">Hotels in '+city+'</span><span style="font-size:13px;color:#6B6560">'+data.hotels.length+' options</span></div>';
    data.hotels.forEach(function(h,i){
      const stars='★'.repeat(h.stars)+'☆'.repeat(5-h.stars);const total=h.pricePerNight*nights;
      const bookUrl='https://www.google.com/travel/hotels/'+encodeURIComponent(city)+'?q='+encodeURIComponent(h.name);
      html+='<div class="hotel-card'+(i===0?' featured':'')+'">';
      html+='<div class="hotel-header"><div>'+(i===0?'<div class="featured-bar">TOP PICK</div><br>':'')+'<div class="hotel-name">'+h.name+'</div><div class="hotel-type">'+h.type+'</div><div class="hotel-tags"><span class="hotel-tag">📍 '+h.location+'</span><span class="hotel-tag">'+h.distanceFromCenter+'</span>'+(h.topAmenity?'<span class="hotel-tag gold">✦ '+h.topAmenity+'</span>':'')+'</div></div><div class="hotel-right"><div class="hotel-stars">'+stars+'</div><div class="hotel-price">Rs.'+h.pricePerNight.toLocaleString('en-IN')+'</div><div class="hotel-price-label">per night</div><div class="hotel-review">⭐ '+h.reviewScore+'/10</div></div></div>';
      html+='<div class="hotel-body"><div class="hotel-desc">'+h.description+'</div><div style="color:#6B6560;font-size:12px;margin-bottom:14px">📍 '+h.address+'</div><div class="amenities-grid">';
      h.amenities.forEach(function(a){html+='<div class="amenity">'+a+'</div>';});
      html+='</div><div class="room-items">';
      h.rooms.forEach(function(r){html+='<div class="room-item"><div><div class="room-name">'+r.type+'</div><div class="room-desc">'+r.description+'</div></div><div class="room-price">Rs.'+r.pricePerNight.toLocaleString('en-IN')+'/night</div></div>';});
      html+='</div><div class="hotel-footer"><div style="color:#6B6560;font-size:13px">'+nights+' nights: Rs.'+total.toLocaleString('en-IN')+'</div><a href="'+bookUrl+'" target="_blank" class="book-btn">Book on Google Hotels</a></div></div></div>';
    });
    document.getElementById('hotelResults').innerHTML=html+'<p class="disclaimer">Prices are indicative.</p>';
  }catch(e){alert('Could not find hotels.');}
  finally{btn.disabled=false;btn.textContent='Find Hotels';document.getElementById('hotelLoading').style.display='none';}
}

async function searchCars(){
  const city=document.getElementById('carCity').value;const pickup=document.getElementById('carPickup').value;const ret=document.getElementById('carReturn').value;
  if(!pickup||!ret){alert('Please select dates.');return;}
  const btn=document.getElementById('carSearchBtn');btn.disabled=true;btn.textContent='Searching...';
  document.getElementById('carLoading').style.display='block';document.getElementById('carResults').innerHTML='';
  try{
    const resp=await fetch('/cars',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({city,category:document.getElementById('carCategory').value,pickup,ret,driveType})});
    const data=await resp.json();if(!data.cars||!data.cars.length){alert('Could not find cars.');return;}
    const days=Math.max(1,Math.round((new Date(ret)-new Date(pickup))/(1000*60*60*24)));
    let html='<div style="display:flex;justify-content:space-between;margin-bottom:20px"><span style="font-size:15px;font-weight:500">Luxury Cars in '+city+'</span><span style="font-size:13px;color:#6B6560">'+data.cars.length+' options</span></div>';
    data.cars.forEach(function(c,i){
      const total=c.pricePerDay*days;const bookUrl='https://www.google.com/search?q='+encodeURIComponent(c.brand+' '+c.model+' chauffeur '+city);
      html+='<div class="car-strip" style="'+(i===0?'border-color:#CBB38E;':'')+'">';
      html+='<div class="car-strip-left">'+(i===0?'<div class="featured-bar">FEATURED</div><br>':'')+'<div class="car-strip-model">'+c.model+'</div><div class="car-strip-brand">'+c.brand+'</div><div class="car-strip-tags"><span class="car-tag">'+c.category+'</span><span class="car-tag">'+c.seats+' Seats</span>'+(c.chauffeur?'<span class="car-tag gold">👤 Chauffeur</span>':'')+'</div><div class="car-strip-desc">'+c.description+'</div></div>';
      html+='<div class="car-strip-right"><div class="car-strip-price">Rs.'+c.pricePerDay.toLocaleString('en-IN')+'</div><div class="car-strip-label">per day</div><div style="color:#CBB38E;font-size:13px;font-weight:600;margin-bottom:8px">Rs.'+total.toLocaleString('en-IN')+' total</div><a href="'+bookUrl+'" target="_blank" class="book-btn" style="font-size:11px;padding:7px 14px">Book</a></div></div>';
    });
    document.getElementById('carResults').innerHTML=html+'<p class="disclaimer">Prices are indicative.</p>';
  }catch(e){alert('Could not find cars.');}
  finally{btn.disabled=false;btn.textContent='Find Luxury Cars';document.getElementById('carLoading').style.display='none';}
}

async function searchRestaurants(){
  const city=document.getElementById('restCity').value.trim();if(!city){alert('Please enter a city.');return;}
  const btn=document.getElementById('restSearchBtn');btn.disabled=true;btn.textContent='Finding...';
  document.getElementById('restLoading').style.display='block';document.getElementById('restResults').innerHTML='';
  try{
    const resp=await fetch('/restaurants',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({city,cuisine:document.getElementById('restCuisine').value,budget:document.getElementById('restBudget').value,ambience:document.getElementById('restAmbience').value,diet:document.getElementById('restDiet').value,dist:document.getElementById('restDist').value})});
    const data=await resp.json();if(!data.restaurants||!data.restaurants.length){alert('Could not find restaurants.');return;}
    let html='<div style="display:flex;justify-content:space-between;margin-bottom:20px"><span style="font-size:15px;font-weight:500">Restaurants in '+city+'</span><span style="font-size:13px;color:#6B6560">'+data.restaurants.length+' suggestions</span></div>';
    data.restaurants.forEach(function(r,i){
      const stars='★'.repeat(Math.round(r.rating))+'☆'.repeat(5-Math.round(r.rating));
      const mapsUrl='https://www.google.com/maps/search/'+encodeURIComponent(r.name+' '+city);
      html+='<div class="rest-card'+(i===0?' featured':'')+'">';
      html+='<div class="rest-header"><div>'+(i===0?'<div class="featured-bar">TOP PICK</div><br>':'')+'<div class="rest-name">'+r.name+'</div><div class="rest-cuisine">'+r.cuisine+'</div><div class="rest-tags"><span class="rest-tag">'+r.ambience+'</span><span class="rest-tag">'+r.distance+'</span>'+(r.dietary&&r.dietary!=='none'?'<span class="rest-tag gold">'+r.dietary+'</span>':'')+'</div></div><div class="rest-right"><div class="rest-stars">'+stars+'</div><div class="rest-price">'+r.priceRange+'</div><div class="rest-price-label">avg per person</div></div></div>';
      html+='<div class="rest-body"><div class="rest-desc">'+r.description+'</div><div style="color:#6B6560;font-size:12px;margin-bottom:14px">📍 '+r.address+'</div><div class="menu-title">🍴 Signature Dishes</div><div class="menu-items">';
      r.menuItems.forEach(function(m){html+='<div class="menu-item"><div class="menu-item-left"><div class="menu-item-name">'+m.name+'</div><div class="menu-item-desc">'+m.description+'</div>'+(m.tags&&m.tags.length?'<div class="menu-item-tags">'+m.tags.map(function(t){return'<span class="menu-item-tag">'+t+'</span>';}).join('')+'</div>':'')+'</div><div class="menu-item-price">Rs.'+m.price.toLocaleString('en-IN')+'</div></div>';});
      html+='</div><div class="rest-footer"><div style="color:#6B6560;font-size:12px">⏰ '+r.openHours+'</div><a href="'+mapsUrl+'" target="_blank" class="book-btn" style="font-size:11px;padding:7px 16px">Maps</a></div></div></div>';
    });
    document.getElementById('restResults').innerHTML=html+'<p class="disclaimer">AI-generated. Verify before visiting.</p>';
  }catch(e){alert('Could not find restaurants.');}
  finally{btn.disabled=false;btn.textContent='Find Restaurants';document.getElementById('restLoading').style.display='none';}
}

async function searchPlaces(type){
  const isGem=type==='gems';const city=document.getElementById(isGem?'gemCity':'sightCity').value.trim();
  if(!city){alert('Please enter a city.');return;}
  const loadId=isGem?'gemLoading':'sightLoading';const resId=isGem?'gemResults':'sightResults';const btnId=isGem?'gemSearchBtn':'sightSearchBtn';
  const btn=document.getElementById(btnId);btn.disabled=true;btn.textContent='Finding...';
  document.getElementById(loadId).style.display='block';document.getElementById(resId).innerHTML='';
  try{
    const resp=await fetch('/places',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({city,category:document.getElementById(isGem?'gemCategory':'sightCategory').value,budget:isGem?'any':document.getElementById('sightBudget').value,time:document.getElementById(isGem?'gemTime':'sightTime').value,crowd:isGem?document.getElementById('gemCrowd').value:'any',type})});
    const data=await resp.json();if(!data.places||!data.places.length){alert('Could not find places.');return;}
    let html='<div style="display:flex;justify-content:space-between;margin-bottom:20px"><span style="font-size:15px;font-weight:500">'+(isGem?'💎 Hidden Gems':'🏛️ Sightseeing')+' in '+city+'</span><span style="font-size:13px;color:#6B6560">'+data.places.length+' places</span></div>';
    data.places.forEach(function(p,i){
      const mapsUrl='https://www.google.com/maps/search/'+encodeURIComponent(p.name+' '+city);
      html+='<div class="place-card'+(i===0?(isGem?' gem':' featured'):'')+'">';
      html+='<div class="place-header"><div>';
      if(isGem)html+='<div class="gem-bar">HIDDEN GEM</div><br>';
      else if(i===0)html+='<div class="featured-bar">MUST VISIT</div><br>';
      html+='<div class="place-name'+(isGem?' gem-name':'')+'">'+p.name+'</div><div class="place-category">'+p.category+'</div><div class="place-tags"><span class="place-tag">'+p.distanceFromCenter+'</span><span class="place-tag '+(isGem?'purple':'gold')+'">⏰ '+p.bestTime+'</span></div></div><div style="text-align:right"><div style="color:'+(isGem?'#B8A9D9':'#CBB38E')+';font-size:16px;font-weight:700">'+p.entryPrice+'</div></div></div>';
      html+='<div class="place-body"><div class="place-desc">'+p.description+'</div><div class="place-info-grid"><div class="place-info-item"><div class="place-info-label">📍 Distance</div><div class="place-info-value">'+p.distanceFromCenter+'</div></div><div class="place-info-item"><div class="place-info-label">⏰ Best Time</div><div class="place-info-value">'+p.bestTime+'</div></div><div class="place-info-item"><div class="place-info-label">⏱ Duration</div><div class="place-info-value">'+p.duration+'</div></div><div class="place-info-item"><div class="place-info-label">👥 Crowd</div><div class="place-info-value">'+p.crowdLevel+'</div></div></div>';
      html+='<div class="insider-tip'+(isGem?' gem-tip':'')+'"><div class="insider-label'+(isGem?' gem-label':'')+'">'+(isGem?'💎 Secret':'💡 Tip')+'</div><div class="insider-text">'+p.insiderTip+'</div></div>';
      html+='<div class="place-footer"><div class="crowd-bar"><span class="crowd-label">Crowd:</span><div class="crowd-dots">'+getCrowdDots(p.crowdLevel)+'</div></div><a href="'+mapsUrl+'" target="_blank" class="book-btn" style="font-size:11px;padding:7px 16px">Maps</a></div></div></div>';
    });
    document.getElementById(resId).innerHTML=html+'<p class="disclaimer">AI-generated. Verify before visiting.</p>';
  }catch(e){alert('Could not find places.');}
  finally{btn.disabled=false;btn.textContent=isGem?'Discover Hidden Gems':'Find Sightseeing Spots';document.getElementById(loadId).style.display='none';}
}

async function buildExperiences(){
  const dest=document.getElementById('expDest').value.trim();
  if(!dest){alert('Please enter a destination.');return;}
  const start=document.getElementById('expStart').value;
  const end=document.getElementById('expEnd').value;
  const people=document.getElementById('expPeople').value;
  const budget=document.getElementById('expBudget').value;
  const interests=document.getElementById('expInterests').value;
  const btn=document.getElementById('expBtn');btn.disabled=true;btn.textContent='Discovering Experiences...';
  document.getElementById('expLoading').style.display='block';document.getElementById('expResults').innerHTML='';
  try{
    const resp=await fetch('/experiences',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({dest,start,end,people,budget,interests})});
    const data=await resp.json();
    if(data.error){alert('Could not load experiences.');return;}
    document.getElementById('expResults').innerHTML=data.html;
  }catch(e){alert('Could not load experiences.');}
  finally{btn.disabled=false;btn.textContent='Discover All Experiences';document.getElementById('expLoading').style.display='none';}
}

async function buildItinerary(){
  const from=document.getElementById('itinFrom').value.trim();const dest=document.getElementById('itinDest').value.trim();
  const start=document.getElementById('itinStart').value;const end=document.getElementById('itinEnd').value;
  if(!from||!dest||!start||!end){alert('Please fill in all required fields.');return;}
  const btn=document.getElementById('itinBtn');btn.disabled=true;btn.textContent='Building...';
  document.getElementById('itinLoading').style.display='block';document.getElementById('itinResult').innerHTML='';
  try{
    const resp=await fetch('/itinerary',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({from,dest,start,end,travellers:document.getElementById('itinPax').value,budget:document.getElementById('itinBudget').value,style:document.getElementById('itinStyle').value,hotel:document.getElementById('itinHotel').value,notes:document.getElementById('itinNotes').value.trim()})});
    const data=await resp.json();if(data.error){alert('Could not build itinerary.');return;}
    document.getElementById('itinResult').innerHTML=data.html;
  }catch(e){alert('Could not build itinerary.');}
  finally{btn.disabled=false;btn.textContent='Build My Complete Trip';document.getElementById('itinLoading').style.display='none';}
}

async function buildProfile(){
  const name=document.getElementById('profName').value.trim();
  if(!name){alert('Please enter the client name.');return;}
  const btn=document.getElementById('profBtn');btn.disabled=true;btn.textContent='Building Profile...';
  document.getElementById('profLoading').style.display='block';document.getElementById('profResult').innerHTML='';
  try{
    const resp=await fetch('/profile',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,age:document.getElementById('profAge').value,location:document.getElementById('profLocation').value,occupation:document.getElementById('profOccupation').value,budget:document.getElementById('profBudget').value,group:document.getElementById('profGroup').value,destinations:document.getElementById('profDestinations').value,travelStyle:document.getElementById('profTravelStyle').value,cabin:document.getElementById('profCabin').value,diet:document.getElementById('profDiet').value,pastTravel:document.getElementById('profPastTravel').value,sports:document.getElementById('profSports').value,sportType:document.getElementById('profSportType').value,sportDream:document.getElementById('profSportDream').value,musicGenre:document.getElementById('profMusicGenre').value,musicArtist:document.getElementById('profMusicArtist').value,musicExp:document.getElementById('profMusicExp').value,festivals:document.getElementById('profFestivals').value,events:document.getElementById('profEvents').value,festDream:document.getElementById('profFestDream').value,spiritual:document.getElementById('profSpiritual').value,sacred:document.getElementById('profSacred').value,spiritDream:document.getElementById('profSpiritDream').value,notes:document.getElementById('profNotes').value})});
    const data=await resp.json();if(data.error){alert('Could not build profile.');return;}
    document.getElementById('profResult').innerHTML=data.html;
  }catch(e){alert('Could not build profile.');}
  finally{btn.disabled=false;btn.textContent='Build Client Profile';document.getElementById('profLoading').style.display='none';}
}

function downloadProfilePDF(){
  const content=document.getElementById('profResult');
  if(!content||!content.innerHTML){alert('Please build a profile first.');return;}
  const win=window.open('','_blank');
  win.document.write('<html><head><title>Gleefy Client Profile</title><style>body{font-family:Arial,sans-serif;padding:40px;color:#333;max-width:800px;margin:0 auto;}h1{color:#9B7E4E;}h2{color:#9B7E4E;font-size:18px;border-bottom:1px solid #eee;padding-bottom:8px;margin-top:24px;}p,li{font-size:14px;line-height:1.7;color:#555;}.section{margin-bottom:20px;padding:14px;background:#f9f9f9;border-radius:6px;}.label{font-size:11px;color:#999;text-transform:uppercase;letter-spacing:0.08em;}.value{font-size:14px;color:#333;margin-top:3px;}</style></head><body>');
  win.document.write('<h1>Gleefy — Client Profile</h1>');
  win.document.write('<div>'+content.innerText.replace(/\n/g,'<br>')+'</div>');
  win.document.write('<p style="margin-top:40px;font-size:11px;color:#999;">Generated by Gleefy</p></body></html>');
  win.document.close();setTimeout(function(){win.print();},500);
}

async function buildCostPlan(){
  const dest=document.getElementById('cpDest').value.trim();
  const start=document.getElementById('cpStart').value;const end=document.getElementById('cpEnd').value;
  if(!dest||!start||!end){alert('Please fill in destination and dates.');return;}
  if(cpDomains.length===0){alert('Please select at least one domain.');return;}
  const btn=document.getElementById('cpBtn');btn.disabled=true;btn.textContent='Generating Plan...';
  document.getElementById('cpLoading').style.display='block';document.getElementById('cpResult').innerHTML='';
  try{
    const resp=await fetch('/costplan',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:document.getElementById('cpName').value,dest,start,end,people:document.getElementById('cpPeople').value,budget:document.getElementById('cpBudget').value,domains:cpDomains,details:document.getElementById('cpDetails').value})});
    const data=await resp.json();if(data.error){alert('Could not generate cost plan.');return;}
    document.getElementById('cpResult').innerHTML=data.html;
  }catch(e){alert('Could not generate cost plan.');}
  finally{btn.disabled=false;btn.textContent='Generate Cost Plan & Execution Schedule';document.getElementById('cpLoading').style.display='none';}
}
</script>
</body>
</html>`);
});

app.post("/search", async (req, res) => {
  const{origin,destination,date,returnDate,pax,tripType,cabinClass}=req.body;
  const cabinMap={economy:1,premium_economy:2,business:3,first:4};
  const cabinLabel={1:"Economy",2:"Premium Economy",3:"Business",4:"First Class"};
  const baggageMap={1:"15kg+7kg",2:"20kg+10kg",3:"32kg+15kg",4:"40kg+18kg"};
  const seatMap={1:"29in",2:"34in",3:"60in",4:"78in"};
  const cabinNum=cabinMap[cabinClass]||1;
  try{
    let url="https://serpapi.com/search.json?engine=google_flights&departure_id="+origin+"&arrival_id="+destination+"&outbound_date="+date+"&adults="+pax+"&currency=INR&hl=en&gl=in&type="+(tripType==='round'?1:2)+"&travel_class="+cabinNum+"&api_key="+process.env.SERPAPI_KEY;
    if(tripType==='round'&&returnDate)url+="&return_date="+returnDate;
    const response=await fetch(url);const data=await response.json();
    const rawFlights=data.best_flights||data.other_flights||[];
    if(!rawFlights.length)return res.status(500).json({error:"No flights found"});
    const flights=rawFlights.slice(0,4).map((item,i)=>{
      const leg=item.flights&&item.flights[0];const price=item.price||0;
      return{airline:leg?leg.airline||"Unknown":"Unknown",flightNo:leg?leg.flight_number||"N/A":"N/A",departure:leg&&leg.departure_airport?leg.departure_airport.time.split(" ")[1]:"00:00",arrival:leg&&leg.arrival_airport?leg.arrival_airport.time.split(" ")[1]:"00:00",duration:Math.floor((item.total_duration||0)/60)+"h "+((item.total_duration||0)%60)+"m",stops:item.flights&&item.flights.length===1?"Non-stop":(item.flights?item.flights.length-1:0)+" stop",price,taxes:Math.round(price*0.2),aircraft:leg?leg.airplane||"Standard":"Standard",cabinClass:cabinLabel[cabinNum],baggage:baggageMap[cabinNum],meal:cabinNum>=2?"Complimentary":i===0?"Complimentary":"Buy on board",seatPitch:seatMap[cabinNum],wifi:cabinNum>=2?"Available":i<2?"Available":"Not available",refundable:cabinNum>=3};
    });
    res.json({flights});
  }catch(err){console.error(err);res.status(500).json({error:"Failed"});}
});

app.post("/hotels", async (req, res) => {
  const{city,category,checkin,checkout,guests,budget,location,amenity}=req.body;
  const budgetLabel={budget:"under Rs.3000",mid:"Rs.3000-8000",luxury:"Rs.8000-25000",ultra:"Rs.25000+"}[budget]||"luxury";
  const prompt=`5 hotels for ${city}. category=${category}, budget=${budgetLabel}, location=${location}, amenity=${amenity}, guests=${guests}.
JSON only: {"hotels":[{"name":"real hotel","type":"5 Star","stars":5,"pricePerNight":15000,"reviewScore":9.2,"reviewCount":"1,245","address":"area","distanceFromCenter":"1km","location":"City Center","topAmenity":"Pool","description":"2 sentences","amenities":["Pool","Spa","Gym","Fine Dining","Concierge","Valet","Butler","Rooftop"],"rooms":[{"type":"Deluxe","description":"king bed city view","pricePerNight":12000},{"type":"Suite","description":"panoramic views","pricePerNight":18000},{"type":"Presidential","description":"private terrace","pricePerNight":45000}]}]}`;
  try{
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"Hotel expert. JSON only."},{role:"user",content:prompt}],temperature:0.7,max_tokens:2500,response_format:{type:"json_object"}})});
    const d=await r.json();res.json({hotels:JSON.parse(d.choices?.[0]?.message?.content||"{}").hotels||[]});
  }catch(e){res.status(500).json({error:"Failed"});}
});

app.post("/cars", async (req, res) => {
  const{city,category,driveType}=req.body;
  const prompt=`5 luxury cars for ${city}, category=${category}. ${driveType==='chauffeur'?'Chauffeur only.':'Mix chauffeur and self-drive.'}
JSON only: {"cars":[{"brand":"Mercedes-Benz","model":"S-Class","category":"Luxury Sedan","pricePerDay":15000,"seats":"4","transmission":"Automatic","fuel":"Petrol","chauffeur":true,"description":"desc","cities":["Mumbai","Delhi"]},{"brand":"Rolls-Royce","model":"Ghost","category":"Ultra Luxury","pricePerDay":85000,"seats":"4","transmission":"Automatic","fuel":"Petrol","chauffeur":true,"description":"desc","cities":["Mumbai"]},{"brand":"BMW","model":"7 Series","category":"Luxury Sedan","pricePerDay":12000,"seats":"4","transmission":"Automatic","fuel":"Petrol","chauffeur":true,"description":"desc","cities":["Mumbai","Delhi"]},{"brand":"Range Rover","model":"Autobiography","category":"Luxury SUV","pricePerDay":18000,"seats":"5","transmission":"Automatic","fuel":"Diesel","chauffeur":true,"description":"desc","cities":["Mumbai","Delhi"]},{"brand":"Mercedes-Benz","model":"V-Class","category":"Luxury Van","pricePerDay":14000,"seats":"7","transmission":"Automatic","fuel":"Diesel","chauffeur":true,"description":"desc","cities":["Mumbai","Delhi"]}]}`;
  try{
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"Car expert. JSON only."},{role:"user",content:prompt}],temperature:0.7,max_tokens:1500,response_format:{type:"json_object"}})});
    const d=await r.json();res.json({cars:JSON.parse(d.choices?.[0]?.message?.content||"{}").cars||[]});
  }catch(e){res.status(500).json({error:"Failed"});}
});

app.post("/restaurants", async (req, res) => {
  const{city,cuisine,budget,ambience,diet,dist}=req.body;
  const budgetLabel={budget:"under Rs.500",mid:"Rs.500-2000",fine:"Rs.2000-5000",luxury:"Rs.5000+"}[budget]||"mid";
  const prompt=`5 restaurants for ${city}. cuisine=${cuisine}, budget=${budgetLabel}, ambience=${ambience}, diet=${diet}, distance=${dist}.
JSON only: {"restaurants":[{"name":"real name","cuisine":"cuisine","rating":4.5,"ambience":"Romantic","address":"area","distance":"0.5km","dietary":"Vegetarian","priceRange":"Rs.1500","openHours":"12pm-11pm","description":"2 sentences","menuItems":[{"name":"dish","description":"desc","price":850,"tags":["Chef Special"]},{"name":"dish","description":"desc","price":1200,"tags":["Must Try"]},{"name":"dish","description":"desc","price":650,"tags":[]}]}]}
Use real names in ${city}.`;
  try{
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"Dining expert. JSON only."},{role:"user",content:prompt}],temperature:0.7,max_tokens:2000,response_format:{type:"json_object"}})});
    const d=await r.json();res.json({restaurants:JSON.parse(d.choices?.[0]?.message?.content||"{}").restaurants||[]});
  }catch(e){res.status(500).json({error:"Failed"});}
});

app.post("/places", async (req, res) => {
  const{city,category,budget,time,crowd,type}=req.body;const isGem=type==='gems';
  const prompt=isGem
    ?`5 hidden gems for ${city}. type=${category}, crowd=${crowd}, time=${time}. Must be lesser-known.
JSON only: {"places":[{"name":"real place","category":"Secret Cafe","description":"2-3 sentences","distanceFromCenter":"2km","bestTime":"Early morning","duration":"1-2 hours","entryPrice":"Free","crowdLevel":"Quiet","insiderTip":"Very specific local tip"}]}`
    :`5 sightseeing spots for ${city}. category=${category}, budget=${budget}, time=${time}.
JSON only: {"places":[{"name":"real landmark","category":"History","description":"2-3 sentences","distanceFromCenter":"1.5km","bestTime":"Morning","duration":"2-3 hours","entryPrice":"Rs.600","crowdLevel":"Busy","insiderTip":"Practical tip"}]}`;
  try{
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"Travel expert. JSON only."},{role:"user",content:prompt}],temperature:0.8,max_tokens:2000,response_format:{type:"json_object"}})});
    const d=await r.json();res.json({places:JSON.parse(d.choices?.[0]?.message?.content||"{}").places||[]});
  }catch(e){res.status(500).json({error:"Failed"});}
});

app.post("/experiences", async (req, res) => {
  const{dest,start,end,people,budget,interests}=req.body;
  const days=start&&end?Math.round((new Date(end)-new Date(start))/(1000*60*60*24))+1:3;

  const prompt=`You are a luxury experience curator at Gleefy. Generate curated experience recommendations across all 6 domains for ${dest}, ${start} to ${end}, ${people} people, ${budget} budget. Client interests: ${interests||'mixed'}.

Respond ONLY valid JSON:
{
  "destSummary": "2 sentence overview of ${dest} as an experience destination",
  "sport": {
    "headline": "Sport experiences in ${dest}",
    "experiences": [
      {"name":"specific sport event or experience","type":"Live Match / Activity / Tour","price":"Rs.X per person","duration":"X hours","description":"2 sentences","bookingTip":"where and how to book","dates":"when available"},
      {"name":"second experience","type":"type","price":"Rs.X","duration":"X hours","description":"desc","bookingTip":"tip","dates":"when"}
    ]
  },
  "travel": {
    "headline": "Travel highlights for ${dest}",
    "experiences": [
      {"name":"specific travel experience","type":"Day Trip / Tour / Excursion","price":"Rs.X per person","duration":"X hours","description":"2 sentences","bookingTip":"booking tip","dates":"when available"},
      {"name":"second","type":"type","price":"Rs.X","duration":"X","description":"desc","bookingTip":"tip","dates":"when"}
    ]
  },
  "music": {
    "headline": "Music experiences in ${dest}",
    "experiences": [
      {"name":"specific concert venue or music event","type":"Concert / Festival / Live Music","price":"Rs.X per person","duration":"X hours","description":"2 sentences","bookingTip":"tip","dates":"when"},
      {"name":"second","type":"type","price":"Rs.X","duration":"X","description":"desc","bookingTip":"tip","dates":"when"}
    ]
  },
  "festivals": {
    "headline": "Festivals near ${dest}",
    "experiences": [
      {"name":"specific festival","type":"Music Festival / Cultural / Food","price":"Rs.X per person","duration":"X days","description":"2 sentences","bookingTip":"tip","dates":"specific months"},
      {"name":"second","type":"type","price":"Rs.X","duration":"X","description":"desc","bookingTip":"tip","dates":"when"}
    ]
  },
  "events": {
    "headline": "Events happening in ${dest}",
    "experiences": [
      {"name":"specific event","type":"Awards / Sports / Corporate / Cultural","price":"Rs.X per person","duration":"X hours","description":"2 sentences","bookingTip":"tip","dates":"when"},
      {"name":"second","type":"type","price":"Rs.X","duration":"X","description":"desc","bookingTip":"tip","dates":"when"}
    ]
  },
  "spiritual": {
    "headline": "Spiritual experiences near ${dest}",
    "experiences": [
      {"name":"specific temple retreat pilgrimage or spiritual centre","type":"Pilgrimage / Retreat / Ceremony","price":"Rs.X per person or Free","duration":"X hours or X days","description":"2 sentences","bookingTip":"tip","dates":"when available"},
      {"name":"second","type":"type","price":"Rs.X","duration":"X","description":"desc","bookingTip":"tip","dates":"when"}
    ]
  },
  "flightsNote": "Brief note about flying to ${dest} from major Indian cities",
  "hotelNote": "Brief note about best areas to stay in ${dest} for these experiences",
  "carNote": "Brief note about transport within ${dest}"
}`;

  try{
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"Luxury experience curator. JSON only."},{role:"user",content:prompt}],temperature:0.7,max_tokens:3000,response_format:{type:"json_object"}})});
    const d=await r.json();
    const exp=JSON.parse(d.choices?.[0]?.message?.content||"{}");

    const flightsUrl="https://www.google.com/flights?q=flights+to+"+encodeURIComponent(dest);
    const hotelsUrl="https://www.google.com/travel/hotels/"+encodeURIComponent(dest);

    const domains=[
      {key:'sport',icon:'⚽',color:'#E07070',title:'Sport'},
      {key:'travel',icon:'✈️',color:'#CBB38E',title:'Travel'},
      {key:'music',icon:'🎵',color:'#7BA0D9',title:'Music'},
      {key:'festivals',icon:'🎪',color:'#D97BB0',title:'Festivals'},
      {key:'events',icon:'🎭',color:'#7BD99E',title:'Events'},
      {key:'spiritual',icon:'🕉️',color:'#B8A9D9',title:'Spiritual'}
    ];

    let html='<div>';
    html+='<div class="section-card"><div style="font-family:Bodoni Moda,serif;color:#CBB38E;font-size:26px;margin-bottom:8px">'+dest+' Experiences</div>';
    html+='<div class="trip-summary">'+exp.destSummary+'</div>';
    html+='<div class="summary-grid"><div class="summary-item"><div class="summary-label">Duration</div><div class="summary-value">'+days+' Days</div></div><div class="summary-item"><div class="summary-label">People</div><div class="summary-value">'+people+'</div></div><div class="summary-item"><div class="summary-label">Domains</div><div class="summary-value">6</div></div></div></div>';

    domains.forEach(function(dom){
      const domData=exp[dom.key];if(!domData)return;
      html+='<div class="exp-domain-card">';
      html+='<div class="exp-domain-header"><div class="exp-domain-icon">'+dom.icon+'</div><div><div class="exp-domain-title" style="color:'+dom.color+'">'+dom.title+'</div><div class="exp-domain-subtitle">'+domData.headline+'</div></div></div>';
      if(domData.experiences){
        domData.experiences.forEach(function(e,i){
          html+='<div class="exp-item'+(i===0?' featured':'')+'">';
          html+='<div class="exp-item-name"><span>'+(i===0?'<span style="background:'+dom.color+';color:#000;font-size:9px;font-weight:800;padding:2px 6px;border-radius:3px;margin-right:6px;letter-spacing:0.08em">TOP PICK</span>':'')+e.name+'</span><span class="exp-item-price">'+e.price+'</span></div>';
          html+='<div class="exp-item-tags"><span class="exp-item-tag">'+e.type+'</span><span class="exp-item-tag">⏱ '+e.duration+'</span><span class="exp-item-tag" style="border-color:'+dom.color+';color:'+dom.color+'">📅 '+e.dates+'</span></div>';
          html+='<div class="exp-item-desc">'+e.description+'</div>';
          html+='<div class="exp-tip">💡 <strong>How to book:</strong> '+e.bookingTip+'</div>';
          html+='</div>';
        });
      }
      html+='</div>';
    });

    html+='<div class="section-card"><div class="section-title">✈️ Getting There</div>';
    html+='<div style="color:#A09890;font-size:13px;line-height:1.7;margin-bottom:12px">'+exp.flightsNote+'</div>';
    html+='<a href="'+flightsUrl+'" target="_blank" class="book-btn">Search Flights to '+dest+'</a></div>';

    html+='<div class="section-card"><div class="section-title">🏨 Where to Stay</div>';
    html+='<div style="color:#A09890;font-size:13px;line-height:1.7;margin-bottom:12px">'+exp.hotelNote+'</div>';
    html+='<a href="'+hotelsUrl+'" target="_blank" class="book-btn">Search Hotels in '+dest+'</a></div>';

    html+='<div class="section-card"><div class="section-title">🚗 Getting Around</div>';
    html+='<div style="color:#A09890;font-size:13px;line-height:1.7">'+exp.carNote+'</div></div>';

    html+='<p class="disclaimer">Experience suggestions are AI-generated. Prices and availability may vary. Always verify before booking.</p>';
    html+='</div>';

    res.json({html});
  }catch(err){console.error("Experiences error:",err.message);res.status(500).json({error:"Failed"});}
});

app.post("/profile", async (req, res) => {
  const p=req.body;
  const prompt=`Luxury experience consultant at Gleefy. Analyse this client profile.
Name:${p.name}, Age:${p.age}, Location:${p.location}, Occupation:${p.occupation}, Budget:${p.budget}, Group:${p.group}
Travel: destinations=${p.destinations}, style=${p.travelStyle}, cabin=${p.cabin}, diet=${p.diet}, past=${p.pastTravel}
Sport: ${p.sports}, type=${p.sportType}, dream=${p.sportDream}
Music: genre=${p.musicGenre}, artists=${p.musicArtist}, experience=${p.musicExp}
Festivals: ${p.festivals}, events=${p.events}, dream=${p.festDream}
Spiritual: ${p.spiritual}, sacred=${p.sacred}, goals=${p.spiritDream}
Notes: ${p.notes}

JSON only:
{"clientType":"e.g. The Luxury Globetrotter","personalitySummary":"3-4 sentences","spendingStyle":"description","travelInsight":"personalised travel recommendation","sportInsight":"personalised sport recommendation","musicInsight":"personalised music recommendation","festivalInsight":"personalised festival recommendation","eventsInsight":"personalised events recommendation","spiritualInsight":"personalised spiritual recommendation","topRecommendations":["rec 1","rec 2","rec 3","rec 4","rec 5"],"dreamExperience":"ultimate dream experience 3-4 sentences","budgetEstimate":"annual lifestyle budget in INR"}`;
  try{
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"Luxury lifestyle consultant. JSON only."},{role:"user",content:prompt}],temperature:0.7,max_tokens:1500,response_format:{type:"json_object"}})});
    const d=await r.json();
    const profile=JSON.parse(d.choices?.[0]?.message?.content||"{}");

    let html='<div class="profile-result" id="profileResultContent">';
    html+='<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:20px">';
    html+='<div><div style="font-family:Bodoni Moda,serif;color:#CBB38E;font-size:28px">'+p.name+'</div>';
    html+='<div style="color:#6B6560;font-size:12px;margin-top:4px">'+(p.occupation||'')+(p.location?' · '+p.location:'')+' · Age '+p.age+'</div>';
    html+='<div style="color:#CBB38E;font-size:12px;margin-top:6px;font-style:italic">'+profile.clientType+'</div></div>';
    html+='<div style="width:54px;height:54px;border-radius:50%;background:#CBB38E22;border:2px solid #CBB38E;display:flex;align-items:center;justify-content:center;font-size:22px;font-family:Bodoni Moda,serif;color:#CBB38E">'+p.name.charAt(0).toUpperCase()+'</div></div>';

    html+='<div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px">';
    ['⚽ Sport','✈️ Travel','🎵 Music','🎪 Festivals','🎭 Events','🕉️ Spiritual'].forEach(function(d){html+='<span style="background:#1A1A1A;border:0.5px solid #CBB38E;color:#CBB38E;font-size:11px;font-weight:600;padding:5px 12px;border-radius:20px">'+d+'</span>';});
    html+='</div>';

    html+='<div class="trip-summary" style="margin-bottom:16px">'+profile.personalitySummary+'</div>';

    html+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px">';
    [['Budget Style',p.budget],['Group Type',p.group],['Cabin',p.cabin],['Est. Annual Budget',profile.budgetEstimate],['Spending Style',profile.spendingStyle],['Dietary',p.diet||'None']].forEach(function(item){html+='<div style="background:#0E0E0E;border-radius:8px;padding:12px"><div style="font-size:9px;color:#6B6560;text-transform:uppercase;letter-spacing:0.08em;margin-bottom:5px">'+item[0]+'</div><div style="font-size:13px;color:#E7E1D7">'+item[1]+'</div></div>';});
    html+='</div>';

    const insights=[['✈️ Travel',profile.travelInsight],['⚽ Sport',profile.sportInsight],['🎵 Music',profile.musicInsight],['🎪 Festivals',profile.festivalInsight],['🎭 Events',profile.eventsInsight],['🕉️ Spiritual',profile.spiritualInsight]];
    insights.forEach(function(ins){if(ins[1]){html+='<div class="domain-insight"><div class="domain-insight-title">'+ins[0]+' Insight</div><div class="domain-insight-text">'+ins[1]+'</div></div>';}});

    html+='<div style="background:#0E0E0E;border-radius:8px;padding:16px;margin-bottom:16px"><div style="font-size:10px;color:#6B6560;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:12px">⭐ Top 5 Recommendations for '+p.name+'</div><ul style="padding-left:16px">';
    if(profile.topRecommendations)profile.topRecommendations.forEach(function(r){html+='<li style="color:#A09890;font-size:13px;line-height:2.2">'+r+'</li>';});
    html+='</ul></div>';

    if(profile.dreamExperience){html+='<div class="insider-tip"><div class="insider-label">✨ Dream Experience</div><div class="insider-text">'+profile.dreamExperience+'</div></div>';}

    html+='<button onclick="downloadProfilePDF()" class="pdf-btn" style="width:100%;margin-top:16px">📄 Download Profile as PDF</button>';
    html+='</div>';

    res.json({html});
  }catch(err){console.error("Profile error:",err.message);res.status(500).json({error:"Failed"});}
});

app.post("/costplan", async (req, res) => {
  const{name,dest,start,end,people,budget,domains,details}=req.body;
  const days=Math.round((new Date(end)-new Date(start))/(1000*60*60*24))+1;

  const prompt=`Luxury experience cost planner at Gleefy.
Client: ${name||'Client'}, Destination: ${dest}, Dates: ${start} to ${end} (${days} days), People: ${people}, Budget: ${budget}
Selected domains: ${domains.join(', ')}
Experience details: ${details||'Standard luxury experience'}

Generate a complete cost plan. Respond ONLY valid JSON:
{"summary":"2-3 sentence overview","costBreakdown":[{"category":"✈️ Flights","items":[{"name":"Return flights","unitCost":45000,"quantity":${people},"total":${45000*parseInt(people||1)},"notes":"Business class"}],"subtotal":${45000*parseInt(people||1)}},{"category":"🏨 Hotels","items":[{"name":"5-star hotel per night","unitCost":25000,"quantity":${days},"total":${25000*days},"notes":"Including breakfast"}],"subtotal":${25000*days}},{"category":"🚗 Chauffeur Cars","items":[{"name":"Luxury sedan per day","unitCost":12000,"quantity":${days},"total":${12000*days},"notes":"With chauffeur"}],"subtotal":${12000*days}}],"grandTotal":500000,"executionPlan":[{"day":1,"date":"${start}","title":"Arrival Day","slots":[{"time":"09:00","activity":"Departure","detail":"Check-in 2 hours before. Lounge access included.","cost":"Rs.45,000 per person"},{"time":"14:00","activity":"Arrival & Transfer","detail":"Chauffeur pickup at airport","cost":"Included"},{"time":"16:00","activity":"Hotel Check-in","detail":"Early check-in arranged","cost":"Rs.25,000 per night"},{"time":"20:00","activity":"Welcome Dinner","detail":"Reservation at signature restaurant","cost":"Rs.5,000 per person"}]}],"bookingChecklist":["Book flights 3 months in advance","Hotel reservation needed immediately","Restaurant reservations 2 weeks ahead"],"paymentNote":"50% advance, 50% one week before travel"}

Make costs realistic for ${budget} budget in ${dest}. Include domain-specific costs for: ${domains.join(', ')}. Generate all ${days} days in execution plan. Grand total should reflect all costs combined.`;

  try{
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"Cost planner. JSON only."},{role:"user",content:prompt}],temperature:0.6,max_tokens:3000,response_format:{type:"json_object"}})});
    const d=await r.json();
    const plan=JSON.parse(d.choices?.[0]?.message?.content||"{}");
    const gleefyFee=Math.round((plan.grandTotal||0)*0.1);
    const totalWithFee=(plan.grandTotal||0)+gleefyFee;

    let html='<div>';
    html+='<div class="section-card"><div style="font-family:Bodoni Moda,serif;color:#CBB38E;font-size:24px;margin-bottom:8px">'+(name||'Client')+' — '+dest+'</div><div class="trip-summary">'+plan.summary+'</div><div class="summary-grid"><div class="summary-item"><div class="summary-label">Duration</div><div class="summary-value">'+days+' Days</div></div><div class="summary-item"><div class="summary-label">People</div><div class="summary-value">'+people+'</div></div><div class="summary-item"><div class="summary-label">Domains</div><div class="summary-value">'+domains.map(function(d){return{sport:'⚽',travel:'✈️',music:'🎵',festivals:'🎪',events:'🎭',spiritual:'🕉️'}[d]||d;}).join(' ')+'</div></div></div></div>';

    html+='<div class="grand-total-card"><div class="grand-total-label">Total Experience Cost</div><div class="grand-total-amount">Rs.'+totalWithFee.toLocaleString('en-IN')+'</div></div>';

    html+='<div class="section-card"><div class="section-title">💰 Cost Breakdown</div>';
    if(plan.costBreakdown){plan.costBreakdown.forEach(function(cat){html+='<div class="cost-card"><div class="cost-header"><div class="cost-category">'+cat.category+'</div><div class="cost-total">Rs.'+cat.subtotal.toLocaleString('en-IN')+'</div></div><div class="cost-body">';cat.items.forEach(function(item){html+='<div class="cost-line"><div><div class="cost-line-name">'+item.name+'</div><div style="font-size:11px;color:#6B6560">'+item.notes+'</div></div><div style="text-align:right"><div class="cost-line-amount">Rs.'+item.total.toLocaleString('en-IN')+'</div><div style="font-size:11px;color:#6B6560">Rs.'+item.unitCost.toLocaleString('en-IN')+' × '+item.quantity+'</div></div></div>';});html+='</div></div>';});}
    html+='<div class="cost-card"><div class="cost-header"><div class="cost-category">🌟 Gleefy Service Fee</div><div class="cost-total">Rs.'+gleefyFee.toLocaleString('en-IN')+'</div></div><div class="cost-body"><div class="cost-line"><div class="cost-line-name">End-to-end planning, booking & concierge</div><div class="cost-line-amount">10%</div></div></div></div>';
    html+='</div>';

    html+='<div class="section-card"><div class="section-title">📅 Execution Plan</div>';
    if(plan.executionPlan){plan.executionPlan.forEach(function(day){html+='<div class="exec-day"><div class="exec-day-title">Day '+day.day+' — '+day.title+'<span style="font-size:11px;font-weight:400;margin-left:8px;color:#6B6560">'+day.date+'</span></div>';if(day.slots){day.slots.forEach(function(slot){html+='<div class="exec-slot"><div class="exec-time">'+slot.time+'</div><div class="exec-task"><div class="exec-task-name">'+slot.activity+'</div><div class="exec-task-detail">'+slot.detail+'</div><div class="exec-task-cost">'+slot.cost+'</div></div></div>';});}html+='</div>';});}
    html+='</div>';

    html+='<div class="section-card"><div class="section-title">✅ Booking Checklist</div><ul style="padding-left:16px">';
    if(plan.bookingChecklist)plan.bookingChecklist.forEach(function(item){html+='<li style="color:#A09890;font-size:13px;line-height:2.2">'+item+'</li>';});
    html+='</ul></div>';

    html+='<div class="section-card"><div class="section-title">💳 Payment</div><div style="background:#0E0E0E;border-radius:8px;padding:16px"><div class="cost-line"><div class="cost-line-name">50% Advance</div><div class="cost-line-amount">Rs.'+(Math.round(totalWithFee/2)).toLocaleString('en-IN')+'</div></div><div class="cost-line"><div class="cost-line-name">50% One Week Before</div><div class="cost-line-amount">Rs.'+(Math.round(totalWithFee/2)).toLocaleString('en-IN')+'</div></div></div><div style="margin-top:10px;color:#6B6560;font-size:12px">'+(plan.paymentNote||'')+'</div></div>';

    html+='<p class="disclaimer">All costs are estimates. Final pricing subject to availability and confirmation.</p></div>';
    res.json({html});
  }catch(err){console.error("Cost plan error:",err.message);res.status(500).json({error:"Failed"});}
});

app.post("/itinerary", async (req, res) => {
  const{from,dest,start,end,travellers,budget,style,hotel,notes}=req.body;
  const days=Math.round((new Date(end)-new Date(start))/(1000*60*60*24))+1;
  const prompt=`Luxury travel planner. ${days}-day trip for ${travellers} from ${from} to ${dest}, ${start} to ${end}, ${budget} budget, ${style} style, ${hotel}. Notes: ${notes||'None'}.

The itinerary should include domain-based experiences where relevant based on the notes — if notes mention sport, music, festivals, events or spiritual, weave those in.

JSON only: {"summary":"summary","totalBudgetINR":"Rs.X-Rs.Y","days":[{"day":1,"title":"title","morning":"activity with domain tag e.g. [SPORT] Watch IPL match at Wankhede","afternoon":"activity","evening":"activity","meals":"restaurants"}],"hotels":[{"name":"hotel","stars":4,"pricePerNightINR":12000,"highlight":"feature","reviewScore":8.9,"distanceFromCenter":"1km","amenities":["Pool","Spa","Restaurant"],"rooms":[{"type":"Deluxe","description":"desc","pricePerNight":12000},{"type":"Suite","description":"desc","pricePerNight":22000}]},{"name":"hotel","stars":5,"pricePerNightINR":25000,"highlight":"feature","reviewScore":9.4,"distanceFromCenter":"0.5km","amenities":["Infinity Pool","Butler","Fine Dining"],"rooms":[{"type":"Premier","description":"desc","pricePerNight":25000},{"type":"Presidential","description":"desc","pricePerNight":65000}]}],"cars":[{"brand":"Mercedes-Benz","model":"E-Class","category":"Luxury Sedan","pricePerDay":8000,"seats":"4","chauffeur":true,"description":"desc"},{"brand":"BMW","model":"5 Series","category":"Luxury Sedan","pricePerDay":6500,"seats":"4","chauffeur":true,"description":"desc"}],"restaurants":[{"name":"restaurant","cuisine":"cuisine","rating":4.5,"ambience":"Romantic","priceRange":"Rs.2000","description":"desc","menuItems":[{"name":"dish","description":"desc","price":800,"tags":["Must Try"]},{"name":"dish","description":"desc","price":600,"tags":[]},{"name":"dish","description":"desc","price":400,"tags":[]}]},{"name":"restaurant","cuisine":"cuisine","rating":4.2,"ambience":"Casual","priceRange":"Rs.1000","description":"desc","menuItems":[{"name":"dish","description":"desc","price":500,"tags":[]},{"name":"dish","description":"desc","price":300,"tags":["Vegetarian"]},{"name":"dish","description":"desc","price":400,"tags":[]}]}],"domainHighlights":[{"domain":"Sport","icon":"⚽","experience":"specific sport experience included in trip"},{"domain":"Music","icon":"🎵","experience":"specific music experience"},{"domain":"Spiritual","icon":"🕉️","experience":"specific spiritual experience"}],"sightseeing":[{"name":"landmark","category":"History","description":"desc","distanceFromCenter":"1km","bestTime":"Morning","duration":"2 hours","entryPrice":"Rs.500","crowdLevel":"Busy","insiderTip":"tip"},{"name":"landmark","category":"Nature","description":"desc","distanceFromCenter":"5km","bestTime":"Sunset","duration":"1 hour","entryPrice":"Free","crowdLevel":"Quiet","insiderTip":"tip"}],"hiddenGems":[{"name":"hidden place","category":"Secret Spot","description":"desc","distanceFromCenter":"3km","bestTime":"Evening","duration":"1 hour","entryPrice":"Free","crowdLevel":"Quiet","insiderTip":"specific local tip"}],"activities":[{"name":"activity","duration":"2 hours","priceINR":500,"description":"desc"},{"name":"activity","duration":"half day","priceINR":1200,"description":"desc"}],"tips":["tip 1","tip 2","tip 3"]}`;

  try{
    const r=await fetch("https://api.groq.com/openai/v1/chat/completions",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+process.env.GROQ_API_KEY},body:JSON.stringify({model:"llama-3.3-70b-versatile",messages:[{role:"system",content:"Travel planner. JSON only."},{role:"user",content:prompt}],temperature:0.7,max_tokens:3500,response_format:{type:"json_object"}})});
    const d=await r.json();
    const itin=JSON.parse(d.choices?.[0]?.message?.content||"{}");

    const flightsUrl="https://www.google.com/flights?q=flights+from+"+encodeURIComponent(from)+"+to+"+encodeURIComponent(dest);
    const hotelsUrl="https://www.google.com/travel/hotels/"+encodeURIComponent(dest);
    const mapsUrl="https://www.google.com/maps/search/"+encodeURIComponent(dest);
    function crowdDots(level){const levels={low:1,quiet:1,moderate:2,busy:3,high:3};const filled=levels[(level||'').toLowerCase()]||2;const type=filled===1?'quiet':filled===2?'moderate':'busy';let dots='';for(let i=0;i<3;i++)dots+='<div class="crowd-dot'+(i<filled?' active '+type:'')+'"></div>';return dots;}

    let html='<div>';
    html+='<div class="section-card"><div style="font-family:Bodoni Moda,serif;color:#CBB38E;font-size:26px;margin-bottom:8px">'+dest+' — '+days+' Day Trip</div><div class="trip-summary">'+itin.summary+'</div><div class="summary-grid"><div class="summary-item"><div class="summary-label">Duration</div><div class="summary-value">'+days+' Days</div></div><div class="summary-item"><div class="summary-label">Travellers</div><div class="summary-value">'+travellers+'</div></div><div class="summary-item"><div class="summary-label">Est. Budget</div><div class="summary-value" style="font-size:13px">'+itin.totalBudgetINR+'</div></div></div>';

    if(itin.domainHighlights&&itin.domainHighlights.length){
      html+='<div style="margin-top:14px"><div style="font-size:10px;color:#6B6560;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:10px">🌟 Domain Experiences Included</div><div style="display:flex;flex-wrap:wrap;gap:8px">';
      itin.domainHighlights.forEach(function(dh){html+='<div style="background:#0E0E0E;border:0.5px solid #CBB38E;border-radius:8px;padding:8px 12px"><div style="font-size:11px;color:#CBB38E;font-weight:700;margin-bottom:3px">'+dh.icon+' '+dh.domain+'</div><div style="font-size:12px;color:#A09890">'+dh.experience+'</div></div>';});
      html+='</div></div>';
    }
    html+='</div>';

    html+='<div class="section-card"><div class="section-title">✈️ Flights</div><a href="'+flightsUrl+'" target="_blank" class="book-btn">Search Flights on Google</a></div>';

    html+='<div class="section-card"><div class="section-title">🗓️ Day by Day Itinerary</div>';
    itin.days.forEach(function(day){
      html+='<div class="day-card"><div class="day-title">Day '+day.day+' — '+day.title+'</div>';
      ['morning','afternoon','evening'].forEach(function(slot){
        const text=day[slot]||'';
        const domainMatch=text.match(/^\[([A-Z]+)\]/);
        const domainColors={SPORT:'#E07070',MUSIC:'#7BA0D9',FESTIVAL:'#D97BB0',EVENT:'#7BD99E',SPIRITUAL:'#B8A9D9',TRAVEL:'#CBB38E'};
        const color=domainMatch?domainColors[domainMatch[1]]||'#CBB38E':'#CBB38E';
        html+='<div class="time-slot"><span class="time-badge" style="border-color:'+color+';color:'+color+'">'+slot.charAt(0).toUpperCase()+slot.slice(1)+'</span><span class="day-content">'+text+'</span></div>';
      });
      html+='<div style="margin-top:8px;color:#6B6560;font-size:12px">🍽️ '+day.meals+'</div></div>';
    });
    html+='</div>';

    html+='<div class="section-card"><div class="section-title">🏨 Hotels</div>';
    if(itin.hotels)itin.hotels.forEach(function(h,i){const stars='★'.repeat(h.stars)+'☆'.repeat(5-h.stars);const bookUrl='https://www.google.com/travel/hotels/'+encodeURIComponent(dest)+'?q='+encodeURIComponent(h.name);html+='<div class="hotel-card'+(i===0?' featured':'')+'">';html+='<div class="hotel-header"><div>'+(i===0?'<div class="featured-bar">RECOMMENDED</div><br>':'')+'<div class="hotel-name">'+h.name+'</div><div class="hotel-tags"><span class="hotel-tag">📍 '+h.distanceFromCenter+'</span></div></div><div class="hotel-right"><div class="hotel-stars">'+stars+'</div><div class="hotel-price">Rs.'+h.pricePerNightINR.toLocaleString('en-IN')+'</div><div class="hotel-price-label">per night</div><div class="hotel-review">⭐ '+h.reviewScore+'/10</div></div></div>';html+='<div class="hotel-body"><div class="hotel-desc">'+h.highlight+'</div>';if(h.amenities){html+='<div class="amenities-grid">';h.amenities.forEach(function(a){html+='<div class="amenity">'+a+'</div>';});html+='</div>';}if(h.rooms){html+='<div class="room-items">';h.rooms.forEach(function(rm){html+='<div class="room-item"><div><div class="room-name">'+rm.type+'</div><div class="room-desc">'+rm.description+'</div></div><div class="room-price">Rs.'+rm.pricePerNight.toLocaleString('en-IN')+'/night</div></div>';});html+='</div>';}html+='<div class="hotel-footer"><div></div><a href="'+bookUrl+'" target="_blank" class="book-btn">Book on Google Hotels</a></div></div></div>';});
    html+='</div>';

    html+='<div class="section-card"><div class="section-title">🚗 Chauffeur Cars</div>';
    if(itin.cars)itin.cars.forEach(function(c,i){const bookUrl='https://www.google.com/search?q='+encodeURIComponent(c.brand+' '+c.model+' chauffeur '+dest);html+='<div class="car-strip"><div class="car-strip-left">'+(i===0?'<div class="featured-bar">RECOMMENDED</div><br>':'')+'<div class="car-strip-model">'+c.model+'</div><div class="car-strip-brand">'+c.brand+'</div><div class="car-strip-tags"><span class="car-tag">'+c.category+'</span><span class="car-tag">'+c.seats+' Seats</span><span class="car-tag gold">👤 Chauffeur</span></div><div class="car-strip-desc">'+c.description+'</div></div><div class="car-strip-right"><div class="car-strip-price">Rs.'+c.pricePerDay.toLocaleString('en-IN')+'</div><div class="car-strip-label">per day</div><a href="'+bookUrl+'" target="_blank" class="book-btn" style="margin-top:8px;font-size:11px;padding:7px 14px">Book</a></div></div>';});
    html+='</div>';

    html+='<div class="section-card"><div class="section-title">🍽️ Restaurants</div>';
    if(itin.restaurants)itin.restaurants.forEach(function(rest,i){const stars='★'.repeat(Math.round(rest.rating||4))+'☆'.repeat(5-Math.round(rest.rating||4));const mapsRestUrl='https://www.google.com/maps/search/'+encodeURIComponent(rest.name+' '+dest);html+='<div class="rest-card'+(i===0?' featured':'')+'">';html+='<div class="rest-header"><div>'+(i===0?'<div class="featured-bar">TOP PICK</div><br>':'')+'<div class="rest-name">'+rest.name+'</div><div class="rest-cuisine">'+rest.cuisine+'</div><div class="rest-tags"><span class="rest-tag">'+rest.ambience+'</span></div></div><div class="rest-right"><div class="rest-stars">'+stars+'</div><div class="rest-price">'+rest.priceRange+'</div><div class="rest-price-label">avg per person</div></div></div>';html+='<div class="rest-body"><div class="rest-desc">'+rest.description+'</div><div class="menu-title">🍴 Signature Dishes</div><div class="menu-items">';if(rest.menuItems)rest.menuItems.forEach(function(m){html+='<div class="menu-item"><div class="menu-item-left"><div class="menu-item-name">'+m.name+'</div><div class="menu-item-desc">'+m.description+'</div>'+(m.tags&&m.tags.length?'<div class="menu-item-tags">'+m.tags.map(function(t){return'<span class="menu-item-tag">'+t+'</span>';}).join('')+'</div>':'')+'</div><div class="menu-item-price">Rs.'+m.price.toLocaleString('en-IN')+'</div></div>';});html+='</div><div class="rest-footer"><div></div><a href="'+mapsRestUrl+'" target="_blank" class="book-btn" style="font-size:11px;padding:7px 16px">Maps</a></div></div></div>';});
    html+='</div>';

    if(itin.sightseeing&&itin.sightseeing.length){
      html+='<div class="section-card"><div class="section-title">🏛️ Sightseeing</div>';
      itin.sightseeing.forEach(function(p,i){const mU='https://www.google.com/maps/search/'+encodeURIComponent(p.name+' '+dest);html+='<div class="place-card'+(i===0?' featured':'')+'">';html+='<div class="place-header"><div>'+(i===0?'<div class="featured-bar">MUST VISIT</div><br>':'')+'<div class="place-name">'+p.name+'</div><div class="place-category">'+p.category+'</div><div class="place-tags"><span class="place-tag">'+p.distanceFromCenter+'</span><span class="place-tag gold">⏰ '+p.bestTime+'</span></div></div><div style="text-align:right"><div style="color:#CBB38E;font-size:16px;font-weight:700">'+p.entryPrice+'</div></div></div>';html+='<div class="place-body"><div class="place-desc">'+p.description+'</div><div class="insider-tip"><div class="insider-label">💡 Tip</div><div class="insider-text">'+p.insiderTip+'</div></div><div class="place-footer"><div class="crowd-bar"><span class="crowd-label">Crowd:</span><div class="crowd-dots">'+crowdDots(p.crowdLevel)+'</div></div><a href="'+mU+'" target="_blank" class="book-btn" style="font-size:11px;padding:7px 16px">Maps</a></div></div></div>';});
      html+='</div>';
    }

    if(itin.hiddenGems&&itin.hiddenGems.length){
      html+='<div class="section-card"><div class="section-title">💎 Hidden Gems</div>';
      itin.hiddenGems.forEach(function(p){const mU='https://www.google.com/maps/search/'+encodeURIComponent(p.name+' '+dest);html+='<div class="place-card gem"><div class="place-header"><div><div class="gem-bar">HIDDEN GEM</div><br><div class="place-name gem-name">'+p.name+'</div><div class="place-category">'+p.category+'</div></div><div style="text-align:right"><div style="color:#B8A9D9;font-size:16px;font-weight:700">'+p.entryPrice+'</div></div></div><div class="place-body"><div class="place-desc">'+p.description+'</div><div class="insider-tip gem-tip"><div class="insider-label gem-label">💎 Secret</div><div class="insider-text">'+p.insiderTip+'</div></div><div class="place-footer"><div></div><a href="'+mU+'" target="_blank" class="book-btn" style="font-size:11px;padding:7px 16px">Maps</a></div></div></div>';});
      html+='</div>';
    }

    html+='<div class="section-card"><div class="section-title">🗺️ Map</div><iframe class="map-frame" src="https://maps.google.com/maps?q='+encodeURIComponent(dest)+'&output=embed" frameborder="0" allowfullscreen></iframe><a href="'+mapsUrl+'" target="_blank" class="book-btn" style="margin-top:12px;display:inline-block">Open in Google Maps</a></div>';
    html+='<div class="section-card"><div class="section-title">💡 Travel Tips</div><ul style="padding-left:16px">';
    itin.tips.forEach(function(t){html+='<li style="color:#A09890;font-size:13px;line-height:2">'+t+'</li>';});
    html+='</ul></div></div>';

    res.json({html});
  }catch(err){console.error("Itinerary error:",err.message);res.status(500).json({error:"Failed"});}
});

const PORT=process.env.PORT||3001;
app.listen(PORT,()=>console.log("Gleefy running on port "+PORT));
