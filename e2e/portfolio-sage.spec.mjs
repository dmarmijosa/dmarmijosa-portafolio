/**
 * Playwright CLI e2e checks for sage-mode portfolio design migration.
 * Run: node e2e/portfolio-sage.spec.mjs
 */
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outputDir = path.join(root, 'output', 'playwright');
const pwcli = process.env.PWCLI ?? path.join(process.env.HOME, '.codex/skills/playwright/scripts/playwright_cli.sh');
const baseUrl = process.env.PORTFOLIO_URL ?? 'http://localhost:4200';

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: 'inherit', shell: false, ...opts });
    child.on('close', (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} exited ${code}`))));
  });
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  await run(pwcli, ['open', baseUrl]);
  await run(pwcli, ['run-code', `
    async (page) => {
      await page.waitForSelector('#top');
      await page.waitForSelector('#about');
      await page.waitForSelector('#projects');
      await page.waitForSelector('#contact');
      const heroArt = await page.locator('img[src*="portfolio-sage-hero-art"]').count();
      const eyebrow = await page.locator('.eyebrow-label').count();
      if (heroArt < 1) throw new Error('Missing sage hero art image');
      if (eyebrow < 1) throw new Error('Missing eyebrow-label sage styling');
      const h1 = await page.locator('h1').first().textContent();
      if (!h1?.includes('Danny Armijos')) throw new Error('Hero name not found');
      return { heroArt, eyebrow, h1: h1.trim() };
    }
  `]);

  await run(pwcli, ['run-code', `
    async (page) => {
      const before = await page.locator('html').getAttribute('lang');
      await page.getByRole('button', { name: /Cambiar idioma|Switch language/i }).click();
      await page.waitForTimeout(400);
      const after = await page.locator('html').getAttribute('lang');
      if (before === after) throw new Error('Locale toggle did not change lang');
      return { before, after };
    }
  `]);

  await run(pwcli, ['run-code', `
    async (page) => {
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.screenshot({ path: '${path.join(outputDir, 'portfolio-sage-desktop.png')}', fullPage: true });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.screenshot({ path: '${path.join(outputDir, 'portfolio-sage-mobile.png')}', fullPage: true });
    }
  `]);

  await run(pwcli, ['close']);
  console.log('Playwright sage-mode checks passed.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
