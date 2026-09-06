import test from "node:test";
import assert from "node:assert/strict";

import { getUnitsForSelection, validateRoster } from "./army-builder.js";
import { buildValidationMarkup } from "./validation-view.js";

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

test("renders validation issues and clears them when valid", () => {
  const invalidMarkup = buildValidationMarkup(
    validateRoster({
      scenarioId: "extended-front",
      roster: ["alliance-captain", "alliance-rifle-team"],
    }),
  );
  const validMarkup = buildValidationMarkup(
    validateRoster({
      scenarioId: "extended-front",
      roster: ["alliance-captain", "alliance-rifle-team", "alliance-engineers"],
    }),
  );

  assert.match(invalidMarkup.summaryHtml, /Roster needs adjustments/);
  assert.match(invalidMarkup.summaryHtml, /status-warning/);
  assert.match(invalidMarkup.issuesHtml, /support unit/);
  assert.match(validMarkup.summaryHtml, /Roster is legal for this scenario/);
  assert.match(validMarkup.summaryHtml, /status-ok/);
  assert.equal(validMarkup.issuesHtml, "");
});

test("escapes html in validation markup", () => {
  const markup = buildValidationMarkup({
    scenario: {
      name: 'Scenario <Alpha>',
      description: 'Use & hold the "bridge"',
      maxPoints: 12,
      maxUnits: 4,
    },
    totalPoints: 3,
    unitCount: 1,
    isValid: false,
    issues: ['Missing <leader> & "support"'],
  });

  assert.match(markup.summaryHtml, /Scenario &lt;Alpha&gt;/);
  assert.match(markup.summaryHtml, /Use &amp; hold the &quot;bridge&quot;/);
  assert.doesNotMatch(markup.summaryHtml, /<Alpha>/);
  assert.match(markup.issuesHtml, /Missing &lt;leader&gt; &amp; &quot;support&quot;/);
  assert.doesNotMatch(markup.issuesHtml, /<leader>/);
});
