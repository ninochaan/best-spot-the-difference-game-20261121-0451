// scenes.js — the three hand-drawn scenes of Double Take.
// Each scene draws itself twice: variant 0 is the left panel, variant 1 the right
// panel with that scene's differences applied. A difference is a circle in panel
// coordinates; clicking inside it on either panel finds it.
import { PANEL_W, PANEL_H, rr, circle, ellipse, poly, vgrad, shadowed, cloud, gull, sparkle, lantern } from './draw.js';

// ---------------------------------------------------------------------------
// Scene 1 — Harbour at Dawn (7 differences, gentle)
// ---------------------------------------------------------------------------
function drawHarbour(ctx, v) {
  // Dawn sky and sea.
  ctx.fillStyle = vgrad(ctx, 0, 0, 170, '#ffe9a8', '#ffc978');
  ctx.fillRect(0, 0, PANEL_W, 170);
  ctx.fillStyle = vgrad(ctx, 0, 170, PANEL_H - 170, '#3f9fd8', '#1d6fb0');
  ctx.fillRect(0, 170, PANEL_W, PANEL_H - 170);
  // Sun with rays on the left panel only (difference 1).
  if (v === 0) {
    ctx.strokeStyle = '#f7b733';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    for (let i = 0; i < 8; i += 1) {
      const a = (i / 8) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(472 + Math.cos(a) * 34, 62 + Math.sin(a) * 34);
      ctx.lineTo(472 + Math.cos(a) * 46, 62 + Math.sin(a) * 46);
      ctx.stroke();
    }
  }
  circle(ctx, 472, 62, 28, '#ffd93b');
  circle(ctx, 472, 62, 22, '#ffe98a');
  // Clouds and gulls. The middle gull is missing on the right (difference 4).
  cloud(ctx, 90, 52, 0.9, 'rgba(255,255,255,0.92)');
  cloud(ctx, 300, 36, 0.7, 'rgba(255,255,255,0.85)');
  gull(ctx, 205, 72, 1, '#3a3a55');
  if (v === 0) gull(ctx, 258, 56, 0.9, '#3a3a55');
  gull(ctx, 312, 82, 1, '#3a3a55');
  // Distant hills.
  ctx.fillStyle = '#7fae8e';
  ctx.beginPath();
  ctx.moveTo(0, 170);
  ctx.quadraticCurveTo(120, 118, 240, 170);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#6a9a7c';
  ctx.beginPath();
  ctx.moveTo(330, 170);
  ctx.quadraticCurveTo(430, 128, 560, 170);
  ctx.closePath();
  ctx.fill();
  // Lighthouse on the rocks (lamp red left, green right — difference 2).
  ctx.fillStyle = '#5d6b7a';
  poly(ctx, [[28, 170], [118, 170], [104, 138], [42, 138]], '#5d6b7a');
  ctx.fillStyle = '#f5f1e6';
  ctx.fillRect(58, 66, 34, 74);
  ctx.fillStyle = '#e2574c';
  ctx.fillRect(58, 84, 34, 12);
  ctx.fillRect(58, 112, 34, 12);
  ctx.fillStyle = '#2f3b4c';
  ctx.fillRect(54, 58, 42, 10);
  circle(ctx, 75, 50, 9, v === 0 ? '#ff5a4e' : '#37d67a');
  circle(ctx, 75, 50, 4, '#fff3c4');
  ctx.fillStyle = '#2f3b4c';
  poly(ctx, [[52, 58], [98, 58], [75, 40]], '#2f3b4c');
  // Wooden pier with a flag on its end (flag only on the left — difference 7).
  ctx.fillStyle = '#8a6a45';
  ctx.fillRect(180, 196, 240, 12);
  ctx.fillStyle = '#a07d52';
  for (let x = 184; x < 416; x += 18) ctx.fillRect(x, 196, 12, 12);
  ctx.fillStyle = '#6e5233';
  ctx.fillRect(196, 208, 10, 42);
  ctx.fillRect(300, 208, 10, 42);
  ctx.fillRect(396, 208, 10, 42);
  if (v === 0) {
    ctx.strokeStyle = '#5d4030';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(404, 196);
    ctx.lineTo(404, 158);
    ctx.stroke();
    poly(ctx, [[404, 158], [436, 166], [404, 176]], '#e2574c');
  }
  // Crates and a rope coil on the pier.
  shadowed(ctx, () => { ctx.fillStyle = '#c98f4e'; ctx.fillRect(216, 172, 26, 24); });
  ctx.strokeStyle = '#8a5a28';
  ctx.lineWidth = 2;
  ctx.strokeRect(216, 172, 26, 24);
  ctx.beginPath();
  ctx.moveTo(216, 172);
  ctx.lineTo(242, 196);
  ctx.moveTo(242, 172);
  ctx.lineTo(216, 196);
  ctx.stroke();
  ctx.strokeStyle = '#d9c08a';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(268, 190, 9, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(268, 190, 5, 0, Math.PI * 2);
  ctx.stroke();
  // Sailboat — sail red on the left, blue on the right (difference 3).
  ctx.fillStyle = '#7a4a2b';
  poly(ctx, [[318, 296], [392, 296], [382, 312], [328, 312]], '#7a4a2b');
  ctx.strokeStyle = '#5d3a20';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(356, 296);
  ctx.lineTo(356, 214);
  ctx.stroke();
  poly(ctx, [[356, 218], [356, 288], [300, 288]], v === 0 ? '#e2574c' : '#3f7fd8');
  poly(ctx, [[360, 226], [360, 288], [398, 288]], '#f5f1e6');
  circle(ctx, 356, 210, 4, '#ffd93b');
  // Rowboat with a fisherman — straw hat on the left only (difference 6).
  ctx.fillStyle = '#4a6b8a';
  poly(ctx, [[96, 330], [168, 330], [158, 346], [106, 346]], '#4a6b8a');
  ctx.fillStyle = '#33506a';
  ctx.fillRect(96, 330, 72, 5);
  circle(ctx, 128, 312, 11, '#f2c89b');
  ctx.fillStyle = '#2e7d5b';
  ctx.fillRect(116, 322, 24, 16);
  if (v === 0) {
    ellipse(ctx, 128, 302, 17, 5, '#e8c96a');
    ctx.fillStyle = '#e8c96a';
    ctx.fillRect(120, 292, 16, 10);
  }
  ctx.strokeStyle = '#8a6a45';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(146, 322);
  ctx.lineTo(176, 356);
  ctx.stroke();
  // Buoy — orange left, yellow right (difference 5).
  ctx.fillStyle = v === 0 ? '#ff7a2f' : '#ffd93b';
  ctx.beginPath();
  ctx.moveTo(478, 296);
  ctx.lineTo(494, 296);
  ctx.lineTo(500, 318);
  ctx.lineTo(472, 318);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.fillRect(476, 304, 20, 5);
  ctx.fillStyle = '#2f3b4c';
  ctx.fillRect(483, 288, 6, 9);
  // Sea sparkle, waves and a jumping fish.
  ctx.strokeStyle = 'rgba(255,255,255,0.5)';
  ctx.lineWidth = 2;
  for (const [wx, wy, wl] of [[40, 260, 46], [150, 300, 60], [240, 360, 70], [420, 350, 56], [500, 250, 44]]) {
    ctx.beginPath();
    ctx.moveTo(wx, wy);
    ctx.quadraticCurveTo(wx + wl / 2, wy - 6, wx + wl, wy);
    ctx.stroke();
  }
  sparkle(ctx, 200, 240, 5, 'rgba(255,255,255,0.8)');
  sparkle(ctx, 440, 280, 4, 'rgba(255,255,255,0.7)');
  ctx.fillStyle = '#7fb7e8';
  ellipse(ctx, 252, 342, 12, 5, '#7fb7e8');
  poly(ctx, [[246, 338], [240, 326], [252, 334]], '#7fb7e8');
  // Soft vignette so the panel reads as one picture.
  ctx.strokeStyle = 'rgba(30, 40, 70, 0.18)';
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, PANEL_W, PANEL_H);
}

