import { Routes } from "../utils/Routes";
export type RootStackParamList = {
  [key in keyof typeof Routes]: undefined;
};
