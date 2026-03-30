import test from 'node:test';
import assert from 'node:assert/strict';
import {
  summarizeSeoEntries,
  createSeoReport,
  renderTextReport,
  renderJsonReport
} from '../src/index.js';

test('summarizeSeoEntries counts statuses and missing fields', () => {
  const summary = summarizeSeoEntries([
    { status: 'passed', title: 'A', description: 'Desc', canonical: '/a', robots: 'index,follow' },
    { status: 'failed', issues: ['missing title'], description: 'Desc' },
    { status: 'warning', warnings: ['long title'], title: 'C', canonical: '/c' }
  ]);

  assert.equal(summary.total, 3);
  assert.equal(summary.passed, 1);
  assert.equal(summary.failed, 1);
  assert.equal(summary.warning, 1);
  assert.equal(summary.issueCount, 1);
  assert.equal(summary.warningCount, 1);
  assert.equal(summary.missing.title, 1);
  assert.equal(summary.missing.description, 1);
  assert.equal(summary.missing.canonical, 1);
  assert.equal(summary.missing.robots, 2);
});

test('createSeoReport returns full report structure', () => {
  const report = createSeoReport([{ url: '/home', status: 'passed', title: 'Home' }], {
    title: 'Weekly SEO Report',
    generatedAt: '2026-03-29T00:00:00.000Z'
  });

  assert.equal(report.title, 'Weekly SEO Report');
  assert.equal(report.generatedAt, '2026-03-29T00:00:00.000Z');
  assert.equal(report.entries.length, 1);
  assert.equal(report.summary.total, 1);
});

test('renderTextReport returns readable summary', () => {
  const report = createSeoReport([{ status: 'passed', title: 'Home' }], {
    title: 'SEO Report',
    generatedAt: '2026-03-29T00:00:00.000Z'
  });

  const text = renderTextReport(report);
  assert.match(text, /SEO Report/);
  assert.match(text, /Total pages: 1/);
});

test('renderJsonReport returns json', () => {
  const report = createSeoReport([]);
  const json = renderJsonReport(report);
  const parsed = JSON.parse(json);
  assert.equal(parsed.summary.total, 0);
});
