import { expansions, factions, scenarios, units } from "./data.js";
import {
  getScenarioById,
  getUnitsForSelection,
  validateRoster,
} from "./army-builder.js";
import { escapeHtml } from "./html.js";
import { buildValidationMarkup } from "./validation-view.js";

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
        `<option value="${escapeHtml(option.id ?? option)}" ${
          (option.id ?? option) === value ? "selected" : ""
        }>${escapeHtml(getLabel(option))}</option>`,
    )
    .join("");
}

function renderExpansionOptions() {
  expansionOptions.innerHTML = expansions
    .map(
      (expansion) => `<label>
        <input
          type="checkbox"
          value="${escapeHtml(expansion.id)}"
          ${state.enabledExpansions.includes(expansion.id) ? "checked" : ""}
        />
        ${escapeHtml(expansion.name)}
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
            <strong>${escapeHtml(unit.name)}</strong>
            <div class="meta">${unit.points} pts · ${escapeHtml(
              unit.roles.join(", "),
            )} · ${escapeHtml(
              expansions.find((expansion) => expansion.id === unit.source)?.name ?? unit.source,
            )}</div>
          </div>
          <button type="button" data-add="${escapeHtml(unit.id)}">Add</button>
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
  const rosterMarkup = state.roster
    .flatMap((unitId, index) => {
      const unit = units.find((entry) => entry.id === unitId);
      if (!unit) {
        return [];
      }

      return [`<li>
        <div class="card-row">
          <div>
            <strong>${escapeHtml(unit.name)}</strong>
            <div class="meta">${unit.points} pts · ${escapeHtml(
              unit.roles.join(", "),
            )}</div>
          </div>
          <button type="button" class="secondary" data-remove="${index}">Remove</button>
        </div>
      </li>`];
    })
    .join("");

  rosterList.innerHTML = rosterMarkup;

  if (!rosterMarkup) {
    rosterList.innerHTML = "<li>Your roster is empty.</li>";
  }
}

function renderValidation() {
  const validation = validateRoster(state);
  const markup = buildValidationMarkup(validation);
  summaryContainer.innerHTML = markup.summaryHtml;
  issuesList.innerHTML = markup.issuesHtml;
  issuesList.hidden = !markup.issuesHtml;
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
  render();
});

availableUnitsList.addEventListener("click", (event) => {
  const button =
    event.target instanceof Element
      ? event.target.closest("button[data-add]")
      : null;
  const unitId = button?.dataset.add;
  if (!unitId) {
    return;
  }

  state.roster = [...state.roster, unitId];
  render();
});

rosterList.addEventListener("click", (event) => {
  const button =
    event.target instanceof Element
      ? event.target.closest("button[data-remove]")
      : null;
  const index = Number.parseInt(button?.dataset.remove ?? "", 10);
  if (Number.isNaN(index)) {
    return;
  }

  state.roster = state.roster.filter((_, unitIndex) => unitIndex !== index);
  render();
});

syncScenarioDefaults();
render();
