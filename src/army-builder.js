import { scenarios, units } from "./data.js";

const unitById = new Map(units.map((unit) => [unit.id, unit]));

export function getScenarioById(scenarioId) {
  return scenarios.find((scenario) => scenario.id === scenarioId) ?? scenarios[0];
}

export function getUnitsForSelection({
  scenarioId,
  faction,
  enabledExpansions,
}) {
  const scenario = getScenarioById(scenarioId);
  const expansionSet = new Set(
    enabledExpansions?.length ? enabledExpansions : scenario.defaultExpansions,
  );

  return units.filter(
    (unit) => unit.faction === faction && expansionSet.has(unit.source),
  );
}

export function summarizeRoster({ scenarioId, roster }) {
  const scenario = getScenarioById(scenarioId);
  const selectedUnits = roster
    .map((unitId) => unitById.get(unitId))
    .filter(Boolean);
  const totalPoints = selectedUnits.reduce((sum, unit) => sum + unit.points, 0);
  const roleCounts = selectedUnits.reduce((counts, unit) => {
    unit.roles.forEach((role) => {
      counts[role] = (counts[role] ?? 0) + 1;
    });
    return counts;
  }, {});

  return {
    scenario,
    selectedUnits,
    totalPoints,
    roleCounts,
    unitCount: selectedUnits.length,
  };
}

export function validateRoster({ scenarioId, roster, faction, enabledExpansions }) {
  const summary = summarizeRoster({ scenarioId, roster });
  const { scenario, totalPoints, unitCount, roleCounts } = summary;
  const issues = [];
  const availableUnitIds = faction
    ? new Set(
        getUnitsForSelection({ scenarioId, faction, enabledExpansions }).map(
          (unit) => unit.id,
        ),
      )
    : null;

  if (unitCount > scenario.maxUnits) {
    issues.push(
      `Roster has ${unitCount} units, exceeding the ${scenario.maxUnits} unit limit.`,
    );
  }

  if (totalPoints > scenario.maxPoints) {
    issues.push(
      `Roster has ${totalPoints} points, exceeding the ${scenario.maxPoints} point limit.`,
    );
  }

  for (const role of scenario.requiredRoles) {
    if (!roleCounts[role]) {
      issues.push(`Roster requires at least one ${role} unit for ${scenario.name}.`);
    }
  }

  for (const unit of summary.selectedUnits) {
    if (availableUnitIds && !availableUnitIds.has(unit.id)) {
      issues.push(
        `${unit.name} is not available for the current faction and expansion selection.`,
      );
    }
  }

  return {
    ...summary,
    issues,
    isValid: issues.length === 0,
  };
}
