# Build prompt — "Tide of Iron · Battle Builder" (v1.13)

Paste everything below the line into a capable chatbot to recreate this app.
It is a complete specification: data, rules, features, and design.

---

## ROLE

You are building a finished web app in **one self‑contained HTML file**.
Vanilla HTML/CSS/JS, no framework, no build step, no dependencies except
Google Fonts. All state in memory; saved army lists and the theme choice in
`localStorage`. Must work well on a phone and support light + dark themes.

Deliver the whole file, ready to open in a browser.

## WHAT IT IS

**Tide of Iron · Battle Builder** — a fan‑made, unofficial **points and
army‑builder system** for the WWII board wargame *Tide of Iron* (Fantasy
Flight Games / 1A Games) and every expansion, in the spirit of Bolt Action,
Flames of War and Warhammer. Tide of Iron shipped without a points system;
this is a house rule for building balanced custom forces, reviewing them, and
printing them.

Show a disclaimer (footer + compendium): *not affiliated with FFG / 1A; unit
data compiled from the FFG / 1A rulebooks and commandsandcolors.net/tideofiron;
points, doctrines, order of battle and scenario modifiers are the project's
own house rules.* Where FFG (2008) and 1A "Next Wave / Tools of War" (2015)
editions disagree on a unit's numbers, use the FFG values.

## DESIGN SYSTEM

- **Fonts (Google Fonts):** *Barlow Condensed* 600/700 for headings and
  uppercase labels; *IBM Plex Sans* 400/500/600 for body text; *IBM Plex Mono*
  400/500 for numbers, points and stat lines.
- **Look:** WWII field manual. Warm near‑white "paper", khaki page ground,
  **very dark ink with high contrast** (secondary text must clear WCAG AA —
  aim ≥ 6:1 light, ≥ 5:1 dark; the content must not blend into the khaki
  background, this matters on mobile). Olive‑drab primary, oxide‑red accent
  used sparingly, brass as a secondary accent. Semantic colours green = OK,
  amber = warning, oxide‑red = fail — kept separate from the accent.
- **Themes:** default follows `prefers-color-scheme`; a manual **Light / dark**
  toggle in the masthead persists to `localStorage`. Define the palette as CSS
  custom properties on `:root`, redefine under `@media (prefers-color-scheme:
  dark)` guarded so an explicit light choice wins, and again under
  `:root[data-theme="dark"]`.
- **Body font size** ~15.5px, 16px on screens ≤ 640px, line‑height ~1.58.
- **Layout:** masthead (eyebrow, title "Tide of Iron · Battle Builder" with a
  version badge, one‑line subtitle, a 3‑tab switch **Builder | Review |
  Compendium**, a stencil rule). Then a command bar, a "Sets" chip row, then
  the active view. Builder is a two‑column grid (arsenal left, sticky force
  panel right) that stacks under ~940px.

## STAT NOTATION

Every unit shows two target profiles, matching the ToI unit cards:
`Inf R/F · Veh R/F · Mv M · Armor A`, where each pair is **range / firepower**
against infantry / against vehicles. Firepower = attack dice; range in spaces.
Include a small legend explaining this, and a compendium note that plain
infantry can only hit a vehicle when adjacent (`Veh 1/1`) — which is what the
Anti‑Tank token fixes.

## DATA

### Figure building blocks (per figure in a squad)

| Figure | Pts | Stat |
|---|---|---|
| Regular | 5 | Inf 4/1 · Veh 1/1 · Mv 4 |
| Elite | 9 | Inf 4/2 · Veh 1/1 · Mv 4 · Battle‑Hardened |
| Officer | 13 | Inf 4/1 · Veh 1/1 · Mv 4 · Rally, +move, +cover |

### Squad templates (every nation has all five)

- **Command Squad** — 1 Officer + up to 3 figures. Rally, Fast Recovery,
  +1 movement and +1 cover vs suppressive fire.
- **Rifle Squad** — 4 figure slots, starts 4 Regular. May carry one
  specialization token.
- **Elite squad** — 4 slots, starts 4 Elite. Name per nation:
  USA/Germany/Britain "Elite Infantry", Soviet "Guards Infantry (elite)",
  Japan "Naval Landing Force (SNLF)".
