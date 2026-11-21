// render.js — paints one panel of Double Take: the scene itself, then every
// mark the player earned on top of it. The two panels share this painter, so
// a found difference is ringed on both pictures at once.
import { PANEL_W, PANEL_H } from './draw.js';

/** A green ring with a check mark, the reward for a found difference. */
function drawFoundMark(ctx, x, y, scale) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);
  ctx.strokeStyle = '#2fbf5a';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(0, 0, 17, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, 13, 0, Math.PI * 2);
  ctx.stroke();
  ctx.strokeStyle = '#2fbf5a';
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(-7, 0);
  ctx.lineTo(-2, 6);
  ctx.lineTo(8, -6);
  ctx.stroke();
  ctx.restore();
}

/** The pulsing dashed ring a hint draws around an unfound difference. */
function drawHintRing(ctx, x, y, now) {
  const pulse = 1 + 0.12 * Math.sin(now / 160);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(pulse, pulse);
  ctx.strokeStyle = '#ffb62f';
  ctx.lineWidth = 3.5;
  ctx.setLineDash([8, 6]);
  ctx.beginPath();
  ctx.arc(0, 0, 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = '#ffb62f';
  ctx.font = 'bold 13px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', 0, -30);
  ctx.restore();
}

/** A red X that fades away where a wrong click landed. */
function drawMissX(ctx, x, y, ageMs) {
  const alpha = Math.max(0, 1 - ageMs / 650);
  if (alpha <= 0) return;
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = '#e23b3b';
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - 10, y - 10);
  ctx.lineTo(x + 10, y + 10);
  ctx.moveTo(x + 10, y - 10);
  ctx.lineTo(x - 10, y + 10);
  ctx.stroke();
  ctx.restore();
}

/**
 * Paint one panel: the scene (variant 0 left, 1 right), then the found rings,
 * the hint ring and the latest miss. `now` is a millisecond clock for animation.
 */
export function drawPanel(canvas, scene, variant, run, now) {
  const ctx = canvas.getContext('2d');
  if (canvas.width !== PANEL_W) canvas.width = PANEL_W;
  if (canvas.height !== PANEL_H) canvas.height = PANEL_H;
  ctx.clearRect(0, 0, PANEL_W, PANEL_H);
  scene.draw(ctx, variant);
  // Found differences, ringed on both panels.
  for (let i = 0; i < run.found.length; i += 1) {
    const d = scene.diffs[run.found[i]];
    let scale = 1;
    if (run.lastFind && run.found[run.found.length - 1] === run.found[i]) {
      const age = now - run.lastFind.at;
      scale = age < 280 ? 0.55 + (age / 280) * 0.45 : 1;
    }
    drawFoundMark(ctx, d.x, d.y, scale);
  }
  // The hint ring, while it lasts.
  if (run.hintFlash && now < run.hintFlash.until) {
    const d = scene.diffs[run.hintFlash.diff];
    drawHintRing(ctx, d.x, d.y, now);
  }
  // The fading red X of a wrong click.
  if (run.lastMiss) drawMissX(ctx, run.lastMiss.x, run.lastMiss.y, now - run.lastMiss.at);
}
