import { atom } from "recoil";

export const audioState = atom({
  key: "audioState",
  default: {
    reaction: false,
    message: false,
    ambience: false,
  },
});
