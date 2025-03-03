import { atom } from "recoil";

export const npcDialogAtom = atom<{
  isVisible: boolean;
  message: string;
}>({
  key: "npcDialogAtom",
  default: {
    isVisible: false,
    message: "",
  },
});
