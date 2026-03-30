# seo-reports

Generate simple SEO report summaries from validation and monitoring data.

`seo-reports` is a lightweight utility for turning page-level SEO checks into readable summaries. It is designed for workflows where you want a simple report output without building a full dashboard.

## Why this project exists

SEO workflows often produce validation results, warnings, and metadata checks, but the output is not always easy to review quickly. This package turns those results into structured summaries that can be rendered as text or JSON.

## What is included

- SEO entry normalization.
- Summary aggregation.
- Report builder.
- Plain text report rendering.
- JSON report rendering.
- Tests and example usage.

## Install

```bash
npm install seo-reports
```

## Example

```js
import { createSeoReport, renderTextReport } from 'seo-reports';

const report = createSeoReport([
  {
    url: 'https://example.com/',
    status: 'passed',
    title: 'Home',
    description: 'Example home page',
    canonical: 'https://example.com/',
    robots: 'index,follow'
  },
  {
    url: 'https://example.com/about',
    status: 'warning',
    title: 'About',
    warnings: ['Meta description is shorter than recommended']
  }
], {
  title: 'Weekly SEO Report'
});

console.log(renderTextReport(report));
```

## Output

The package produces a structured report object with:

- summary counts.
- missing field counts.
- normalized page entries.
- text and JSON renderers.

## Design Principles

This project is intentionally minimal. It focuses on readable summaries rather than full SEO crawling, auditing, or dashboard functionality.

## License

MIT
