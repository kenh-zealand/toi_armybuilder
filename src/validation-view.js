import { escapeHtml } from "./html.js";

export function buildValidationMarkup(validation) {
  return {
    summaryHtml: `
      <p><strong>${escapeHtml(validation.scenario.name)}</strong>: ${escapeHtml(
        validation.scenario.description,
      )}</p>
      <p>${validation.totalPoints}/${validation.scenario.maxPoints} points · ${
        validation.unitCount
      }/${validation.scenario.maxUnits} units</p>
      <p class="${validation.isValid ? "status-ok" : "status-warning"}">${
        validation.isValid
          ? "Roster is legal for this scenario."
          : "Roster needs adjustments."
      }</p>
    `,
    issuesHtml: validation.issues
      .map((issue) => `<li>${escapeHtml(issue)}</li>`)
      .join(""),
  };
}
