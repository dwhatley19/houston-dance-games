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
      name: "locationsJson",
      type: "text",
    },
  ],
});
