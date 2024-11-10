import dayjs from "dayjs";

export function formatTime(time: number) {
  return dayjs(time * 1000).format("MM-DD HH:mm");
}

export function formatAddress(addr: string) {
  return addr.substring(0, 5) + "..." + addr.substr(-4);
}

export function formatPrice(price: number) {
  return price.toFixed(8);
}

export function formatPercent(val: string | number) {
  return Number(val).toFixed(2) + "%";
}

export const getBrowserLocale = (): string => navigator.language || "en-US";

export const formatNumber = (
  value: number | string,
  locale: string = getBrowserLocale(),
  options: Intl.NumberFormatOptions = { notation: "compact" }
): string => new Intl.NumberFormat(locale, options).format(Number(value));

export const formatNumberFor = (
  value: number | string | undefined,
  locale: string = getBrowserLocale(),
  options: Intl.NumberFormatOptions = { notation: "compact" }
): string => {
  // Check if the value is undefined or null
  if (value === 0 || value === null) {
    return "∞"; // Return infinity symbol
  }

  // Convert value to number
  const numericValue = Number(value);

  return new Intl.NumberFormat(locale, options).format(numericValue);
};

export const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

export function formatName(name: string) {
  if (name.length > 10) {
    return name.slice(0, 4) + "..." + name.slice(-4);
  }

  return name;
}