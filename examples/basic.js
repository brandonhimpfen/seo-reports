import { createSeoReport, renderTextReport } from '../src/index.js';

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
  title: 'Example SEO Report'
});

console.log(renderTextReport(report));
