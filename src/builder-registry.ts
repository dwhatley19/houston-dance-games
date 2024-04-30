"use client";
import { builder, Builder } from "@builder.io/react";
import Counter from "./components/Counter/Counter";
import WorldMap from "./components/WorldMap/WorldMap";

builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

Builder.registerComponent(Counter, {
  name: "Counter",
  inputs: [
    {
      name: "initialCount",
      type: "number",
    },
  ],
});

Builder.registerComponent(WorldMap, {
  name: "World Map",
  inputs: [
    {
      name: "locations",
      type: "list",
      defaultValue: [],
      subFields: [
        {
          name: "markerOffset",
          type: "number",
          defaultValue: -20,
        },
        {
          name: "name",
          type: "text",
          defaultValue: "Unnamed Location",
        },
        {
          name: "coordinates",
          type: "object",
          defaultValue: {x: 0, y: 0},
          subFields: [
            {
              name: "x",
              type: "number",
              required: true,
            },
            {
              name: "y",
              type: "number",
              required: true,
            }
          ]
        },
        {
          name: "information",
          type: "longText",
          defaultValue: "No information available yet.",
        },
        {
          name: "link",
          type: "text",
        },
        {
          name: "size",
          type: "number",
          defaultValue: 15,
        },
        {
          name: "color",
          type: "text",
          defaultValue: "#E42A1D",
        },
        {
          name: "stroke",
          type: "text",
          defaultValue: "#FFF",
        },
        {
          name: "strokeWidth",
          type: "number",
          defaultValue: 2,
        },
      ]
    },
  ],
});

// interface Marker {
//   markerOffset: number;
//   name: string;
//   coordinates: number[];
//   information?: string;
//   link?: string;
//   size?: number;
//   color?: string;
//   stroke?: string;
//   strokeWidth?: number;
// }
