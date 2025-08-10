import { useRef, type FC } from "react";
import { request } from "../utils/api";

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
  {
    label: "15m",
    value: 900,
  },
];
const statusConfig = [
  {
    label: "1m",
    value: 1,
  },
  {
    label: "2m",
    value: 2,
  },
  {
    label: "5m",
    value: 5,
  },
  {
    label: "10m",
    value: 10,
  },
];

const CommandCenter: FC<Props> = ({ id, value }) => {
  const rawValueRef = useRef("7878");

  const sendCommand = async (value: string, code: string) => {
    await request(`/devices/command/${id}`, "PATCH", {
      value,
      code,
    });
  };

  const sendRawCommand = async (value: string) => {
    await request(`/devices/raw-command/${id}`, "PATCH", {
      value,
    });
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
      <div style={{ display: "flex", alignItems: "center" }}>
        <p>Status Interval: </p>
        <select
          // defaultValue={parseInt(value)}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={(e) => {
            sendCommand(e.target.value, "13");
          }}
          className="select-custom"
        >
          {statusConfig.map((item) => (
            <option value={item.value} key={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
      <div style={{ alignItems: "center" }}>
        <p>Raw HEX command: </p>
        <input
          style={{ width: "80%" }}
          onChange={(e) => {
            e.stopPropagation();
            rawValueRef.current = e.target.value;
          }}
          defaultValue="7878"
        ></input>
        <button
          onClick={(e) => {
            e.stopPropagation();
            sendRawCommand(rawValueRef.current);
          }}
        >
          SEND
        </button>
      </div>
    </div>
  );
};

export default CommandCenter;
