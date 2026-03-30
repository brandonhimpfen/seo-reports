function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeEntry(entry = {}) {
  return {
    url: entry.url ?? null,
    status: entry.status ?? "unknown",
    title: entry.title ?? null,
    description: entry.description ?? null,
    canonical: entry.canonical ?? null,
    robots: entry.robots ?? null,
    issues: asArray(entry.issues),
    warnings: asArray(entry.warnings),
    checks: entry.checks && typeof entry.checks === "object" ? entry.checks : {}
  };
}

export function summarizeSeoEntries(entries = []) {
  const normalized = entries.map(normalizeEntry);
  const summary = {
    total: normalized.length,
    passed: 0,
    warning: 0,
    failed: 0,
    unknown: 0,
    issueCount: 0,
    warningCount: 0,
    missing: {
      title: 0,
      description: 0,
      canonical: 0,
      robots: 0
    }
  };

  for (const entry of normalized) {
    if (entry.status in summary) {
      summary[entry.status] += 1;
    } else {
      summary.unknown += 1;
    }

    summary.issueCount += entry.issues.length;
    summary.warningCount += entry.warnings.length;

    if (!entry.title) summary.missing.title += 1;
    if (!entry.description) summary.missing.description += 1;
    if (!entry.canonical) summary.missing.canonical += 1;
    if (!entry.robots) summary.missing.robots += 1;
  }

  return summary;
}

export function createSeoReport(entries = [], options = {}) {
  const summary = summarizeSeoEntries(entries);
  const title = options.title ?? "SEO Report";
  const generatedAt = options.generatedAt ?? new Date().toISOString();

  return {
    title,
    generatedAt,
    summary,
    entries: entries.map(normalizeEntry)
  };
}

export function renderTextReport(report) {
  const lines = [
    `${report.title}`,
    `Generated: ${report.generatedAt}`,
    "",
    `Total pages: ${report.summary.total}`,
    `Passed: ${report.summary.passed}`,
    `Warnings: ${report.summary.warning}`,
    `Failed: ${report.summary.failed}`,
    `Unknown: ${report.summary.unknown}`,
    `Issues: ${report.summary.issueCount}`,
    `Warnings count: ${report.summary.warningCount}`,
    "",
    "Missing fields:",
    `- Title: ${report.summary.missing.title}`,
    `- Description: ${report.summary.missing.description}`,
    `- Canonical: ${report.summary.missing.canonical}`,
    `- Robots: ${report.summary.missing.robots}`
  ];

  return lines.join("\n");
}

export function renderJsonReport(report, space = 2) {
  return JSON.stringify(report, null, space);
}
