import type { FC } from "react";

interface Props {
  id: string;
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

const CommandCenter: FC<Props> = ({ id }) => {
  const handleChange = async (value: string) => {
    console.log(value);
    await fetch(
      `https://gwc0c0wkg44k4sgcgwgsw44g.vuctechdev.online/devices/interval/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer your_token_here",
        },
        body: JSON.stringify({
          value: value,
          code: "97",
        }),
      }
    );
  };

  const sendCommand = async (value: string, code: string) => {
    await fetch(`http://localhost:2302/devices/command/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer your_token_here",
      },
      body: JSON.stringify({
        value,
        code,
      }),
    });
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>Interval: </p>
        <select
          defaultValue={10}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            handleChange(e.target.value);
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
    </div>
  );
};

export default CommandCenter;
