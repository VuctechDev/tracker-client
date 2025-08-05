let initialLong = 0;
let initialLat = 0;

const getLat = () => {
  const x = Math.random() - 0.01;
  initialLat += 0.000093;
  return initialLat;
};

const getLong = () => {
  const x = Math.random() - 0.01;
  initialLong += 0.000091;
  return initialLong;
};

const vanNE = {
  longitude: 17.196114063262943,
  latitude: 44.704267228469924,
};

const vanNW = {
  longitude: 17.190047618933026,
  latitude: 44.70366009040875,
};

const vanS = {
  longitude: 17.193517684936527,
  latitude: 44.69889100913762,
};

const unutra2 = {
  longitude: 17.19619452953339,
  latitude: 44.70356567923518,
};
// 60 * 60 *
const a = async () => {
  const r = await fetch("http://localhost:2302/test/new-location", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      imei: "4oho53h435o",
      ...vanNW,
      speed: 22,
    }),
  });
};

// setInterval(() => {
//   a();
// }, 3000);

a();