- **Machine Gun Team** — flat **17 pts**, `Inf 5/3 · Veh 3/2 · Mv 4`, 2‑crew,
  Heavy Weapon, Rapid Op Fire. (German MG: Inf 5/4.)
- **Mortar Team** — flat **21 pts**, `Inf 8/4 · Veh 8/2 · Mv 4`, 2‑crew,
  area / indirect fire (no LOS), minimum range 1, no Op Fire.

Squad `src` (collection): USA & Germany `Base`, Britain `Days of the Fox`,
Soviet `Fury of the Bear`, Japan `fan: Tail of the Dragon`.

### Specialization tokens (the small pieces you attach to an infantry squad)

Rule: **max one per squad**, and **never on a squad with a heavy weapon**
(machine gun or mortar team) — enforce this everywhere (no dropdown on weapon
teams, auto‑fill never assigns to them, cost logic force‑nulls any spec on a
weapon team).

| Token | Source | Pts | Rule |
|---|---|---|---|
| Anti‑Tank | Base | 12 | vs vehicles the squad fires at range 3 (not the normal 1) with +3 firepower — even when supporting another unit's attack |
| Flamethrower | Base | 14 | attack an adjacent space (range 1) only: +2 firepower, target −5 cover (min 0); armour still applies |
| Engineer | Base | 8 | dig an entrenchment (fatigues squad); clear razor wire for 2 MP; lay smoke; not slowed by wire |
| Medic | Base | 8 | Bandage: +1 cover vs normal attacks to this squad + squads in its space. Heal: fatigue, roll 4–6 to return a Regular figure |
| Recon | Days of the Fox | 7 | +1 movement (on top of leader bonus); cannot be attacked at long range |
| Alpha Unit (experience) | Days of the Fox | 9 | Elite squad, 1 star; upgrades after a solo fire action with 2+ hits; +1 firepower vs infantry per star (Bronze / Silver Star / Medal of Honor markers) |
| Bravo Unit (experience) | Days of the Fox | 9 | Elite squad, 1 star; upgrades after surviving an attack of 2+ hits; +1 cover per star |
| Demolitions | Normandy | 10 | place a charge (2 MP during Advance); detonate as an action or via Op Fire: 3 automatic hits to every unit in the space / pillbox (roll armour & cover) |
| Expert | Fury of the Bear | 13 | Adaptability: re‑roll one attack die of your choice per figure when the squad attacks (no die twice) |
| Saboteur | Fury of the Bear | 7 | takes all neutral + own‑nation Sabotage cards; play them to disrupt enemy Strategy decks near enemy command objectives |

Also mention (compendium only, not buildable): **experience star tokens**
(Bronze / Silver Star / Medal of Honor) and **munitions tokens** for vehicles
(HE, AP‑B, AP‑C, Smoke).

### Doctrines (optional house rule, one per nation)

| Nation | Doctrine | Effect |
|---|---|---|
| USA | Combined Arms | all transports cost 20% less; deep armour / spec pool |
| Germany | Kampfkraft | one rifle squad may deploy with elite figures for −3 pts; heavy‑tank cap rises to 1 per 500 pts |
| Britain | Steady Under Fire | each round, the first of your squads that would be pinned is not pinned |
| Soviet | Not One Step Back | Regular figures cost 4 pts; Mass Assault: up to two Regular squads activate together; Elite (Guards) max 1 per 500 pts |
| Japan | Banzai | assault attacks +2 firepower; squads ignore the first pin while adjacent to the enemy; light and medium tanks only |

Mechanically implemented: USA transport −20%, Soviet Regular figure −1
(→ 4 pts), Germany heavy‑tank cap uses /500, Japan blocks heavy tanks.

### Transports (per nation) — `name | source | tier | pts | stat | capacity`

