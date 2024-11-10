// atoms/messageAtoms.ts
import { atom } from 'recoil';

export interface Message {
  _id: string;
  message: string;
  username: string;
  profilePic: string;
  timestamp: number;
  marginClass?: string;
  textClampClass?: string;
  isEmpty: boolean;
  rowSpanClass?: string;
  colSpanClass?: string;
}

export const messagesState = atom<Message[]>({
  key: 'messagesState',
  default: [],
});

export const messageModalState = atom<{
  isOpen: boolean;
  message: Message;
}>({
  key: 'messageModalState',
  default: {
    isOpen: false,
    message: {} as Message,
  },
});