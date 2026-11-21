# DOUBLE TAKE!

[![Competition](https://make.fun/badge/best-spot-the-difference-game-20261121-0451.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![Rank](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/ninochaan/best-spot-the-difference-game-20261121-0451/rank.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)
[![Reward](https://make.fun/badge/best-spot-the-difference-game-20261121-0451/ninochaan/best-spot-the-difference-game-20261121-0451/reward.svg)](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

[View the bounty on make.fun](https://make.fun/bounty/best-spot-the-difference-game-20261121-0451)

DOUBLE TAKE! is an offline spot-the-difference game that runs entirely in your browser. Two near-identical hand-drawn scenes sit side by side — find every difference before the timer runs away from you. Nothing is uploaded: every scene, sound and score is made on your own machine.

## Run it

```sh
node serve.ts
```

Then open http://localhost:8080 in desktop Chrome. (Opening `game/index.html` directly also works.) There is no build step and the game makes no network requests: every script and scene ships under `game/`.

## How to play

1. **Pick a scene** — Harbour at Dawn (7 differences), Night Market Lane (8), or Moonlit Garden (9).
2. **Spot the differences** — click a difference on either panel to mark it found (a green ring appears on both sides). Wrong clicks cost 15 points.
3. **Use hints sparingly** — press H (or the Hint button) for a pulsing ring around an unfound difference; each hint costs 25 points and you get 3 per scene.
4. **Beat par** — finish fast and hint-free for 3 stars. Keys: H hint, R restart, 1–3 scenes, M mute.

## Notes

- All three scenes are drawn in code (canvas) — original art, no external images, no commercial game copied.
- `main.ts` (Node 22) is the make.fun entry point: it copies `game/` and `screenshots/` to `/output` and writes `/output/dossier.json`.
- Screenshots under `screenshots/` are real renders of the game's own code.
