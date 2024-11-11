import { atom } from "recoil";

const userPreferences = localStorage.getItem("userPreferences");
const parsedPreferences = userPreferences ? JSON.parse(userPreferences) : {};

export const animationState = atom<string>({
  key: "animationState",
  default: parsedPreferences.chatAnimation || "",
});
