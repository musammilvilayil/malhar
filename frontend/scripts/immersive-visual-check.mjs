import fs from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = "http://127.0.0.1:4173";
const outputDir = "visual-artifacts";
await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const report = { generatedAt: new Date().toISOString(), viewports: [], failures: [] };

const configs = [
  { name: "desktop", viewport: { width: 1440, height: 1000 }, isMobile: false, hasTouch: false },
  { name: "mobile", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
];

async function selectorTop(page, selector) {
  return page.evaluate((value) => {
    const el = document.querySelector(value);
    if (!el) throw new Error(`Missing selector: ${value}`);
    const rect = el.getBoundingClientRect();
    return rect.top + window.scrollY;
  }, selector);
}

async function selectorHeight(page, selector) {
  return page.evaluate((value) => {
    const el = document.querySelector(value);
    if (!el) throw new Error(`Missing selector: ${value}`);
    return el.getBoundingClientRect().height;
  }, selector);
}

async function scrollAndShot(page, configName, shotName, y) {
  await page.evaluate((targetY) => window.scrollTo({ top: targetY, behavior: "instant" }), Math.max(0, y));
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${outputDir}/${configName}-${shotName}.png`, fullPage: false });
}

for (const config of configs) {
  const context = await browser.newContext({
    viewport: config.viewport,
    isMobile: config.isMobile,
    hasTouch: config.hasTouch,
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));

  await page.goto(baseUrl, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1200);

  await scrollAndShot(page, config.name, "01-hero-start", 0);

  const heroTop = await selectorTop(page, ".tour-hero");
  const heroHeight = await selectorHeight(page, ".tour-hero");
  const heroStickyDistance = Math.max(0, heroHeight - config.viewport.height);
  await scrollAndShot(page, config.name, "02-hero-zoom", heroTop + heroStickyDistance * 0.68);

  const thresholdTop = await selectorTop(page, ".tour-threshold");
  const thresholdHeight = await selectorHeight(page, ".tour-threshold");
  const thresholdStickyDistance = Math.max(0, thresholdHeight - config.viewport.height);
  await scrollAndShot(page, config.name, "03-threshold", thresholdTop + thresholdStickyDistance * 0.52);

  const institutionsTop = await selectorTop(page, ".tour-institutions");
  await scrollAndShot(page, config.name, "04-institutions-start", institutionsTop + 16);

  if (!config.isMobile) {
    await scrollAndShot(page, config.name, "05-institutions-mid", institutionsTop + config.viewport.width * 2.5);
  } else {
    const rooms = await page.locator(".tour-room").count();
    if (rooms < 7) report.failures.push(`${config.name}: expected 7 institution rooms, found ${rooms}`);
    const fourthTop = await page.evaluate(() => {
      const el = document.querySelectorAll(".tour-room")[3];
      const rect = el.getBoundingClientRect();
      return rect.top + window.scrollY - 86;
    });
    await scrollAndShot(page, config.name, "05-institutions-mid", fourthTop);
  }

  const courtyardTop = await selectorTop(page, ".tour-courtyard");
  await scrollAndShot(page, config.name, "06-courtyard", courtyardTop + 16);

  const officeTop = await selectorTop(page, ".tour-office");
  await scrollAndShot(page, config.name, "07-leadership", officeTop + 16);

  const impactTop = await selectorTop(page, ".tour-impact-intro");
  await scrollAndShot(page, config.name, "08-impact", impactTop + 16);

  const statsTop = await selectorTop(page, ".v2-stats");
  await scrollAndShot(page, config.name, "09-stats", statsTop + 16);

  const endTop = await selectorTop(page, ".v2-home-end");
  await scrollAndShot(page, config.name, "10-connect", endTop + 16);

  const imageStatus = await page.evaluate(async () => {
    const sources = [...new Set([...document.images].map((img) => img.src).filter(Boolean))];
    return Promise.all(sources.map((src) => new Promise((resolve) => {
      const probe = new Image();
      const finish = (ok) => resolve({ src, ok, naturalWidth: probe.naturalWidth, naturalHeight: probe.naturalHeight });
      probe.onload = () => finish(true);
      probe.onerror = () => finish(false);
      probe.src = src;
    })));
  });

  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${outputDir}/${config.name}-full-page.png`, fullPage: true });

  const diagnostics = await page.evaluate(() => {
    const root = document.documentElement;
    const visibleText = [...document.querySelectorAll("h1,h2,h3,p,a,button")].filter((el) => {
      const style = getComputedStyle(el);
      const rect = el.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    });

    return {
      innerWidth: window.innerWidth,
      scrollWidth: root.scrollWidth,
      scrollHeight: root.scrollHeight,
      visibleTextElements: visibleText.length,
      institutionRooms: document.querySelectorAll(".tour-room").length,
      leadershipFrames: document.querySelectorAll(".tour-office__frame").length,
    };
  });

  const brokenImages = imageStatus.filter((image) => !image.ok || image.naturalWidth === 0);

  if (diagnostics.scrollWidth > diagnostics.innerWidth + 4) {
    report.failures.push(`${config.name}: horizontal overflow ${diagnostics.scrollWidth}px > ${diagnostics.innerWidth}px`);
  }
  if (brokenImages.length) {
    report.failures.push(`${config.name}: broken images ${JSON.stringify(brokenImages)}`);
  }
  if (diagnostics.institutionRooms !== 7) {
    report.failures.push(`${config.name}: expected 7 institution rooms, got ${diagnostics.institutionRooms}`);
  }
  if (diagnostics.leadershipFrames !== 4) {
    report.failures.push(`${config.name}: expected 4 leadership frames, got ${diagnostics.leadershipFrames}`);
  }
  if (pageErrors.length) {
    report.failures.push(`${config.name}: page errors ${pageErrors.join(" | ")}`);
  }

  report.viewports.push({
    name: config.name,
    viewport: config.viewport,
    diagnostics,
    brokenImages,
    consoleErrors,
    pageErrors,
  });

  await context.close();
}

await fs.writeFile(`${outputDir}/report.json`, JSON.stringify(report, null, 2));
await browser.close();
console.log(JSON.stringify(report, null, 2));

if (report.failures.length) {
  throw new Error(report.failures.join("\n"));
}
