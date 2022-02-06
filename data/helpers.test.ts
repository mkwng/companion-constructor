import {it, expect, describe} from '@jest/globals';
import {Companion} from "./types";
import {getDifferences} from "./helpers";

const oldCompanion: Companion = {
  "name": "Houston-Harpp",
  "tokenId": 44,
  "properties": {
    "gender": "m",
    "pose": 2,
    "skin": {
      "r": 152,
      "g": 103,
      "b": 80
    },
    "hair": {
      "r": 37,
      "g": 36,
      "b": 49
    },
    "background": {
      "r": 229,
      "g": 218,
      "b": 179
    }
  },
  "attributes": {
    "hair": {
      "name": "fuzz"
    },
    "eyes": {
      "name": "smile"
    },
    "brows": {
      "name": "thicksad"
    },
    "mouth": {
      "name": "widesmile"
    },
    "nose": {
      "name": "wavewide"
    },
    "blemish": {
      "name": "stubblelg"
    },
    "headwear": {
      "name": "earphones"
    },
    "eyewear": {
      "name": "rounded"
    },
    "top": {
      "name": "buttonup",
      "color": [
        {
          "r": 163,
          "g": 192,
          "b": 191
        }
      ]
    },
    "bottom": {
      "name": "waist",
      "color": [
        {
          "r": 91,
          "g": 94,
          "b": 88
        }
      ]
    },
    "shoes": {
      "name": "rollerblades",
      "color": [
        {
          "r": 4,
          "g": 54,
          "b": 232
        },
        {
          "r": 75,
          "g": 164,
          "b": 103
        }
      ]
    }
  }
}

describe("getDifferences", () => {
  it("returns empty when there are no changes", async () => {
    const differences = getDifferences(oldCompanion, oldCompanion)
    expect(differences).toEqual([])
  });
  it("returns the proper cost and fields that have changed", async () => {
    let newCompanion = JSON.parse(JSON.stringify(oldCompanion));
    newCompanion.attributes.top.name = "fishnet";
    newCompanion.attributes.shoes.name = "sneaks";

    const differences = getDifferences(oldCompanion, newCompanion)
    expect(differences).toEqual([
      {
        cost: 10000,
        prev: 'buttonup',
        curr: 'fishnet',
        key: 'top',
        type: 'attribute'
      },
      {
        cost: 1000,
        prev: 'rollerblades',
        curr: 'sneaks',
        key: 'shoes',
        type: 'attribute'
      },
      {
        cost: 0,
        prev: 'lightblue',
        curr: '',
        key: 'topColor1',
        type: 'color'
      },
      {
        cost: 0,
        prev: 'green',
        curr: '',
        key: 'shoesColor2',
        type: 'color'
      }
    ])
  });
})
