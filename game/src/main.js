// main.js — Double Take! wiring: the two panels, the HUD, the clock, the
// keyboard, and the win card. The game starts on scene 1 the moment it loads;
// the clock starts on the player's first click.
import { PANEL_W, PANEL_H } from './draw.js';
import { SCENES } from './scenes.js';
import {
  newRun, currentScene, totalDiffs, foundCount, remainingCount,
  clickAt, useHint, nextScene, goToScene, formatTime,
} from './state.js';
import { drawPanel } from './render.js';
import { playFound, playMiss, playHint, playWin, toggleMute, isMuted } from './audio.js';
import { stageShot } from './shots.js';

const leftCanvas = document.getElementById('panel-left');
const rightCanvas = document.getElementById('panel-right');
const counterEl = document.getElementById('counter');
const dotsEl = document.getElementById('dots');
const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const hintsEl = document.getElementById('hints');
const hintBtn = document.getElementById('hint-btn');
const restartBtn = document.getElementById('restart-btn');
const soundBtn = document.getElementById('sound-btn');
const sceneNoteEl = document.getElementById('scene-note');
const statusEl = document.getElementById('status');
const winOverlay = document.getElementById('win-overlay');
const winTitle = document.getElementById('win-title');
const winStars = document.getElementById('win-stars');
const winDetail = document.getElementById('win-detail');
const winTotal = document.getElementById('win-total');
const nextBtn = document.getElementById('next-btn');
const againBtn = document.getElementById('again-btn');
const levelBtns = Array.from(document.querySelectorAll('.level-btn'));

const params = new URLSearchParams(window.location.search);
const shotName = params.get('shot');
const run = newRun();
let shotMode = false;
let lastTick = performance.now();

if (shotName) {
  shotMode = true;
  stageShot(shotName, run);
}

function announce(text) {
  statusEl.textContent = text;
}

function refreshHud() {
  const scene = currentScene(run);
  counterEl.textContent = `${foundCount(run)} of ${totalDiffs(run)} found`;
  timerEl.textContent = formatTime(run.elapsed);
  scoreEl.textContent = String(run.score);
  hintsEl.textContent = String(run.hintsLeft);
  hintBtn.disabled = run.won || run.hintsLeft <= 0;
  sceneNoteEl.textContent = `${scene.name} · ${totalDiffs(run)} differences · ${scene.tagline.split('· ')[1] ?? ''}`;
  dotsEl.innerHTML = '';
  for (let i = 0; i < totalDiffs(run); i += 1) {
    const dot = document.createElement('span');
    dot.className = 'dot' + (run.found.includes(i) ? ' on' : '');
    dotsEl.appendChild(dot);
  }
  levelBtns.forEach((btn, i) => btn.classList.toggle('active', i === run.sceneIndex));
}

function showWin() {
  const last = run.finishedScenes[run.finishedScenes.length - 1];
  const scene = currentScene(run);
  const isLastScene = run.sceneIndex === SCENES.length - 1;
  winTitle.textContent = isLastScene ? 'You found them all!' : 'Scene complete!';
  winStars.textContent = '★'.repeat(last.stars) + '☆'.repeat(3 - last.stars);
  winDetail.textContent = `${scene.name}: ${totalDiffs(run)} differences in ${formatTime(last.seconds)} — ${last.stars} star${last.stars === 1 ? '' : 's'}.`;
  winTotal.textContent = `Total score: ${run.score} · ${run.wrong} wrong click${run.wrong === 1 ? '' : 's'} · ${run.hintsUsed} hint${run.hintsUsed === 1 ? '' : 's'} used.`;
  nextBtn.textContent = isLastScene ? 'Play from scene 1 ↺' : 'Next scene →';
  winOverlay.hidden = false;
  announce(`Scene complete. ${winDetail.textContent} Total score ${run.score}.`);
}

function hideWin() {
  winOverlay.hidden = true;
}

function paint(now) {
  const scene = currentScene(run);
  drawPanel(leftCanvas, scene, 0, run, now);
  drawPanel(rightCanvas, scene, 1, run, now);
}

function frame(now) {
  if (!shotMode && run.running && !run.won) {
    run.elapsed += (now - lastTick) / 1000;
    timerEl.textContent = formatTime(run.elapsed);
  }
  lastTick = now;
  paint(now);
  requestAnimationFrame(frame);
}

function panelCoords(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * PANEL_W,
    y: ((event.clientY - rect.top) / rect.height) * PANEL_H,
  };
}

function handlePanelClick(event, canvas) {
  if (shotMode) return;
  const { x, y } = panelCoords(event, canvas);
  if (!run.running && !run.won) run.running = true;
  const now = performance.now();
  const result = clickAt(run, x, y, now);
  if (result === 'found') {
    playFound();
    if (run.won) {
      playWin();
      refreshHud();
      showWin();
    } else {
      const scene = currentScene(run);
      const d = scene.diffs[run.found[run.found.length - 1]];
      announce(`Found: ${d.label}. ${remainingCount(run)} to go.`);
    }
  } else if (result === 'miss') {
    playMiss();
    announce('Not a difference. 15 points lost.');
  }
  refreshHud();
}

function doHint() {
  if (shotMode) return;
  const now = performance.now();
  const picked = useHint(run, now);
  if (picked === null) return;
  playHint();
  announce(`Hint: look near the ${currentScene(run).diffs[picked].label}.`);
  refreshHud();
}

function doRestart() {
  if (shotMode) return;
  hideWin();
  goToScene(run, run.sceneIndex);
  announce(`${currentScene(run).name} restarted.`);
  refreshHud();
}

function doNext() {
  hideWin();
  if (run.sceneIndex === SCENES.length - 1) {
    goToScene(run, 0);
  } else {
    nextScene(run);
  }
  announce(`${currentScene(run).name}. ${totalDiffs(run)} differences to find.`);
  refreshHud();
}

leftCanvas.addEventListener('click', (event) => handlePanelClick(event, leftCanvas));
rightCanvas.addEventListener('click', (event) => handlePanelClick(event, rightCanvas));
hintBtn.addEventListener('click', doHint);
restartBtn.addEventListener('click', doRestart);
soundBtn.addEventListener('click', () => {
  const off = toggleMute();
  soundBtn.textContent = `${off ? '🔇' : '🔊'} Sound `;
  const key = document.createElement('span');
  key.className = 'key';
  key.textContent = 'M';
  soundBtn.appendChild(key);
});
nextBtn.addEventListener('click', doNext);
againBtn.addEventListener('click', doRestart);
levelBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (shotMode) return;
    hideWin();
    goToScene(run, Number(btn.dataset.scene));
    announce(`${currentScene(run).name}. ${totalDiffs(run)} differences to find.`);
    refreshHud();
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'h' || event.key === 'H') doHint();
  else if (event.key === 'r' || event.key === 'R') doRestart();
  else if (event.key === 'm' || event.key === 'M') soundBtn.click();
  else if (event.key >= '1' && event.key <= '3') {
    if (shotMode) return;
    hideWin();
    goToScene(run, Number(event.key) - 1);
    refreshHud();
  }
});

refreshHud();
if (shotMode && run.won) showWin();
requestAnimationFrame(frame);
