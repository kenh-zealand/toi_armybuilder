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

## Try it locally

Download the repo and double‑click **`index.html`** — it opens in your
browser and works completely offline. Nothing is installed, nothing is sent
anywhere; saved army lists stay in that browser on that computer.

## Publish it (so others can use it)

The app is one static folder, so any static host works. The simplest, free
option:

1. In this repo on GitHub, go to **Settings → Pages**.
2. Under *Build and deployment*, set **Source: Deploy from a branch**,
   **Branch: `main`**, folder **`/ (root)`**, and **Save**.
3. Wait ~1 minute. GitHub gives you a link like
   `https://<your-username>.github.io/toi_armybuilder/`.

Share that link. Anyone can open it in a browser — no account, no install
needed. Every time you `git push` (after `node build.mjs`) the link updates
automatically.

*(Alternative with no settings to change: drag the repo folder onto
[app.netlify.com/drop](https://app.netlify.com/drop) for an instant link.)*

## Send this to players

Once you have a link, this is the whole message you need to send them:

> **Tide of Iron Battle Builder:** `<your link here>`
>
> Open it in any browser. To keep it handy like an app:
> - **Phone (iPhone):** tap Share → *Add to Home Screen*.
> - **Phone (Android):** menu (⋮) → *Install app* / *Add to Home screen*.
> - **Computer (Chrome or Edge):** click the small install icon at the right
>   end of the address bar.
>
> After that it opens full‑screen and keeps working with no internet. Your
> saved lists live on that one device — use **Save as PDF** or **Export** in
> the app to keep a copy you can share or print.

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
Claude Artifacts, which supply the outer HTML skeleton). After editing it,
rebuild the distributable:

```sh
node build.mjs
```

which regenerates `index.html` (skeleton + PWA wiring), `sw.js` (cache name
stamped with the current `APP_VERSION`), and the PNG icons. `manifest.webmanifest`,
`icon.svg` and `favicon.svg` are static.

## Version

See the **Compendium → Version history** section, or `APP_VERSION` near the
top of the `<script>` block. The scheme is `1.N`, where `N` is the number of
revisions since the first release.
