import { describe, expect, it } from 'vitest';
import { JSDOM } from 'jsdom';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const repo = resolve(dirname(fileURLToPath(import.meta.url)), '../../../');
const cssFiles = [
  'assets/microsoft-hub.css',
  'MB-800/assets/microsoft-hub.css',
  'AZ-400/web/app/microsoft-hub.css',
];
const rgb = (value) => {
  const hex = value.match(/^#([\da-f]{6})$/i);
  if (hex) return [0, 2, 4].map((i) => parseInt(hex[1].slice(i, i + 2), 16));
  const match = value.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) throw new Error(`Unexpected colour: ${value}`);
  return match.slice(1).map(Number);
};
const luminance = (value) => {
  const channels = rgb(value).map((v) => {
    const c = v / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};
const contrast = (a, b) => {
  const values = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (values[0] + 0.05) / (values[1] + 0.05);
};

describe.each(cssFiles)('%s', (file) => {
  it('keeps representative mobile cards and dark panels readable', () => {
    const css = readFileSync(resolve(repo, file), 'utf8');
    // jsdom does not implement the full cascade for !important rules added by
    // later stylesheets; check the computed palette and the isolation rules.
    expect(css).toContain('main#main .offering-card h3,');
    expect(css).toContain('color:#0f172a !important;');
    const dom = new JSDOM(`<!doctype html><html><head>
      <style>main h3, main strong, main p { color: #f8fafc; }</style>
      <style>${css}</style>
      </head><body><main id="main">
      <section class="section-muted"><a class="offering-card"><h3>Azure & Cloud</h3><p>Cloud fundamentals</p></a></section>
      <section class="catalog-section"><article class="catalog-card"><h3>Learn Copilot</h3><p>Module description</p></article></section>
      <section class="section"><div class="delivery-grid"><div class="delivery-list"><article><div><strong>Instructor-led training</strong><p>Virtual delivery</p></div></article></div></div></section>
      <section class="section-dark"><div class="reference-card"><strong>Microsoft Learn</strong><p>Integration reference</p></div></section>
      </main></body></html>`);
    const { document } = dom.window;
    for (const selector of ['.offering-card', '.catalog-card', '.delivery-list article']) {
      const card = document.querySelector(selector);
      const background = dom.window.getComputedStyle(card).backgroundColor;
      for (const text of card.querySelectorAll('h3, strong, p')) {
        const foreground = dom.window.getComputedStyle(text).color;
        expect(contrast(foreground, background), `${file}: ${selector} ${text.tagName}`).toBeGreaterThanOrEqual(4.5);
      }
    }
    const darkCard = document.querySelector('.reference-card');
    const foreground = dom.window.getComputedStyle(darkCard.querySelector('strong')).color;
    expect(contrast(foreground, '#08111f')).toBeGreaterThanOrEqual(4.5);
    dom.window.close();
  });
});
