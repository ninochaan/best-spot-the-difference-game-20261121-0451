// state.js — the rules of Double Take: one scene at a time, find every
// difference, beat the clock. Pure state, no drawing, no DOM.
import { SCENES } from './scenes.js';

export const FIND_POINTS = 100;
export const HINT_COST = 25;
export const WRONG_COST = 15;
export const HINTS_PER_SCENE = 3;

/** A fresh, empty run over all scenes. */
export function newRun() {
  return {
    sceneIndex: 0,
    found: [], // indices into the current scene's diffs, in find order
    wrong: 0,
    hintsUsed: 0,
    hintsLeft: HINTS_PER_SCENE,
    score: 0,
    elapsed: 0, // seconds, counts up while a scene is being played
    running: false, // the clock only runs once the player has clicked
    won: false,
    hintFlash: null, // { diff, until } — the hint ring a scene is showing
    lastFind: null, // { x, y, at } — the pop animation for the latest find
    lastMiss: null, // { x, y, at, panel } — the red X for the latest wrong click
    finishedScenes: [], // { name, seconds, stars, score } per completed scene
  };
}

export function currentScene(run) {
  return SCENES[run.sceneIndex];
}

export function totalDiffs(run) {
  return currentScene(run).diffs.length;
}

export function foundCount(run) {
  return run.found.length;
}

export function remainingCount(run) {
  return totalDiffs(run) - run.found.length;
}

/** The difference at panel coordinates (x, y), or null when there is none. */
export function diffAt(run, x, y) {
  const diffs = currentScene(run).diffs;
  for (let i = 0; i < diffs.length; i += 1) {
    const d = diffs[i];
    const dx = x - d.x;
    const dy = y - d.y;
    if (dx * dx + dy * dy <= d.r * d.r) return i;
  }
  return null;
}

/** Stars for a finished scene: 3 with no hints and under par, 2 under par + 60s, else 1. */
export function starsFor(scene, seconds, hintsUsed) {
  if (hintsUsed === 0 && seconds <= scene.par) return 3;
  if (seconds <= scene.par + 60) return 2;
  return 1;
}

/**
 * Apply a click at panel coordinates. Returns 'found' | 'already' | 'miss'.
 * A find scores points and may complete the scene; a miss costs points.
 */
export function clickAt(run, x, y, now) {
  if (run.won) return 'already';
  const index = diffAt(run, x, y);
  if (index === null) {
    run.wrong += 1;
    run.score = Math.max(0, run.score - WRONG_COST);
    run.lastMiss = { x, y, at: now };
    return 'miss';
  }
  if (run.found.includes(index)) return 'already';
  run.found.push(index);
  run.score += FIND_POINTS;
  run.lastFind = { x, y, at: now };
  if (run.found.length === totalDiffs(run)) {
    run.won = true;
    run.running = false;
    const scene = currentScene(run);
    const bonus = Math.max(0, scene.par - Math.floor(run.elapsed)) * 2;
    run.score += bonus;
    run.finishedScenes.push({
      name: scene.name,
      seconds: Math.floor(run.elapsed),
      stars: starsFor(scene, run.elapsed, run.hintsUsed),
      score: run.score,
    });
  }
  return 'found';
}

/** Spend a hint: highlight one difference the player has not found yet. */
export function useHint(run, now) {
  if (run.won || run.hintsLeft <= 0) return null;
  const remaining = currentScene(run).diffs
    .map((d, i) => i)
    .filter((i) => !run.found.includes(i));
  if (remaining.length === 0) return null;
  const pick = remaining[Math.floor(Math.random() * remaining.length)];
  run.hintsLeft -= 1;
  run.hintsUsed += 1;
  run.score = Math.max(0, run.score - HINT_COST);
  run.hintFlash = { diff: pick, until: now + 4000 };
  return pick;
}

/** Move to the next scene, or wrap back to the first for a new run. */
export function nextScene(run) {
  run.sceneIndex = (run.sceneIndex + 1) % SCENES.length;
  run.found = [];
  run.wrong = 0;
  run.hintsUsed = 0;
  run.hintsLeft = HINTS_PER_SCENE;
  run.elapsed = 0;
  run.running = false;
  run.won = false;
  run.hintFlash = null;
  run.lastFind = null;
  run.lastMiss = null;
}

/** Jump to a scene by index, keeping the run's total score. */
export function goToScene(run, index) {
  run.sceneIndex = index;
  run.found = [];
  run.wrong = 0;
  run.hintsUsed = 0;
  run.hintsLeft = HINTS_PER_SCENE;
  run.elapsed = 0;
  run.running = false;
  run.won = false;
  run.hintFlash = null;
  run.lastFind = null;
  run.lastMiss = null;
}

/** "mm:ss" for the HUD timer. */
export function formatTime(seconds) {
  const total = Math.max(0, Math.floor(seconds));
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
