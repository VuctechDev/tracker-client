import type { FC } from "react";

interface Props {
  id: string;
  value: string;
}

const config = [
  {
    label: "10s",
    value: 10,
  },
  {
    label: "30s",
    value: 30,
  },
  {
    label: "1m",
    value: 60,
  },
  {
    label: "5m",
    value: 300,
  },
  {
    label: "10m",
    value: 600,
  },
];

const CommandCenter: FC<Props> = ({ id, value }) => {
  console.log(value);
  const sendCommand = async (value: string, code: string) => {
    await fetch(
      `https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/devices/command/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_token_here",
        },
        body: JSON.stringify({
          value,
          code,
        }),
      }
    );
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>Interval: </p>
        <select
          defaultValue={parseInt(value)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            sendCommand(e.target.value, "97");
          }}
          className="select-custom"
        >
          {config.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          sendCommand("", "80");
        }}
      >
        80
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          sendCommand("", "48");
        }}
      >
        RESTART
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          sendCommand("01", "49");
        }}
      >
        UPALI ZVUK
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          sendCommand("00", "49");
        }}
      >
        UGASI ZVUK
      </button>
    </div>
  );
};

export default CommandCenter;
