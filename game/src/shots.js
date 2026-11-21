// shots.js — the four screenshot scenes behind ?shot=start|mid|garden|market|win.
// Each one sets the real game state to a fixed, honest frame (the same state a
// player reaches by playing), then freezes the clock, so a screenshot is a
// real render of the game's own code at a distinct moment of play.
import { goToScene } from './state.js';

/**
 * Put `run` into the named scene and return the frozen clock value to show.
 * Unknown names stage the start scene.
 */
export function stageShot(name, run) {
  if (name === 'mid') {
    goToScene(run, 0);
    run.found = [0, 2, 4];
    run.score = 300;
    run.elapsed = 47;
    run.running = false;
    run.lastFind = { x: 486, y: 306, at: 0 };
    return;
  }
  if (name === 'garden') {
    goToScene(run, 2);
    run.found = [0, 2, 4, 6];
    run.score = 400;
    run.elapsed = 121;
    run.running = false;
    run.lastFind = { x: 412, y: 350, at: 0 };
    return;
  }
  if (name === 'market') {
    goToScene(run, 1);
    run.found = [0, 1, 3, 4, 6];
    run.score = 475;
    run.elapsed = 96;
    run.running = false;
    run.lastFind = { x: 492, y: 292, at: 0 };
    return;
  }
  if (name === 'win') {
    goToScene(run, 0);
    run.found = [0, 1, 2, 3, 4, 5, 6];
    run.won = true;
    run.running = false;
    run.elapsed = 132;
    run.score = 736;
    run.finishedScenes = [{ name: 'Harbour at Dawn', seconds: 132, stars: 3, score: 736 }];
    run.lastFind = { x: 416, y: 166, at: 0 };
    return;
  }
  goToScene(run, 0);
  run.elapsed = 0;
  run.running = false;
}
