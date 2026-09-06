export const factions = ["Alliance", "Raiders"];

export const expansions = [
  { id: "core", name: "Core Set" },
  { id: "stormfront", name: "Stormfront Expansion" },
  { id: "ironclad", name: "Ironclad Expansion" },
];

export const units = [
  {
    id: "alliance-captain",
    name: "Alliance Captain",
    faction: "Alliance",
    points: 4,
    source: "core",
    roles: ["leader"],
  },
  {
    id: "alliance-rifle-team",
    name: "Alliance Rifle Team",
    faction: "Alliance",
    points: 2,
    source: "core",
    roles: ["troop"],
  },
  {
    id: "alliance-engineers",
    name: "Alliance Engineers",
    faction: "Alliance",
    points: 3,
    source: "stormfront",
    roles: ["support"],
  },
  {
    id: "alliance-tank",
    name: "Alliance Iron Tank",
    faction: "Alliance",
    points: 5,
    source: "ironclad",
    roles: ["vehicle"],
  },
  {
    id: "raider-warlord",
    name: "Raider Warlord",
    faction: "Raiders",
    points: 4,
    source: "core",
    roles: ["leader"],
  },
  {
    id: "raider-brutes",
    name: "Raider Brutes",
    faction: "Raiders",
    points: 2,
    source: "core",
    roles: ["troop"],
  },
  {
    id: "raider-sappers",
    name: "Raider Sappers",
    faction: "Raiders",
    points: 3,
    source: "stormfront",
    roles: ["support"],
  },
  {
    id: "raider-walker",
    name: "Raider Walker",
    faction: "Raiders",
    points: 5,
    source: "ironclad",
    roles: ["vehicle"],
  },
];

export const scenarios = [
  {
    id: "breakthrough",
    name: "Breakthrough",
    description: "Fast attack scenario with a small force cap.",
    maxPoints: 10,
    maxUnits: 4,
    requiredRoles: ["leader", "troop"],
    defaultExpansions: ["core"],
  },
  {
    id: "extended-front",
    name: "Extended Front",
    description: "Larger battle that uses support elements.",
    maxPoints: 14,
    maxUnits: 5,
    requiredRoles: ["leader", "troop", "support"],
    defaultExpansions: ["core", "stormfront"],
  },
  {
    id: "armored-push",
    name: "Armored Push",
    description: "Vehicle-centric scenario with all published sets enabled.",
    maxPoints: 18,
    maxUnits: 6,
    requiredRoles: ["leader", "troop", "vehicle"],
    defaultExpansions: ["core", "stormfront", "ironclad"],
  },
];