const HARBOUR_DIFFS = [
  { x: 472, y: 62, r: 30, label: 'Sun rays' },
  { x: 75, y: 50, r: 16, label: 'Lighthouse lamp' },
  { x: 330, y: 252, r: 30, label: 'Sail colour' },
  { x: 258, y: 56, r: 18, label: 'Missing gull' },
  { x: 486, y: 306, r: 18, label: 'Buoy colour' },
  { x: 128, y: 298, r: 20, label: 'Fisherman hat' },
  { x: 416, y: 166, r: 22, label: 'Pier flag' },
];

// ---------------------------------------------------------------------------
// Scene 2 — Night Market Lane (8 differences, trickier)
// ---------------------------------------------------------------------------
function drawMarket(ctx, v) {
  // Night sky, moon and stars. The moon wears a crater on the left only (diff 8).
  ctx.fillStyle = vgrad(ctx, 0, 0, 300, '#1b2340', '#4a2b63');
  ctx.fillRect(0, 0, PANEL_W, 300);
  circle(ctx, 500, 58, 26, '#f7ead0');
  circle(ctx, 500, 58, 20, '#fdf6df');
  if (v === 0) {
    circle(ctx, 492, 52, 5, '#d9c9a3');
    circle(ctx, 508, 64, 4, '#d9c9a3');
  }
  sparkle(ctx, 60, 46, 5, '#fff');
  sparkle(ctx, 150, 80, 4, '#ffe9a8');
  sparkle(ctx, 250, 40, 4, '#fff');
  sparkle(ctx, 350, 90, 5, '#ffe9a8');
  sparkle(ctx, 430, 34, 4, '#fff');
  // Rooftops and the street.
  ctx.fillStyle = '#2c2140';
  poly(ctx, [[0, 300], [0, 210], [90, 150], [180, 210], [180, 300]], '#2c2140');
  ctx.fillStyle = '#241a36';
  poly(ctx, [[380, 300], [380, 200], [470, 140], [560, 200], [560, 300]], '#241a36');
  ctx.fillStyle = '#3d2f52';
  ctx.fillRect(0, 300, PANEL_W, 100);
  ctx.fillStyle = 'rgba(255, 200, 90, 0.10)';
  ctx.fillRect(0, 300, PANEL_W, 6);
  // A cat naps on the right rooftop — left panel only (difference 2).
  // Lavender-grey so it reads against the dark roof.
  if (v === 0) {
    ctx.fillStyle = '#c9b8e8';
    ellipse(ctx, 468, 152, 20, 9, '#c9b8e8');
    circle(ctx, 486, 146, 8, '#c9b8e8');
    poly(ctx, [[481, 140], [484, 132], [487, 140]], '#c9b8e8');
    poly(ctx, [[489, 140], [492, 132], [494, 140]], '#c9b8e8');
    ctx.strokeStyle = '#c9b8e8';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(448, 154);
    ctx.quadraticCurveTo(436, 148, 440, 138);
    ctx.stroke();
    ctx.fillStyle = '#2b2140';
    ctx.fillRect(488, 144, 2, 2);
  }
  // String lights across the lane. One bulb is dark on the right (diff 6).
  ctx.strokeStyle = '#111';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, 30);
  ctx.quadraticCurveTo(280, 84, 560, 30);
  ctx.stroke();
  const bulbs = ['#ffd93b', '#ff7a6b', '#7fd8ff', '#b6ff7d', '#ffb6e0', '#ffd93b', '#ff7a6b', '#7fd8ff'];
  for (let i = 0; i < 8; i += 1) {
    const t = (i + 0.5) / 8;
    const bx = t * 560;
    const by = 30 + Math.sin(t * Math.PI) * 0 + (1 - Math.pow(2 * t - 1, 2)) * 26;
    const dark = v === 1 && i === 3;
    if (!dark) {
      const g = ctx.createRadialGradient(bx, by + 8, 1, bx, by + 8, 14);
      g.addColorStop(0, bulbs[i]);
      g.addColorStop(1, 'rgba(255, 200, 80, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by + 8, 14, 0, Math.PI * 2);
      ctx.fill();
    }
    circle(ctx, bx, by + 8, 5, dark ? '#3a3348' : bulbs[i]);
    ctx.fillStyle = '#111';
    ctx.fillRect(bx - 2, by + 1, 4, 3);
  }
  // Left stall: fruit stall with striped awning.
  ctx.fillStyle = '#7a3b2e';
  ctx.fillRect(60, 210, 150, 90);
  ctx.fillStyle = '#a85a44';
  ctx.fillRect(60, 210, 150, 10);
  for (let x = 60; x < 210; x += 30) {
    ctx.fillStyle = (x / 30) % 2 === 0 ? '#e2574c' : '#f5f1e6';
    ctx.beginPath();
    ctx.moveTo(x, 168);
    ctx.lineTo(x + 30, 168);
    ctx.lineTo(x + 30, 210);
    ctx.quadraticCurveTo(x + 15, 222, x, 210);
    ctx.closePath();
    ctx.fill();
  }
  ctx.strokeStyle = '#5d2f24';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(60, 168);
  ctx.lineTo(60, 210);
  ctx.moveTo(210, 168);
  ctx.lineTo(210, 210);
  ctx.stroke();
  // Oranges: five on the left, four on the right (difference 5).
  const oranges = [[86, 246], [112, 246], [138, 246], [99, 228], [125, 228]];
  oranges.forEach(([ox, oy], i) => {
    if (v === 1 && i === 4) return;
    circle(ctx, ox, oy, 10, '#ff9f2f');
    circle(ctx, ox - 3, oy - 3, 3, '#ffc46b');
  });
  circle(ctx, 176, 246, 10, '#c0392b');
  circle(ctx, 176, 228, 10, '#8bc34a');
  // Hanging lanterns — the big one is red left, green right (difference 1).
  lantern(ctx, 110, 148, 13, v === 0 ? '#ff5a4e' : '#37d67a', 'rgba(255, 120, 90, 0.5)');
  lantern(ctx, 250, 150, 11, '#ffb62f', 'rgba(255, 190, 80, 0.45)');
  // Signboard with a star on the left only (difference 4).
  ctx.fillStyle = '#f5e6c8';
  rr(ctx, 300, 120, 110, 44, 8);
  ctx.fill();
  ctx.strokeStyle = '#8a6d1f';
  ctx.lineWidth = 3;
  rr(ctx, 300, 120, 110, 44, 8);
  ctx.stroke();
  ctx.fillStyle = '#3a2b1f';
  ctx.font = 'bold 20px Georgia, serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('RAMEN', 348, 143);
  if (v === 0) sparkle(ctx, 396, 132, 6, '#e2574c');
  // Vendor behind the right stall — apron blue left, yellow right (diff 3).
  ctx.fillStyle = '#5a3b2e';
  ctx.fillRect(330, 210, 130, 90);
  ctx.fillStyle = '#a85a44';
  ctx.fillRect(330, 210, 130, 10);
  for (let x = 330; x < 460; x += 26) {
    ctx.fillStyle = (x / 26) % 2 === 0 ? '#3f7fd8' : '#f5f1e6';
    ctx.beginPath();
    ctx.moveTo(x, 168);
    ctx.lineTo(x + 26, 168);
    ctx.lineTo(x + 26, 210);
    ctx.quadraticCurveTo(x + 13, 220, x, 210);
    ctx.closePath();
    ctx.fill();
  }
  circle(ctx, 396, 218, 16, '#f2c89b');
  ctx.fillStyle = '#2b2b3a';
  ctx.fillRect(382, 204, 28, 10);
  ctx.fillStyle = v === 0 ? '#3f7fd8' : '#ffd93b';
  ctx.fillRect(378, 234, 36, 52);
  ctx.fillStyle = '#f2c89b';
  circle(ctx, 374, 252, 6, '#f2c89b');
  circle(ctx, 418, 252, 6, '#f2c89b');
  ctx.fillStyle = '#e8b04b';
  ctx.fillRect(360, 284, 72, 8);
  // Steaming bowls on the counter.
  ctx.fillStyle = '#f5f1e6';
  ellipse(ctx, 372, 280, 12, 5, '#f5f1e6');
  ellipse(ctx, 420, 280, 12, 5, '#f5f1e6');
  ctx.strokeStyle = 'rgba(255,255,255,0.7)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(372, 272);
  ctx.quadraticCurveTo(368, 262, 372, 254);
  ctx.moveTo(420, 272);
  ctx.quadraticCurveTo(424, 262, 420, 254);
  ctx.stroke();
  // Bicycle leaning by the right stall — bell on the left only (diff 7).
  ctx.strokeStyle = '#d9d9e8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(478, 344, 20, 0, Math.PI * 2);
  ctx.arc(528, 344, 20, 0, Math.PI * 2);
  ctx.moveTo(478, 344);
  ctx.lineTo(500, 312);
  ctx.lineTo(528, 344);
  ctx.moveTo(500, 312);
  ctx.lineTo(514, 312);
  ctx.lineTo(528, 344);
  ctx.moveTo(500, 312);
  ctx.lineTo(488, 300);
  ctx.stroke();
  ctx.fillStyle = '#2b2b3a';
  ctx.fillRect(486, 296, 14, 5);
  if (v === 0) circle(ctx, 492, 292, 4, '#ffd93b');
  ctx.fillStyle = '#e2574c';
  ctx.fillRect(512, 308, 10, 5);
  // Paper scraps and a puddle on the street.
  ctx.fillStyle = 'rgba(120, 90, 200, 0.35)';
  ellipse(ctx, 250, 360, 60, 10, 'rgba(120, 90, 200, 0.35)');
  ctx.fillStyle = '#f5f1e6';
  ctx.fillRect(120, 352, 10, 6);
  ctx.fillRect(300, 368, 12, 6);
  ctx.strokeStyle = 'rgba(30, 40, 70, 0.18)';
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, PANEL_W, PANEL_H);
}

