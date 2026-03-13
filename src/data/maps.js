import ascent from "../assets/maps/ascent.webp";
import bind from "../assets/maps/bind.webp";
import breeze from "../assets/maps/breeze.webp";
import fracture from "../assets/maps/fracture.webp";
import haven from "../assets/maps/haven.webp";
import icebox from "../assets/maps/icebox.webp";
import lotus from "../assets/maps/lotus.webp";
import pearl from "../assets/maps/pearl.webp";
import split from "../assets/maps/split.webp";
import sunset from "../assets/maps/sunset.webp";
import abyss from "../assets/maps/abyss.webp";
import corrode from "../assets/maps/corrode.webp";

export const valorantMaps = [
  { id: "ascent", name: "Ascent", image: ascent },
  { id: "bind", name: "Bind", image: bind },
  { id: "breeze", name: "Breeze", image: breeze },
  { id: "fracture", name: "Fracture", image: fracture },
  { id: "haven", name: "Haven", image: haven },
  { id: "icebox", name: "Icebox", image: icebox },
  { id: "lotus", name: "Lotus", image: lotus },
  { id: "pearl", name: "Pearl", image: pearl },
  { id: "split", name: "Split", image: split },
  { id: "sunset", name: "Sunset", image: sunset },
  { id: "abyss", name: "Abyss", image: abyss },
  { id: "corrode", name: "Corrode", image: corrode },
];

export const banStepBO3 = [
  { step: 1, team: "Team 1", action: "Banned" },
  { step: 2, team: "Team 2", action: "Banned" },
  { step: 3, team: "Team 1", action: "Picked" },
  { step: 4, team: "Team 2", action: "Picked" },
  { step: 5, team: "Team 1", action: "Banned" },
  { step: 6, team: "Team 2", action: "Banned" },
  { step: 7, team: "", action: "Decider" },
];

export const banStepBO5 = [
  { step: 1, team: "Team 1", action: "Banned" },
  { step: 2, team: "Team 2", action: "Banned" },
  { step: 3, team: "Team 1", action: "Picked" },
  { step: 4, team: "Team 2", action: "Picked" },
  { step: 5, team: "Team 1", action: "Picked" },
  { step: 6, team: "Team 2", action: "Picked" },
  { step: 7, team: "", action: "Decider" },
];
