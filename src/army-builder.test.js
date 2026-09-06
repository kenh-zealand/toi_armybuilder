import test from "node:test";
import assert from "node:assert/strict";

import { getUnitsForSelection, validateRoster } from "./army-builder.js";

test("filters units by faction and enabled expansions", () => {
  const results = getUnitsForSelection({
    scenarioId: "armored-push",
    faction: "Alliance",
    enabledExpansions: ["core", "ironclad"],
  });

  assert.deepEqual(
    results.map((unit) => unit.id),
    ["alliance-captain", "alliance-rifle-team", "alliance-tank"],
  );
});

test("accepts a legal roster for breakthrough", () => {
  const validation = validateRoster({
    scenarioId: "breakthrough",
    roster: ["alliance-captain", "alliance-rifle-team", "alliance-rifle-team"],
  });

  assert.equal(validation.isValid, true);
  assert.equal(validation.totalPoints, 8);
  assert.deepEqual(validation.issues, []);
});

test("reports missing required role and unit overflow", () => {
  const validation = validateRoster({
    scenarioId: "extended-front",
    roster: [
      "alliance-captain",
      "alliance-rifle-team",
      "alliance-rifle-team",
      "alliance-rifle-team",
      "alliance-rifle-team",
      "alliance-rifle-team",
    ],
  });

  assert.equal(validation.isValid, false);
  assert.match(validation.issues.join(" "), /exceeding the 5 unit limit/);
  assert.match(validation.issues.join(" "), /requires at least one support unit/);
});

test("reports point overflow", () => {
  const validation = validateRoster({
    scenarioId: "breakthrough",
    roster: ["alliance-captain", "alliance-tank", "alliance-rifle-team"],
  });

  assert.equal(validation.isValid, false);
  assert.match(validation.issues.join(" "), /exceeding the 10 point limit/);
});