- **USA:** M3A1 Half‑track | Base | core | 25 | Inf 5/4 · Veh 3/2 · Mv 7 · Armor 1 · Transport 1 | 1 · GMC CCKW 353 truck | Base | core | 10 | no attack · Mv 6 · Transport 2 | 2
- **Germany:** Sd.Kfz. 251 Half‑track | Base | core | 25 | Inf 5/4 · Veh 3/2 · Mv 7 · Armor 1 · Transport 1 | 1 · Opel Blitz 3‑t truck | Base | core | 10 | no attack · Mv 6 · Transport 2 | 2
- **Britain:** Universal (Bren) Carrier | Days of the Fox | core | 18 | Inf 5/3 · Veh 3/1 · Mv 7 · Armor 1 · Transport 1 · recon | 1 · Bedford truck | House rule | ext | 10 | no attack · Mv 6 · Transport 2 | 2
- **Soviet:** GMC truck (Soviet colours) | Fury of the Bear | core | 10 | no attack · Mv 6 · Transport 2 | 2 · M3A1 Half‑track (Soviet colours) | Fury of the Bear | core | 25 | Inf 5/4 · Veh 3/2 · Mv 7 · Armor 1 · Transport 1 | 1
- **Japan:** Type 94 truck | fan: Tail of the Dragon | fan | 10 | no attack · Mv 6 · Transport 2 | 2 · LVT‑4 (vs USMC) | fan: Tail of the Dragon | fan | 22 | Inf 4/3 · Veh 1/1 · Mv 6 · Armor 1 · Transport 1 · amphibious | 1

A transport is assigned to an infantry squad (does not use a vehicle slot).

### Vehicles & guns — `name | source | tier | pts | stat | class`

classes: `light`, `med`, `heavy`, `td`. tier: `core` (in a box), `ext`
(house‑rule / 1A supplement), `fan`.

**USA vehicles**
- M4A1 Sherman | Base | core | 75 | Inf 5/6 · Veh 6/8 · Mv 6 · Armor 4 · Concussive | med
- M10 Wolverine | Normandy | core | 85 | Inf 5/6 · Veh 7/10 · Mv 6 · Armor 4 · Penetration, open top | td
- M5A1 Stuart | House rule | ext | 45 | Inf 5/5 · Veh 4/5 · Mv 7 · Armor 3 | light
- M4A3E8 "Easy Eight" | House rule | ext | 95 | Inf 5/6 · Veh 6/9 · Mv 6 · Armor 4 | med
- M26 Pershing | House rule | ext | 130 | Inf 5/7 · Veh 7/12 · Mv 5 · Armor 5 · thick armor | heavy

**USA guns**
- M1 57 mm anti‑tank gun | Days of the Fox | core | 32 | Inf 5/4 · Veh 7/9 · Armor 2 · Equipment · fragile

**Germany vehicles**
- Panzer IV | Base | core | 70 | Inf 5/6 · Veh 8/10 · Mv 6 · Armor 4 | med
- Panzer VI Tiger I | Base | core | 145 | Inf 5/6 · Veh 8/13 · Mv 5 · Armor 6 · thick armor | heavy
- Panzer III | Days of the Fox | core | 55 | Inf 5/6 · Veh 6/6 · Mv 6 · Armor 3 | light
- Panzer V Panther | Days of the Fox | core | 115 | Inf 5/6 · Veh 8/12 · Mv 7 · Armor 5 · thick armor | med
- StuG III Ausf. G | Normandy | core | 65 | Inf 5/6 · Veh 6/9 · Mv 6 · Armor 4 · no turret | td
- Jagdpanzer IV | Normandy | core | 80 | Inf 5/6 · Veh 6/10 · Mv 6 · Armor 4 · low profile | td
- Tiger II (King Tiger) | Normandy | core | 185 | Inf 5/6 · Veh 9/13 · Mv 5 · Armor 6 · extra thick armor | heavy
- StuIG 33B | Stalingrad / Tools of War | ext | 70 | Inf 4/9 · Veh 4/6 · Mv 5 · Armor 4 · heavy assault gun, short range | td
- Marder III | House rule | ext | 55 | Inf 5/5 · Veh 7/10 · Mv 6 · Armor 1 · open top, fragile | td
- Jagdpanther | House rule | ext | 130 | Inf 5/6 · Veh 8/13 · Mv 6 · Armor 5 · thick armor | td

