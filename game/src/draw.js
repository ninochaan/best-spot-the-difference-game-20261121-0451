// draw.js — small canvas helpers shared by every scene of Double Take.
// Every helper draws in the panel's own 560x400 coordinate space.
export const PANEL_W = 560;
export const PANEL_H = 400;

/** Rounded rectangle path, ready to fill or stroke. */
export function rr(ctx, x, y, w, h, r) {
  const rad = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rad, y);
  ctx.arcTo(x + w, y, x + w, y + h, rad);
  ctx.arcTo(x + w, y + h, x, y + h, rad);
  ctx.arcTo(x, y + h, x, y, rad);
  ctx.arcTo(x, y, x + w, y, rad);
  ctx.closePath();
}

/** Filled circle. */
export function circle(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/** Filled ellipse. */
export function ellipse(ctx, x, y, rx, ry, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
  ctx.fill();
}

/** Filled polygon from [x, y] points. */
export function poly(ctx, points, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(points[0][0], points[0][1]);
  for (let i = 1; i < points.length; i += 1) ctx.lineTo(points[i][0], points[i][1]);
  ctx.closePath();
  ctx.fill();
}

/** A vertical linear gradient between two colours over the given box. */
export function vgrad(ctx, x, y, h, top, bottom) {
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  g.addColorStop(0, top);
  g.addColorStop(1, bottom);
  return g;
}

/** A soft drop shadow for the next filled shape, then restores. */
export function shadowed(ctx, fn) {
  ctx.save();
  ctx.shadowColor = 'rgba(20, 20, 40, 0.35)';
  ctx.shadowBlur = 6;
  ctx.shadowOffsetY = 3;
  fn();
  ctx.restore();
}

/** A puffy cloud made of overlapping circles. */
export function cloud(ctx, x, y, scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, 18 * scale, 0, Math.PI * 2);
  ctx.arc(x + 20 * scale, y - 8 * scale, 22 * scale, 0, Math.PI * 2);
  ctx.arc(x + 44 * scale, y, 18 * scale, 0, Math.PI * 2);
  ctx.arc(x + 22 * scale, y + 8 * scale, 20 * scale, 0, Math.PI * 2);
  ctx.fill();
}

/** A simple gull: two curved strokes. */
export function gull(ctx, x, y, scale, color) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.4 * scale;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(x - 11 * scale, y);
  ctx.quadraticCurveTo(x - 5 * scale, y - 8 * scale, x, y);
  ctx.quadraticCurveTo(x + 5 * scale, y - 8 * scale, x + 11 * scale, y);
  ctx.stroke();
}

/** A four-point sparkle star. */
export function sparkle(ctx, x, y, r, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

/** A glowing lantern: paper body, caps, tassel, warm light. */
export function lantern(ctx, x, y, r, body, glow) {
  const g = ctx.createRadialGradient(x, y, 2, x, y, r * 2.4);
  g.addColorStop(0, glow);
  g.addColorStop(1, 'rgba(255, 190, 80, 0)');
  ctx.fillStyle = g;
  ctx.beginPath();
  ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#8a6d1f';
  ctx.fillRect(x - 2, y - r - 7, 4, 6);
  circle(ctx, x, y, r, body);
  ctx.strokeStyle = 'rgba(120, 30, 20, 0.55)';
  ctx.lineWidth = 1.5;
  for (let i = -1; i <= 1; i += 1) {
    ctx.beginPath();
    ctx.ellipse(x, y + i * r * 0.45, r * 0.82, r * 0.32, 0, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.fillStyle = '#c0392b';
  ctx.fillRect(x - 5, y + r - 2, 10, 4);
  ctx.fillRect(x - 1.5, y + r + 2, 3, 10);
}
