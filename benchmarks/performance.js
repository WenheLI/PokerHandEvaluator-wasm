const { performance } = require('perf_hooks');
const PHEvaluator = require('../lib/phevaluator');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Number of iterations for each benchmark
const ITERATIONS = 100000;
const WARMUP_ITERATIONS = 1000;

// Test cases
const testCases = {
  fiveCardHand: ['As', 'Kh', 'Qd', 'Jc', '10s'],
  sevenCardHand: ['As', 'Kh', 'Qd', 'Jc', '10s', '9h', '8d'],
};

// Benchmark the WebAssembly implementation
async function benchmarkWasm() {
  // Make sure the module is initialized
  await PHEvaluator.ready();
  
  console.log('Running WebAssembly benchmarks...');
  const results = {};


  // Run benchmarks
  Object.entries(testCases).forEach(([name, cards]) => {
    const start = performance.now();
    for (let i = 0; i < ITERATIONS; i++) {
      PHEvaluator.evaluate(cards);
    }
    const end = performance.now();
    const timeMs = end - start;
    const timePerEval = timeMs / ITERATIONS;
    results[name] = {
      totalTimeMs: timeMs,
      timePerEvalMs: timePerEval,
      evaluationsPerSecond: 1000 / timePerEval
    };
    console.log(`WASM - ${name}: ${timeMs.toFixed(2)}ms total, ${timePerEval.toFixed(6)}ms per evaluation (${Math.round(1000 / timePerEval)} evals/sec)`);
  });

  return results;
}
// Function to generate benchmark results JSON
async function runBenchmarks() {
  const wasmResults = await benchmarkWasm();

  // Save benchmark results to a JSON file
  fs.writeFileSync(
    'benchmarks/results.json',
    JSON.stringify({ 
      timestamp: new Date().toISOString(),
      iterations: ITERATIONS,
      wasm: wasmResults,
    }, null, 2)
  );

  console.log('Benchmark results saved to benchmarks/results.json');
  return { wasm: wasmResults };
}

if (require.main === module) {
  runBenchmarks().catch(error => {
    console.error('Benchmark error:', error);
    process.exit(1);
  });
}

module.exports = { runBenchmarks }; 