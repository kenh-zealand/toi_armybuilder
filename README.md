# Tide of Iron · Battle Builder

A fan‑made, unofficial **points and army‑builder system** for the board wargame
*Tide of Iron* (Fantasy Flight Games / 1A Games) and every expansion — in the
spirit of Bolt Action, Flames of War and Warhammer.

Tide of Iron shipped without a points system; its battles are scenario‑based.
This is a house rule that lets you build your own reasonably balanced forces
across the whole line, review them, and print them.

**Not affiliated with Fantasy Flight Games or 1A Games.** Unit data is
compiled from the FFG / 1A rulebooks and the community reference at
[commandsandcolors.net/tideofiron](https://www.commandsandcolors.net/tideofiron).
Points, doctrines, the order of battle and scenario modifiers are this
project's own house rules.

## Use it

Open **`index.html`** in a browser — it's a single self‑contained file, no
build step, no dependencies, nothing leaves your machine (saved lists live in
`localStorage`).

## What it does

- **Builder** — pick a nation, a scenario and (for asymmetric scenarios) your
  role; the scenario sets the effective points, whether fortification is
  allowed, reserves, deployment and victory conditions, and drives a live
  order‑of‑battle checklist.
- **Sets / Collections** — tick which boxes you own (All expansions, Days of
  the Fox, Normandy, Fury of the Bear, Stalingrad, Tools of War, plus opt‑in
  house‑rule and fan units); the arsenal responds live.
- **Squads** — build each squad figure by figure (regular / elite / officer),
  attach one specialization token (never on a weapon team — official rule),
  and assign a transport.
- **Specializations panel** — all ten tokens with full rules; assign / remove
  from here or from the squad row.
- **Auto‑fill** — generate a legal, scenario‑appropriate force to the points
  limit.
- **Review** — a formatted army sheet that itemises every purchase (figures,
  tokens, transport priced individually) with two‑profile stats
  (`Inf R/F · Veh R/F · Mv · Armor`), plus **Save as PDF**.
- **Compendium** — the full unit list by nation with tiers and sources, the
  specialization tokens, scenarios, fortifications, the points method,
  expansion history and a changelog.

## Editing

`tide-of-iron-armybuilder.html` is the source of truth (it's authored for
Claude Artifacts, which supply the outer HTML skeleton). Regenerate the
standalone page after editing:

```sh
node build.mjs      # writes index.html from the source
```

## Version

See the **Compendium → Version history** section, or `APP_VERSION` near the
top of the `<script>` block. The scheme is `1.N`, where `N` is the number of
revisions since the first release.
