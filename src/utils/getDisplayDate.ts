import i18n from "../i18n";

const hour = 60 * 1000 * 60;

const getFromUTC = (time: string): number => {
  const d = time ? new Date(time) : new Date();
  return d.getTime() + 2 * hour - new Date().getTimezoneOffset() * 60 * 1000;
  // return time;
};

export const formatNumber = (value: number): string => {
  return value < 10 ? `0${value}` : `${value}`;
};

export const getDisplayDateTime = (time?: string) => {
  const d = time ? new Date(time) : new Date();
  const date = formatNumber(d.getDate());
  const month = formatNumber(d.getMonth() + 1);
  const year = formatNumber(d.getFullYear());
  const hours = formatNumber(d.getHours());
  const minutes = formatNumber(d.getMinutes());
  const seconds = formatNumber(d.getSeconds());

  return `${date}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
};

export const getDisplayTime = (time?: string) => {
  const d = time ? new Date(getFromUTC(time)) : new Date();
  const hours = formatNumber(d.getHours());
  const minutes = formatNumber(d.getMinutes());
  const seconds = formatNumber(d.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
};

export function getRelativeTime(date: string): string {
  const now = new Date();
  const time = new Date(date);
  const diffMs = now.getTime() - time.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) {
    return i18n.t(`relativeTime.seconds`, {
      count: diffSec,
      plural: diffSec !== 1 ? "plural" : "",
    });
  }

  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) {
    return i18n.t(`relativeTime.minutes`, {
      count: diffMin,
      plural: diffMin !== 1 ? "plural" : "",
    });
  }

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) {
    return i18n.t(`relativeTime.hours`, {
      count: diffHours,
      plural: diffHours !== 1 ? "plural" : "",
    });
  }

  const diffDays = Math.floor(diffHours / 24);
  return i18n.t(`relativeTime.days`, {
    count: diffDays,
    plural: diffDays !== 1 ? "plural" : "",
  });
}

// const months = [
//   "january",
//   "february",
//   "march",
//   "april",
//   "may",
//   "june",
//   "july",
//   "august",
//   "september",
//   "october",
//   "november",
//   "december",
// ];

// export const getStatsPeriod = (period: string): string => {
//   const month = months[+period.split("-")[1] - 1];

//   return `${translate(month as any)} ${period.split("-")[0]}`;
// };