const MARKET_DIFFS = [
  { x: 110, y: 148, r: 20, label: 'Lantern colour' },
  { x: 468, y: 148, r: 24, label: 'Roof cat' },
  { x: 396, y: 258, r: 24, label: 'Vendor apron' },
  { x: 396, y: 132, r: 12, label: 'Sign star' },
  { x: 125, y: 228, r: 16, label: 'Missing orange' },
  { x: 245, y: 64, r: 14, label: 'Dark bulb' },
  { x: 492, y: 292, r: 12, label: 'Bicycle bell' },
  { x: 500, y: 58, r: 30, label: 'Moon craters' },
];

// ---------------------------------------------------------------------------
// Scene 3 — Moonlit Garden (9 differences, hardest)
// ---------------------------------------------------------------------------
function drawGarden(ctx, v) {
  // Dusk sky, moon and stars. One star is missing on the right (diff 9).
  ctx.fillStyle = vgrad(ctx, 0, 0, 280, '#2b1e4d', '#7a4a7d');
  ctx.fillRect(0, 0, PANEL_W, 280);
  circle(ctx, 470, 66, 34, '#f7ead0');
  circle(ctx, 470, 66, 27, '#fdf6df');
  circle(ctx, 460, 58, 6, '#d9c9a3');
  circle(ctx, 480, 74, 5, '#d9c9a3');
  const stars = [[60, 50], [150, 36], [240, 60], [330, 44], [400, 90], [90, 110], [200, 96], [300, 130], [520, 130]];
  stars.forEach(([sx, sy], i) => {
    if (v === 1 && i === 3) return;
    sparkle(ctx, sx, sy, 4, '#fff');
  });
  // Fireflies — six on the left, five on the right (difference 4).
  const flies = [[180, 170], [230, 150], [300, 180], [350, 150], [420, 190], [260, 210]];
  flies.forEach(([fx, fy], i) => {
    if (v === 1 && i === 2) return;
    const g = ctx.createRadialGradient(fx, fy, 1, fx, fy, 12);
    g.addColorStop(0, 'rgba(190, 255, 120, 0.9)');
    g.addColorStop(1, 'rgba(190, 255, 120, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(fx, fy, 12, 0, Math.PI * 2);
    ctx.fill();
    circle(ctx, fx, fy, 2.5, '#d8ff9a');
  });
  // Old oak tree with apples — five left, four right (difference 8).
  ctx.fillStyle = '#5d3a20';
  ctx.fillRect(58, 190, 22, 110);
  ctx.strokeStyle = '#5d3a20';
  ctx.lineWidth = 10;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(69, 210);
  ctx.quadraticCurveTo(40, 170, 30, 140);
  ctx.moveTo(69, 200);
  ctx.quadraticCurveTo(100, 160, 112, 132);
  ctx.stroke();
  ctx.fillStyle = '#3f7d3a';
  circle(ctx, 40, 130, 34, '#3f7d3a');
  circle(ctx, 78, 108, 40, '#4a8a44');
  circle(ctx, 118, 132, 32, '#3f7d3a');
  circle(ctx, 70, 150, 36, '#4a8a44');
  const apples = [[46, 128], [82, 104], [112, 128], [66, 152], [96, 146]];
  apples.forEach(([ax, ay], i) => {
    if (v === 1 && i === 4) return;
    circle(ctx, ax, ay, 6, '#e2574c');
    circle(ctx, ax - 2, ay - 2, 2, '#ff8a7a');
  });
  // An owl dozes on the branch — left panel only (difference 1).
  if (v === 0) {
    ctx.fillStyle = '#8a6d4b';
    ellipse(ctx, 128, 118, 14, 18, '#8a6d4b');
    circle(ctx, 128, 100, 11, '#8a6d4b');
    circle(ctx, 123, 98, 4, '#fff');
    circle(ctx, 133, 98, 4, '#fff');
    ctx.fillStyle = '#2b2b3a';
    ctx.fillRect(122, 97, 2, 2);
    ctx.fillRect(132, 97, 2, 2);
    poly(ctx, [[128, 102], [124, 108], [132, 108]], '#e8a33d');
    ctx.fillStyle = '#6b5238';
    ellipse(ctx, 128, 122, 8, 10, '#6b5238');
  }
  // Lawn.
  ctx.fillStyle = vgrad(ctx, 0, 280, 120, '#4a8a44', '#2f6b2f');
  ctx.fillRect(0, 280, PANEL_W, 120);
  ctx.strokeStyle = 'rgba(255,255,255,0.12)';
  ctx.lineWidth = 1.5;
  for (let x = 20; x < 560; x += 34) {
    ctx.beginPath();
    ctx.moveTo(x, 296);
    ctx.lineTo(x + 4, 286);
    ctx.moveTo(x + 10, 296);
    ctx.lineTo(x + 14, 288);
    ctx.stroke();
  }
  // Stone path.
  ctx.fillStyle = '#c9c2b2';
  for (const [px, py, pw] of [[250, 300, 60], [258, 326, 54], [252, 352, 62], [260, 378, 56]]) {
    rr(ctx, px, py, pw, 20, 9);
    ctx.fill();
  }
  // Wooden bench with a cushion — red left, blue right (difference 5).
  ctx.fillStyle = '#7a4a2b';
  ctx.fillRect(236, 268, 110, 10);
  ctx.fillRect(244, 278, 8, 30);
  ctx.fillRect(330, 278, 8, 30);
  ctx.fillRect(236, 236, 10, 42);
  ctx.fillStyle = v === 0 ? '#e2574c' : '#3f7fd8';
  rr(ctx, 246, 256, 90, 12, 6);
  ctx.fill();
  ctx.fillStyle = '#f5f1e6';
  ctx.fillRect(246, 258, 90, 2);
  // Flower bed — one tulip pink left, yellow right (difference 3).
  const tulips = [[150, 348, '#ff7a9e'], [176, 356, '#ff9f2f'], [202, 348, '#b678e8'], [228, 356, '#ff7a9e'], [300, 352, '#ff9f2f'], [326, 360, '#b678e8']];
  tulips.forEach(([tx, ty, col]) => {
    ctx.strokeStyle = '#2f6b2f';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(tx, ty);
    ctx.lineTo(tx, ty - 18);
    ctx.stroke();
    ctx.fillStyle = v === 1 && tx === 202 ? '#ffd93b' : col;
    ctx.beginPath();
    ctx.arc(tx, ty - 24, 8, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
  });
  // Pond with lily pads, a frog and a duck.
  ctx.fillStyle = '#2f6b8f';
  ellipse(ctx, 452, 336, 92, 40, '#2f6b8f');
  ctx.fillStyle = '#4a90b8';
  ellipse(ctx, 452, 330, 80, 32, '#4a90b8');
  ctx.strokeStyle = 'rgba(255,255,255,0.35)';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.ellipse(440, 330, 40, 10, 0, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#3f7d3a';
  ellipse(ctx, 410, 318, 18, 7, '#3f7d3a');
  ellipse(ctx, 480, 344, 20, 8, '#3f7d3a');
  // The frog sits on a pad — left panel only (difference 2).
  if (v === 0) {
    ctx.fillStyle = '#5aa843';
    ellipse(ctx, 410, 308, 14, 10, '#5aa843');
    circle(ctx, 402, 298, 6, '#5aa843');
    circle(ctx, 418, 298, 6, '#5aa843');
    circle(ctx, 402, 297, 2.5, '#fff');
    circle(ctx, 418, 297, 2.5, '#fff');
    ctx.fillStyle = '#2b2b3a';
    ctx.fillRect(401, 296, 2, 2);
    ctx.fillRect(417, 296, 2, 2);
  }
  // The duck paddles on the right side of the pond — left panel only (diff 7).
  if (v === 0) {
    ctx.fillStyle = '#fff';
    ellipse(ctx, 492, 336, 16, 10, '#fff');
    circle(ctx, 504, 326, 8, '#fff');
    poly(ctx, [[510, 326], [518, 328], [510, 330]], '#ff9f2f');
    ctx.fillStyle = '#2b2b3a';
    ctx.fillRect(505, 324, 2, 2);
    ctx.fillStyle = '#ffd93b';
    ellipse(ctx, 486, 344, 8, 4, '#ffd93b');
  }
  // Watering can with drips — drips only on the left (difference 6).
  ctx.fillStyle = '#8a94a6';
  rr(ctx, 356, 330, 34, 26, 6);
  ctx.fill();
  ctx.fillStyle = '#6e7888';
  ctx.fillRect(356, 322, 34, 6);
  ctx.strokeStyle = '#8a94a6';
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.moveTo(390, 338);
  ctx.lineTo(408, 330);
  ctx.stroke();
  ctx.strokeStyle = '#6e7888';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(362, 324, 8, Math.PI, 0);
  ctx.stroke();
  if (v === 0) {
    ctx.fillStyle = '#a8d8ff';
    circle(ctx, 412, 340, 3, '#a8d8ff');
    circle(ctx, 416, 352, 3, '#a8d8ff');
    circle(ctx, 410, 362, 3, '#a8d8ff');
  }
  ctx.strokeStyle = 'rgba(30, 40, 70, 0.18)';
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, PANEL_W, PANEL_H);
}

const GARDEN_DIFFS = [
  { x: 128, y: 108, r: 22, label: 'Sleeping owl' },
  { x: 410, y: 304, r: 20, label: 'Pond frog' },
  { x: 202, y: 326, r: 16, label: 'Tulip colour' },
  { x: 300, y: 180, r: 14, label: 'Missing firefly' },
  { x: 291, y: 262, r: 26, label: 'Bench cushion' },
  { x: 412, y: 350, r: 14, label: 'Water drops' },
  { x: 498, y: 332, r: 24, label: 'Pond duck' },
  { x: 96, y: 146, r: 14, label: 'Missing apple' },
  { x: 330, y: 44, r: 12, label: 'Missing star' },
];

// ---------------------------------------------------------------------------
// The catalogue the game and the screenshots share.
// ---------------------------------------------------------------------------
export const SCENES = [
  { id: 'harbour', name: 'Harbour at Dawn', tagline: '7 differences · gentle', par: 150, diffs: HARBOUR_DIFFS, draw: drawHarbour },
  { id: 'market', name: 'Night Market Lane', tagline: '8 differences · tricky', par: 210, diffs: MARKET_DIFFS, draw: drawMarket },
  { id: 'garden', name: 'Moonlit Garden', tagline: '9 differences · hardest', par: 270, diffs: GARDEN_DIFFS, draw: drawGarden },
];