**Germany guns**
- 8.8 cm Flak 36 | Days of the Fox | core | 55 | Inf 5/4 · Veh 9/13 · Armor 2 · Equipment · dual‑purpose
- 7.5 cm PaK 40 | Fury of the Bear | core | 38 | Inf 5/3 · Veh 7/10 · Armor 2 · Equipment · fragile
- 5 cm PaK 38 | House rule | ext | 28 | Inf 5/3 · Veh 6/7 · Armor 2 · Equipment · fragile

**Britain vehicles**
- Matilda II | Days of the Fox | core | 70 | Inf 5/5 · Veh 6/6 · Mv 4 · Armor 5 · thick armor, slow | med
- Crusader | Days of the Fox | core | 50 | Inf 5/5 · Veh 6/6 · Mv 7 · Armor 3 · fast | light
- Sherman V Firefly | Tools of War (1A) | ext | 105 | Inf 5/6 · Veh 7/12 · Mv 6 · Armor 4 · 17‑pdr | med
- M3 Grant | House rule | ext | 60 | Inf 5/6 · Veh 6/7 · Mv 6 · Armor 3 | med
- Churchill | House rule | ext | 82 | Inf 5/5 · Veh 6/7 · Mv 4 · Armor 5 · thick armor | med
- Cromwell | House rule | ext | 80 | Inf 5/6 · Veh 6/8 · Mv 7 · Armor 4 · fast | med

**Britain guns**
- QF 6‑pounder anti‑tank gun | Days of the Fox | core | 32 | Inf 5/4 · Veh 7/9 · Armor 2 · Equipment · fragile
- QF 2‑pounder anti‑tank gun | Tools of War (1A) | ext | 20 | Inf 5/3 · Veh 6/6 · Armor 2 · Equipment · fragile
- QF 17‑pounder anti‑tank gun | House rule | ext | 45 | Inf 5/4 · Veh 7/12 · Armor 2 · Equipment · fragile

**Soviet vehicles**
- T‑34/76 | Fury of the Bear | core | 80 | Inf 5/6 · Veh 6/9 · Mv 7 · Armor 4 · sloped armor | med
- KV‑1 | Fury of the Bear | core | 105 | Inf 5/6 · Veh 6/8 · Mv 5 · Armor 5 · thick armor | heavy
- SU‑122 assault gun | Fury of the Bear | core | 75 | Inf 5/7 · Veh 5/8 · Mv 6 · Armor 4 · howitzer | td
- T‑70 light tank | Stalingrad | core | 35 | Inf 5/4 · Veh 4/4 · Mv 7 · Armor 2 | light
- T‑34/85 | House rule | ext | 100 | Inf 5/6 · Veh 7/11 · Mv 7 · Armor 4 | med
- SU‑85 | House rule | ext | 95 | Inf 5/6 · Veh 7/11 · Mv 6 · Armor 4 | td
- SU‑152 "Zveroboy" | House rule | ext | 120 | Inf 5/8 · Veh 5/13 · Mv 6 · Armor 4 · heavy shell | td
- IS‑2 | House rule | ext | 150 | Inf 5/6 · Veh 8/13 · Mv 5 · Armor 6 · thick armor | heavy

**Soviet guns**
- ZiS‑3 76.2 mm gun | Fury of the Bear | core | 38 | Inf 5/5 · Veh 7/10 · Armor 2 · Equipment · dual‑purpose
- 45 mm anti‑tank gun | House rule | ext | 26 | Inf 5/3 · Veh 6/7 · Armor 2 · Equipment · fragile

**Imperial Japan (fan nation) vehicles**
- Type 95 Ha‑Go | fan | fan | 32 | Inf 5/4 · Veh 4/4 · Mv 6 · Armor 2 | light
- Type 97 Chi‑Ha | fan | fan | 45 | Inf 5/5 · Veh 5/5 · Mv 6 · Armor 3 | med
- Type 1 Ho‑Ni | fan | fan | 60 | Inf 5/6 · Veh 6/9 · Mv 6 · Armor 2 · open top | td

**Japan guns**
- Type 1 47 mm anti‑tank gun | fan | fan | 28 | Inf 5/3 · Veh 6/8 · Armor 2 · Equipment · fragile
- Type 92 70 mm battalion gun | fan | fan | 40 | Inf 5/5 · Veh 4/4 · Armor 2 · Equipment · area / direct

