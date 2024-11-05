import { atom } from "recoil";

export const userState = atom({
  key: "counterState",
  default: {
    username: "",
    profilePic: "",
    walletAddress: "",
  },
});
