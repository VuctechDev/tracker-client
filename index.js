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

const vanTest = {
  longitude: 17.2098,
  latitude: 44.71111,
};

const vanTest2 = {
  longitude: 17.197732101267324,
  latitude: 44.71263772899172,
};
const IMEI = "4oho53h435o";
// const IMEI = "0861261021070616";
//
const url = "http://localhost:2302/test/new-location";
// const url =
//   "https://jcgoccsc04oc88s0co848wo0.vuctechdev.online/test/new-location";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwib3JnYW5pemF0aW9uSWQiOjEsImlhdCI6MTc1NDA0NzkxOH0.qJ3N9PP5Yu3IEHX1h2flvgNnduIE08TZi-NmA9Ei1PM";

const a = async () => {
  const r = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify({
      imei: IMEI,
      ...vanTest,
      speed: 9,
    }),
  });
};

// setInterval(() => {
//   a();
// }, 3000);

a();
