/**
 * PokerHandEvaluator WASM wrapper - ESM version
 * This file provides a clean API for the WebAssembly module
 */

// Import the WebAssembly module
import PokerHandEvaluatorWasmFactory from '../dist/phevaluator.js';

// Pre-initialize the module
let modulePromise = null;
let initializedModule = null;

// Initialize the module on import
modulePromise = PokerHandEvaluatorWasmFactory().then(module => {
  initializedModule = module;
  return module;
});

// Create synchronous accessors for the module
const PHEvaluator = {
  // Indicate if the module is ready
  isReady: () => initializedModule !== null,
  
  // Wait for the module to be ready
  ready: () => modulePromise,
  
  // Evaluate a hand of cards (any length)
  evaluate: (cards) => {
    if (!initializedModule) {
      throw new Error('WASM module not initialized yet. Use PHEvaluator.ready().then() or await PHEvaluator.ready() first.');
    }
    
    if (cards.length === 5) {
      return initializedModule.evaluate5FromStrings(cards[0], cards[1], cards[2], cards[3], cards[4]);
    } else if (cards.length === 6) {
      return initializedModule.evaluate6FromStrings(cards[0], cards[1], cards[2], cards[3], cards[4], cards[5]);
    } else if (cards.length === 7) {
      return initializedModule.evaluate7FromStrings(cards[0], cards[1], cards[2], cards[3], cards[4], cards[5], cards[6]);
    } else {
      throw new Error(`Unsupported number of cards: ${cards.length}`);
    }
  },
  
  // Provide direct access to specific evaluators
  evaluate5: (a, b, c, d, e) => {
    if (!initializedModule) {
      throw new Error('WASM module not initialized yet. Use PHEvaluator.ready().then() or await PHEvaluator.ready() first.');
    }
    return initializedModule.evaluate5FromStrings(a, b, c, d, e);
  },
  
  evaluate6: (a, b, c, d, e, f) => {
    if (!initializedModule) {
      throw new Error('WASM module not initialized yet. Use PHEvaluator.ready().then() or await PHEvaluator.ready() first.');
    }
    return initializedModule.evaluate6FromStrings(a, b, c, d, e, f);
  },
  
  evaluate7: (a, b, c, d, e, f, g) => {
    if (!initializedModule) {
      throw new Error('WASM module not initialized yet. Use PHEvaluator.ready().then() or await PHEvaluator.ready() first.');
    }
    return initializedModule.evaluate7FromStrings(a, b, c, d, e, f, g);
  },
  
  evaluateOmaha: (c1, c2, c3, c4, c5, h1, h2, h3, h4) => {
    if (!initializedModule) {
      throw new Error('WASM module not initialized yet. Use PHEvaluator.ready().then() or await PHEvaluator.ready() first.');
    }
    return initializedModule.evaluateOmahaFromStrings(c1, c2, c3, c4, c5, h1, h2, h3, h4);
  },
  
  // Get the raw WASM module (for advanced use)
  getRawModule: () => {
    if (!initializedModule) {
      throw new Error('WASM module not initialized yet. Use PHEvaluator.ready().then() or await PHEvaluator.ready() first.');
    }
    return initializedModule;
  }
};

// Export the wrapper and factory
export default PHEvaluator;
export { PokerHandEvaluatorWasmFactory }; 