(all Japan `src` = `fan: Tail of the Dragon`)

### Fortifications (defender only; scenario‑gated)

| Element | Source | Pts | Effect |
|---|---|---|---|
| Entrenchment / dug‑in position | Base | 5 | +2 cover · vehicles cannot enter |
| Pillbox | Base | 15 | +6 cover · blocks vehicles |
| Razor Wire | Base | 3 | stops non‑engineer squads and light vehicles; half firepower in the space |
| Tank Traps / dragon's teeth | Base | 4 | blocks vehicles; +1 cover |
| Minefield | Base | 8 | hits on entry |
| Bunker (multi‑space) | Normandy | 25 | coastal fortification, very high cover — only offered when the scenario allows a bunker |

Equipment (guns) note: must be manned by a fresh squad in the same space to
move (1 space) or fire; cannot Assault; destroyed if heavily damaged. ToI has
**no on‑board field artillery** — artillery is off‑board via Strategy cards
and is deliberately **not** part of this points system.

### Collections (the "Sets" chip row)

`base` (Tide of Iron, always on) · `dof` Days of the Fox · `normandy` ·
`fotb` Fury of the Bear · `stalingrad` · `toolsofwar` Tools of War (styled as
optional) · `houserule` House‑rule units (optional) · `fan` Fan · Tail of the
Dragon (styled distinct).

- A unit is fieldable only if the collection its `src` belongs to is enabled
  (`Stalingrad / Tools of War` needs either).
- Default enabled: base, dof, normandy, fotb, stalingrad.
- An **All expansions** chip toggles the official sets (+ Tools of War).
- Picking a nation auto‑enables the set holding its basic troops (Soviet →
  Fury of the Bear, Britain → Days of the Fox, Japan → Fan).
- Persist the selection with saved lists.

### Expansion history (compendium table — name | year · publisher | adds)

- Tide of Iron | 2007 · FFG | core game, USA + Germany, Western Front; regular/elite/officer, MG & mortar teams; 4 base specializations; Sherman/Panzer IV/Tiger I, half‑tracks, trucks; entrenchment/pillbox, wire, tank traps, mines, smoke
- Days of the Fox | 2008 · FFG | new nation Britain; Matilda II, Crusader, Bren Carrier; German Panzer III & Panther; anti‑tank guns (British 6‑pdr, US 57 mm, German 88 Flak); specializations Recon, Alpha, Bravo + experience star tokens; desert terrain
- Designer Series, Vol. 1 | 2008 · FFG | 20 scenarios by named designers; no new unit components
- Normandy | 2009 · FFG | expands British infantry; US M10; German StuG III, Jagdpanzer IV, King Tiger (Panther returns); Demolitions specialization; weather & Leadership decks, beaches, bunkers, hedgerows, destructible buildings
- Map Pack 1 | 2009 · FFG | upgraded boards, no new units
- Fury of the Bear | 2011 · FFG | new nation Soviet Union (KV‑1, T‑34/76, SU‑122, ZiS‑3); German Panther & PaK 40; specializations Expert, Saboteur; vehicle munitions tokens; winter terrain
- Next Wave | 2013 · 1A Games | reprinted core set, bundles all specialization types; M10 & StuG III in the core forces; no new unit types. Supplements: Tools of War, Kickstarter bonus booklet (Firefly, 2‑pdr, AP‑DS)
- Stalingrad | 2014 · 1A Games | urban campaign; only new unit T‑70; more Soviet infantry, Panzer III, StuG III E, city boards
- Tail of the Dragon | fan project (unofficial) | community Pacific expansion: Imperial Japan & US Marines, Ha‑Go, Chi‑Ha, LVT, jungle/beach terrain

## SCENARIOS

`effLimit = max(100, round(basePoints × mult / 25) × 25)`.
`fortBudget = round(effLimit × fort)`. `fort = 0` means no fortification.
`reserves` / `freeEntrench` are informational for the checklist.

