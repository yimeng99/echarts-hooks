# ECharts Hooks Monorepo

This is a monorepo project for encapsulating ECharts 5 into reusable utility functions.

## Packages

- `@echarts-hooks/core`: Core library with ECharts wrapper functions.

## Installation

Use pnpm to install dependencies:

```bash
pnpm install
```

## Building

Build all packages:

```bash
pnpm build
```

## Usage

Import the functions from `@echarts-hooks/core`:

```typescript
import { createChart, updateChart, disposeChart } from '@echarts-hooks/core';

// Example usage
const container = document.getElementById('chart');
const chart = createChart({
  container,
  options: {
    title: { text: 'ECharts Example' },
    series: [{ type: 'bar', data: [1, 2, 3] }]
  }
});

// Update chart
updateChart(chart, { series: [{ type: 'line', data: [4, 5, 6] }] });

// Dispose
disposeChart(chart);
```