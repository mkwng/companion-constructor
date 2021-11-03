import { colors } from "../colors";
import { AttributeDictionary } from "../helpers";

export const outline: AttributeDictionary = {
    needsTranslation: true,
    variants: [
      {
        restrictions: { gender: "f" },
        layers: [
          {
            path: "face/03-outline/fhead-g_f-c_outline.png",
            color: colors.default.black,
          },
        ],
      },
      {
        restrictions: { gender: "m" },
        layers: [
          {
            path: "face/03-outline/mhead-g_m-c_outline.png",
            color: colors.default.black,
          },
        ],
      },
    ],
  };