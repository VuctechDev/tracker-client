import fs from "fs";

// === CONFIGURATION ===
const API_URL = "http://localhost:3000/api/coordinates"; // change to your API
const START_LAT = 44.8176; // fallback starting latitude
const START_LON = 20.4569; // fallback starting longitude
const STEP_DISTANCE = 30; // meters
const INTERVAL = 5000; // ms between requests
const SAVE_FILE = "lastCoord.json"; // file to persist last position

// Earth radius in meters
const R = 6378137;

function generateNextCoordinate(lat, lon, distance) {
  const bearing = Math.random() * 2 * Math.PI;

  const newLat = lat + ((distance * Math.cos(bearing)) / R) * (180 / Math.PI);
  const newLon =
    lon +
    ((distance * Math.sin(bearing)) / (R * Math.cos((lat * Math.PI) / 180))) *
      (180 / Math.PI);

  return { lat: newLat, lon: newLon };
}

async function sendCoordinates(lat, lon) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ latitude: lat, longitude: lon }),
    });
    console.log(`Sent: ${lat}, ${lon} | Status: ${res.status}`);
  } catch (err) {
    console.error("Error sending to API:", err);
  }
}

// Save last coordinate to file
function saveLastCoordinate(lat, lon) {
  fs.writeFileSync(SAVE_FILE, JSON.stringify({ lat, lon }, null, 2));
}

// Load last coordinate from file, or fallback to START
function loadLastCoordinate() {
  if (fs.existsSync(SAVE_FILE)) {
    try {
      const data = JSON.parse(fs.readFileSync(SAVE_FILE, "utf-8"));
      if (data.lat && data.lon) {
        return { lat: data.lat, lon: data.lon };
      }
    } catch (e) {
      console.warn("Could not parse lastCoord.json, using fallback start");
    }
  }
  return { lat: START_LAT, lon: START_LON };
}

async function startTracking(step) {
  let { lat: currentLat, lon: currentLon } = loadLastCoordinate();

  setInterval(async () => {
    const next = generateNextCoordinate(currentLat, currentLon, step);
    currentLat = next.lat;
    currentLon = next.lon;

    saveLastCoordinate(currentLat, currentLon); // persist on disk
    await sendCoordinates(currentLat, currentLon);
  }, INTERVAL);
}

// === RUN SCRIPT ===
startTracking(STEP_DISTANCE);