| Scenario (type) | Sym? | mult | fort | reserves | freeEntr. |
|---|---|---|---|---|---|
| Pitched Battle (Free‑for‑All) | sym | 1.00 | 0 | 0 | — |
| Meeting Engagement (Encounter) | sym | 1.00 | 0 | 0.5 | — |
| Maximum Attrition (Kill Points) | sym | 1.00 | 0.10 | 0 | — |
| Envelopment (Flank Attack) | sym | 1.00 | 0.10 | 0.5 | — |
| Demolition (Sabotage) | sym | 1.00 | 0.15 | 0 | — |
| Attack & Defend (Hasty Attack) — attacker | asym | 1.00 | 0 | 0.25 | — |
| Attack & Defend — defender | asym | 0.75 | 0.25 | 0 | 2 |
| Hold Until Relieved (Last Stand) — attacker | asym | 1.30 | 0 | 0 | — |
| Hold Until Relieved — defender | asym | 0.60 | 0.30 | 0.33 | 3 |
| Breakthrough (Break Out) — attacker | asym | 1.15 | 0 | 0 | — |
| Breakthrough — defender | asym | 0.90 | 0.20 | 0.25 | 2 |
| Beachhead (No Retreat) — attacker | asym | 1.50 | 0 | 0.33 | — |
| Beachhead — defender | asym | 0.70 | 0.35 | 0.25 | 3 (+ bunker allowed) |

Write short deployment / victory / orders briefing text for each in the style
of Bolt Action scenario cards, e.g.:

- **Pitched Battle** — Deploy: full deployment in your own zone, no reserves.
  Victory: control the most command objectives at game end. Orders: a
  balanced mix of firepower, armour and movement.
- **Meeting Engagement** — Deploy: narrow zone; half your points arrive from
  round 2. Victory: hold the central objective. Orders: fast units to the
  centre, a solid second wave in reserve.
- **Attack & Defend** — attacker weights points toward mobility + smoke; the
  defender digs in on the objectives with AT guns and MG teams; victory: the
  attacker must hold at least one objective in the defence zone.
- **Hold Until Relieved** — a small dug‑in defender must hold one central
  objective until relief arrives from round 4; the attacker has the points
  advantage and must overwhelm it.
- **Breakthrough** — the attacker must move units off the far board edge and
  should bring ≥ 3 mobile units; the defender covers the width, thinly.
- **Beachhead** — a huge but cramped assault against a bunkered, dug‑in
  defender with a counter‑attack reserve.

Show a **scenario briefing box** in the builder with deployment, victory,
the effective points (`base → effective` with the modifier), fortification
allowance and free entrenchments.

## POINTS MATH

- **Squad cost** = Σ figure costs (Regular 5 / Elite 9 / Officer 13; Soviet
  Regular = 4) + specialization pts + transport pts. **MG team = flat 17**,
  **Mortar team = flat 21** (ignore figure math). A heavy‑weapon team can
  never hold a spec (force `spec = null`). USA transports ×0.8, rounded.
- **Non‑squad cost** = pts × quantity.
- The rough formula to quote in the compendium: `points = base + (FP vs
  infantry × 1.5) + (FP vs vehicle × 2) + (armour × 6, +15/+30 for
  thick/extra‑thick) + mobility + special rules`.

## ORDER OF BATTLE — live checklist (right panel + review sheet)

Each check is `ok` / `warn` / `fail`:

- points used vs effective limit — **fail** if over
- **fail** if no command squad
- **fail** if fewer than 2 other infantry / weapon squads
- heavy‑tank cap = `max(1, floor(effLimit/750))` (Germany `/500`) — **fail**
  if exceeded; **fail** if Japan has any heavy tank
- **warn** if any single unit costs more than ⅓ of the effective limit
- **warn** if vehicles or guns exceed `round(effLimit/250)` (recommended)
- **warn** if specialized squads exceed `ceil(totalSquads / 2)`
- fortifications: **fail** if the scenario/role forbids them, **fail** if over
  `fortBudget`; if forbidden but you're a defender with free entrenchments,
  **warn** to dig in
- **ok/info** line stating the reserve fraction that starts off‑board
- scenario nudges (**warn**): Breakthrough attacker with < 3 "mobile" units
  (light vehicles + squads with a transport + Recon squads); Flank with < 2
  mobile; Demolition with no Demolitions squad; Hold/Attack/Beachhead defender
  with no anti‑tank (no gun and no Anti‑Tank token); Attrition with a unit
  over ¼ of the limit
