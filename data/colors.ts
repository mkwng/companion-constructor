import { RGBColor } from "./helpers";

export const colors: {
  [key: string]: { [key: string]: RGBColor };
} = {
  default: {
    black: { r: 0, g: 0, b: 0 },
    white: { r: 255, g: 255, b: 255 },
    red: { r: 255, g: 0, b: 0 },
  },
};