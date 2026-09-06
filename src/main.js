import { expansions, factions, scenarios, units } from "./data.js";
import {
  getScenarioById,
  getUnitsForSelection,
  validateRoster,
} from "./army-builder.js";

const state = {
  scenarioId: scenarios[0].id,
  faction: factions[0],
  enabledExpansions: [...scenarios[0].defaultExpansions],
  roster: [],
};

const scenarioSelect = document.querySelector("#scenario-select");
const factionSelect = document.querySelector("#faction-select");
const expansionOptions = document.querySelector("#expansion-options");
const availableUnitsList = document.querySelector("#available-units");
const rosterList = document.querySelector("#roster");
const summaryContainer = document.querySelector("#summary");
const issuesList = document.querySelector("#issues");

function renderSelect(select, options, value, getLabel = (option) => option) {
  select.innerHTML = options
    .map(
      (option) =>
        `<option value="${option.id ?? option}" ${
          (option.id ?? option) === value ? "selected" : ""
        }>${getLabel(option)}</option>`,
    )
    .join("");
}

function renderExpansionOptions() {
  expansionOptions.innerHTML = expansions
    .map(
      (expansion) => `<label>
        <input
          type="checkbox"
          value="${expansion.id}"
          ${state.enabledExpansions.includes(expansion.id) ? "checked" : ""}
        />
        ${expansion.name}
      </label>`,
    )
    .join("");
}

function renderAvailableUnits() {
  const availableUnits = getUnitsForSelection(state);
  availableUnitsList.innerHTML = availableUnits
    .map(
      (unit) => `<li>
        <div class="card-row">
          <div>
            <strong>${unit.name}</strong>
            <div class="meta">${unit.points} pts · ${unit.roles.join(", ")} · ${
              expansions.find((expansion) => expansion.id === unit.source)?.name
            }</div>
          </div>
          <button type="button" data-add="${unit.id}">Add</button>
        </div>
      </li>`,
    )
    .join("");

  if (!availableUnits.length) {
    availableUnitsList.innerHTML =
      "<li>No units are available for this faction and expansion selection.</li>";
  }
}

function renderRoster() {
  rosterList.innerHTML = state.roster
    .map((unitId, index) => {
      const unit = units.find((entry) => entry.id === unitId);

      return `<li>
        <div class="card-row">
          <div>
            <strong>${unit.name}</strong>
            <div class="meta">${unit.points} pts · ${unit.roles.join(", ")}</div>
          </div>
          <button type="button" class="secondary" data-remove="${index}">Remove</button>
        </div>
      </li>`;
    })
    .join("");

  if (!state.roster.length) {
    rosterList.innerHTML = "<li>Your roster is empty.</li>";
  }
}

function renderValidation() {
  const validation = validateRoster(state);
  summaryContainer.innerHTML = `
    <p><strong>${validation.scenario.name}</strong>: ${validation.scenario.description}</p>
    <p>${validation.totalPoints}/${validation.scenario.maxPoints} points · ${
      validation.unitCount
    }/${validation.scenario.maxUnits} units</p>
    <p class="${validation.isValid ? "status-ok" : "status-warning"}">${
      validation.isValid ? "Roster is legal for this scenario." : "Roster needs adjustments."
    }</p>
  `;

  issuesList.innerHTML = validation.issues
    .map((issue) => `<li>${issue}</li>`)
    .join("");
}

function syncScenarioDefaults() {
  const scenario = getScenarioById(state.scenarioId);
  state.enabledExpansions = [...scenario.defaultExpansions];
  state.roster = [];
}

function render() {
  renderSelect(scenarioSelect, scenarios, state.scenarioId, (scenario) => scenario.name);
  renderSelect(factionSelect, factions, state.faction);
  renderExpansionOptions();
  renderAvailableUnits();
  renderRoster();
  renderValidation();
}

scenarioSelect.addEventListener("change", (event) => {
  state.scenarioId = event.target.value;
  syncScenarioDefaults();
  render();
});

factionSelect.addEventListener("change", (event) => {
  state.faction = event.target.value;
  state.roster = [];
  render();
});

expansionOptions.addEventListener("change", (event) => {
  if (!(event.target instanceof HTMLInputElement)) {
    return;
  }

  state.enabledExpansions = Array.from(
    expansionOptions.querySelectorAll("input:checked"),
    (input) => input.value,
  );
  state.roster = state.roster.filter((unitId) => {
    const unit = units.find((entry) => entry.id === unitId);
    return unit && state.enabledExpansions.includes(unit.source);
  });
  render();
});

availableUnitsList.addEventListener("click", (event) => {
  const unitId = event.target.dataset.add;
  if (!unitId) {
    return;
  }

  state.roster = [...state.roster, unitId];
  render();
});

rosterList.addEventListener("click", (event) => {
  const index = Number.parseInt(event.target.dataset.remove ?? "", 10);
  if (Number.isNaN(index)) {
    return;
  }

  state.roster = state.roster.filter((_, unitIndex) => unitIndex !== index);
  render();
});

syncScenarioDefaults();
render();