- **warn** if the list contains units from a switched‑off collection, or any
  house‑rule / fan units

## VIEWS & FEATURES

### Builder
Command bar: **Nation**, **Scenario**, **Your role** (shown only for
asymmetric scenarios), **Base points** (400 Patrol / 700 Standard / 1000
Company action / 1500 Large battle / Custom number). Then the **Sets** chips,
the **Doctrine** box and the **scenario briefing** box.

Left "arsenal": category tabs — **Command, Infantry, Weapon Teams,
Specializations, Vehicles, Guns & Emplacements, Transport, Fortifications** —
plus a stat‑line legend. Units render as cards (name + coloured source tag,
stat line, description, "from X pts" or "X pts", **Add**). Only units from
enabled collections show; the Fortifications tab is empty (with a hint) unless
the scenario allows them.

**Specializations tab** is a panel: each of the 10 tokens as a card (source,
cost, full rule), the squads currently carrying it as removable chips, and an
**Assign →** button that puts it on the first rifle/elite squad without one.

Right "force panel" (sticky, scrolls on mobile): editable **force name**; a
**points gauge** (used / effective, bar, sub‑line naming scenario + role +
`base → effective`); the **checklist**; the **roster** grouped by category.
Each squad row: 4 clickable **figure slots** that cycle
Regular → Elite → Officer → empty (max 1 officer, keep ≥ 1 figure; a command
squad's first slot is locked to Officer); a **specialization** dropdown
(hidden for weapon teams); a **transport** dropdown. Non‑squad rows: a
**quantity** stepper. Every row has **Remove**. Bottom actions:
**⚙ Auto‑fill · Save · Load · New · Review · Export**.

### Auto‑fill
Confirm dialog, then build a **legal, scenario‑appropriate** force to the
effective points:
1. Command squad + 2 rifle squads.
2. Support weapons (MG, and mortar unless a mobile scenario).
3. Anti‑tank: an AT gun for defenders, else the Anti‑Tank token on a rifle.
4. Scenario specials: Demolitions token in Demolition; a Medic for defenders;
   Recon for mobile scenarios.
5. Defender fortifications within `min(fortBudget, ~12% of effLimit)` — a
   bunker (if allowed), a pillbox, a minefield, a few entrenchments.
6. A greedy fill loop, priority: 2nd/3rd weapon team → another vehicle (chosen
   as the strongest that still fits an armour budget ≈ 22–45% of the limit,
   respecting the heavy cap and the ⅓ rule; mobile scenarios exclude heavies)
   → a specialization on a free squad → promote a Regular to Officer (≤ 3
   officers) → another rifle squad → transports (mobile / reserve scenarios)
   → upgrade a Regular to Elite → another entrenchment.
7. A "burn" pass for big / asymmetric games: duplicate the best vehicle up to
   the slot cap, add Elite squads, keep upgrading figures.
8. Never exceed the limit; name the force `"{Nation} — {Scenario} ({role})"`.

### Review
A formatted army sheet: header (name, nation, doctrine, scenario + role,
points); briefing block (deployment / victory / reserves / fortification);
the checklist; **composition tiles** (squads, weapon teams, figures on the
table, vehicles, guns, specializations, transports); then **every entry
itemised** — the main line is name + figure summary + total cost, and
indented sub‑lines break out **each purchase with its own points**: each
figure group with its stat line, the specialization with its **full rule
text**, the transport with its stats; a quantity line for multi‑model
non‑squads. A **Total** line. Buttons **⬇ Save as PDF** (calls
`window.print()`) and **Back to builder**.

### Compendium
Sections: About / how points work; **Reading the stat line**; Games &
expansions table; Infantry figures & teams; **Specialization tokens** (all 10
with rules + experience / munitions notes, and the heavy‑weapon prohibition
quoted); **Units by nation** (each nation's squads + transports + vehicles +
guns, with Source and Tier columns; Tier shown as *In the game* / *House
rule* / *Fan*, colour‑coded); **Anti‑tank guns & equipment — movement and
handling** (see below); Fortifications table; **Scenarios** table (name,
type, role, points modifier, fortification %, reserve %, victory); Order of
battle summary; Sources; **Version history** table.

**Anti‑tank guns & Equipment rules** to state in the compendium (consolidated
from Days of the Fox + Fury of the Bear):
- Every AT gun has the **Equipment** trait: no crew of its own, does nothing
  without a friendly unit in its space.
- *Firing:* a **Concentrated Fire** or **Prepare Op Fire** action needs a
  friendly **squad** (fresh or Op Fire) in the space; firing the gun does not
  activate that squad; on Op Fire the gun is fatigued. A **pinned** squad
  fires it at half firepower if a friendly officer is present. The gun cannot
  be activated while it or the manning unit is pinned / disrupted / heavily
  damaged / in a pillbox, bunker or trench. Equipment can never do Fire &
  Movement or Assault.
- *Moving with the crew alone:* an **Advance** action, only with a **fresh
  friendly unit** in the space; fatigue both and move both together **one
  space regardless of terrain** into an enemy‑free space (single action); may
  not enter impassable spaces or spaces already holding 2+ units. A squad in
  an entrenchment (not pillbox/trench) may still work the gun, which also
  gains +1 cover from the entrenchment.
- *Optional vehicle limber / tow (Days of the Fox):* **load** with an Advance
  action — vehicle, gun and a fresh friendly squad must start in the same
  space; **carry** at normal vehicle movement, the gun not counting against
  transport capacity, max one gun per vehicle; **unload** with an Advance
  action and a fresh friendly squad present — the gun is **fatigued** so it
  can't fire that turn. Tow‑pairing guideline: half‑tracks tow heavy guns
  (88), Bren Carriers only light guns (57 mm / 6‑pdr), trucks tow light /
  medium guns.
- *Combat & capture:* **Fragile** (heavily damaged = destroyed); **Concussive
  Firepower** (+3 FP / +3 range vs a squad in a building or pillbox); when
  assaulted adds no dice, takes no hits, doesn't retreat; if an enemy unit
  shares its space the gun counts as theirs and they may advance/fire it;
  an equipment unit alone doesn't block enemy movement into its space.
- *Squad transport (separate):* a squad embarks / disembarks a
  Transport‑trait vehicle for **2 MP** as part of its move, up to capacity
  (trucks 2, half‑tracks / carriers 1); can't act while aboard; dies with the
  vehicle.

### Print / PDF
`window.print()` from Review. `@media print` hides everything except the
Review sheet and **forces a pure black‑on‑white palette** — redefine the CSS
custom properties inside `@media print` with `!important` so it overrides the
dark‑mode `:root` rules — and prints the olive header as **bold black text on
white** (do not rely on a colour background). Names, points and section rules
solid black; break‑inside‑avoid on rows.

### Persistence
**Save / Load** named lists in `localStorage` (store nation, base points,
name, items, scenario, role, collections). **New** resets to a starter
(command + 2 rifles). **Export** shows a plain‑text army list in a textarea
(same itemised breakdown as the review sheet, dot leaders, a header block with
scenario / deployment / victory). Theme choice also in `localStorage`.

### Versioning
`APP_VERSION = "1.13"`. Keep a `CHANGELOG` array of `[version, description]`.
Show the version as a badge next to the title, in the footer, on the review
sheet header, in the text export, and as a **Version history** table in the
compendium. The scheme is `1.N` where N = number of revisions since the first
release.

### Opening state
Load with a small example USA force at 700 pts in the *Attack & Defend*
scenario (attacker): command squad, three rifle squads (one with the
Anti‑Tank token, one in an M3A1 Half‑track), an MG team, a mortar team, an
M4A1 Sherman, an M1 57 mm gun. Clearly a partial list a player started.

## OPTIONAL — make it installable (PWA)

Provide a tiny Node build script that wraps the single file in an
`<!doctype html>` skeleton and injects a `<link rel="manifest">`, a
`theme-color` meta and a service‑worker registration. Add a
`manifest.webmanifest` (standalone display, name "Tide of Iron · Battle
Builder", 192 + 512 px icons) and a `sw.js` that caches the app shell and the
Google Fonts response, with a cache name that carries `APP_VERSION` so a new
build refreshes automatically. Icons: an olive square with five stencil bars,
the centre bar oxide‑red.
