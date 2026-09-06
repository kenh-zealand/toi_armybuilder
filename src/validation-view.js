export function buildValidationMarkup(validation) {
  return {
    summaryHtml: `
      <p><strong>${validation.scenario.name}</strong>: ${validation.scenario.description}</p>
      <p>${validation.totalPoints}/${validation.scenario.maxPoints} points · ${
        validation.unitCount
      }/${validation.scenario.maxUnits} units</p>
      <p class="${validation.isValid ? "status-ok" : "status-warning"}">${
        validation.isValid
          ? "Roster is legal for this scenario."
          : "Roster needs adjustments."
      }</p>
    `,
    issuesHtml: validation.issues.map((issue) => `<li>${issue}</li>`).join(""),
  };
}
