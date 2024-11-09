export function formatTimestamp(timestamp: string) {
  if (timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    const formattedTime = `${hours % 12 || 12}:${minutes} ${ampm}`;

    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      return formattedTime;
    } else {
      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();
      return `${formattedTime} - ${month} ${day}`;
    }
  } else {
    return;
  }
}