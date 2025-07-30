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

const a = async () => {
  const r = await fetch("http://localhost:2302/test/redis", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      imei: "34t5353",
      latitude: getLat(),
      longitude: getLong(),
      speed: 22,
    }),
  });
};

setInterval(() => {
  a();
}, 3000);
