# PokerHandEvaluator-wasm

A WebAssembly port of [Henry Lee's PokerHandEvaluator](https://github.com/HenryRLee/PokerHandEvaluator), an efficient poker hand evaluation algorithm and implementation.

[![npm version](https://badge.fury.io/js/phevaluator-wasm.svg)](https://badge.fury.io/js/phevaluator-wasm)
[![Test](https://github.com/WenheLI/PokerHandEvaluator-wasm/actions/workflows/test.yml/badge.svg)](https://github.com/WenheLI/PokerHandEvaluator-wasm/actions/workflows/test.yml)
[![Publish to NPM](https://github.com/WenheLI/PokerHandEvaluator-wasm/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/WenheLI/PokerHandEvaluator-wasm/actions/workflows/npm-publish.yml)

## Features

- Evaluates poker hands (5-card, 6-card, 7-card and Omaha) using WebAssembly for high performance in browsers and Node.js
- Provides both numeric card ID interface and string-based card notation
- Small footprint, suitable for web applications
- Same fast and efficient algorithm as the original C/C++ implementation

## Getting Started

### Installation

You can install the prebuilt package directly from npm:

```bash
npm install poker-hand-evaluator-wasm
```

The npm package includes all the compiled WebAssembly files and JavaScript wrappers needed to use the library. No additional build steps are required for end-users.

### For Developers: Cloning the Repository

This repository uses the original PokerHandEvaluator as a Git submodule. Use one of the following approaches:

#### Option 1: Clone with submodules (recommended for development)

```bash
# Clone the repository with submodules
git clone --recurse-submodules https://github.com/WenheLI/PokerHandEvaluator-wasm.git
cd PokerHandEvaluator-wasm
```

#### Option 2: Clone and then initialize submodules

If you already cloned the repository without the `--recurse-submodules` flag:

```bash
git clone https://github.com/WenheLI/PokerHandEvaluator-wasm.git
cd PokerHandEvaluator-wasm
git submodule init
git submodule update
```

> **Important**: The Git submodules are only needed if you're building from source or contributing to development. If you're just using the npm package, you don't need to worry about Git submodules.

## Building

To build the WebAssembly module, you need to have Emscripten installed. If you don't have it already, follow the [Emscripten installation instructions](https://emscripten.org/docs/getting_started/downloads.html).

```bash
# Set up Emscripten environment
source path/to/emsdk/emsdk_env.sh

# Build the WebAssembly module
emcmake cmake .
emmake make
```

This will generate `phevaluator.js` and `phevaluator.wasm` files in the `dist` directory.

## Usage

### In Node.js

You can import the module using either CommonJS or ES Modules.

#### CommonJS (require)

```javascript
// Install the package
// npm install poker-hand-evaluator-wasm

const PHEvaluator = require('poker-hand-evaluator-wasm');

// Option 1: Using the simplified API (auto-initialization)
// The module is automatically initialized when required
// All API methods will throw if used before initialization completes

try {
  // Evaluate a hand directly (will throw if module is not ready yet)
  const result = PHEvaluator.evaluate(['As', 'Kh', 'Qd', 'Jc', '10s']);
  console.log("Royal Flush:", result.toString());
} catch (error) {
  console.error("Module not ready yet:", error.message);
}

// Option 2: Using async/await with the ready() method (recommended)
async function evaluateHands() {
  // Wait for the module to be fully initialized
  await PHEvaluator.ready();
  
  // Now safely use any of the module's functions
  const royalFlushHand = PHEvaluator.evaluate(['As', 'Kh', 'Qd', 'Jc', '10s']); // Royal Flush
  console.log("Royal Flush:", royalFlushHand.toString()); // "Straight Flush (Score: 1)"
  console.log("Hand Category:", royalFlushHand.categoryName()); // "Straight Flush"
  console.log("Category Value:", royalFlushHand.category); // 9
  console.log("Hand Score:", royalFlushHand.value); // 1
  
  // Evaluate using specific evaluator functions
  const straightFlushHand = PHEvaluator.evaluate7('Ah', 'Kh', 'Qh', 'Jh', 'Th', '9h', '8h');
  console.log("Straight Flush:", straightFlushHand.toString());
  
  // Evaluate a 6-card hand
  const sixCardHand = PHEvaluator.evaluate6('Ah', 'Kh', 'Qh', 'Jh', 'Th', '9h');
  console.log("Six-card hand:", sixCardHand.toString());
  
  // Evaluate Omaha hand (4 hole cards, 5 community cards)
  const omahaHand = PHEvaluator.evaluateOmaha(
      'Ah', 'Kh', 'Qh', 'Jd', '2c',  // Community cards
      'Th', '9h', '3c', '4d'         // Hole cards
  );
  console.log("Omaha Hand:", omahaHand.toString());
  
  // Compare two hands (lower score is better)
  const hand1 = PHEvaluator.evaluate5('Ah', 'Kh', 'Qh', 'Jh', 'Th'); // Royal Flush
  const hand2 = PHEvaluator.evaluate5('As', 'Ks', 'Qs', 'Js', 'Ts'); // Royal Flush (different suit)
  const hand3 = PHEvaluator.evaluate5('Ah', 'Ad', 'Ac', 'As', 'Kh'); // Four of a Kind
  
  if (hand1.value === hand2.value) {
      console.log("Hand 1 and Hand 2 are equal in strength");
  } else if (hand1.value < hand2.value) {
      console.log("Hand 1 is stronger than Hand 2");
  } else {
      console.log("Hand 2 is stronger than Hand 1");
  }
}

evaluateHands().catch(console.error);

// Option 3: Using the traditional Promise API
PHEvaluator.ready().then(function() {
  const hand = PHEvaluator.evaluate(['As', 'Ks', 'Qs', 'Js', 'Ts']);
  console.log("Royal Flush:", hand.toString());
}).catch(console.error);

// Option 4: Check if the module is already initialized
if (PHEvaluator.isReady()) {
  // Safe to use synchronously if already initialized
  const hand = PHEvaluator.evaluate(['As', 'Ks', 'Qs', 'Js', 'Ts']);
  console.log(hand.toString());
}

// Option 5: Access the raw WebAssembly module directly (advanced usage)
PHEvaluator.ready().then(function() {
  const rawModule = PHEvaluator.getRawModule();
  // Use the raw module API directly
  const Ah = new rawModule.Card(51);
  const Kh = new rawModule.Card(47);

});
```

#### ES Modules (import)

```javascript
// Install the package
// npm install poker-hand-evaluator-wasm

import PHEvaluator from 'poker-hand-evaluator-wasm';
// You can also import the factory function directly if needed
// import PHEvaluator, { PokerHandEvaluatorWasmFactory } from 'poker-hand-evaluator-wasm';

// Option 1: Using the simplified API (auto-initialization)
// The module is automatically initialized when imported
// All API methods will throw if used before initialization completes

try {
  // Evaluate a hand directly (will throw if module is not ready yet)
  const result = PHEvaluator.evaluate(['As', 'Kh', 'Qd', 'Jc', '10s']);
  console.log("Royal Flush:", result.toString());
} catch (error) {
  console.error("Module not ready yet:", error.message);
}

// Option 2: Using async/await with the ready() method (recommended)
async function evaluateHands() {
  // Wait for the module to be fully initialized
  await PHEvaluator.ready();
  
  // Now safely use any of the module's functions
  const royalFlushHand = PHEvaluator.evaluate(['As', 'Ks', 'Qs', 'Js', 'Ts']); // Royal Flush
  console.log("Royal Flush:", royalFlushHand.toString());
}

evaluateHands().catch(console.error);
```

## API Reference

The WebAssembly module exposes the following classes and functions:

### Classes

#### Card

- `new Card(id)` - Create a new Card object with the given card ID
- `Card.prototype.describeCard()` - Get a string description of the card
- `Card.prototype.describeRank()` - Get a string description of the card's rank
- `Card.prototype.describeSuit()` - Get a string description of the card's suit
- `Card.prototype.id()` - Get the numeric ID of the card
- `Card.prototype.toString()` - Get a string representation of the card

#### HandRank

- `HandRank.prototype.value` - The numeric score of the hand (lower is better)
- `HandRank.prototype.category` - The category of the hand (1-9, where 9 is the best)
- `HandRank.prototype.categoryName()` - Get the name of the hand category (e.g., "Straight Flush")
- `HandRank.prototype.toString()` - Get a string representation of the hand with category and score

### Functions Using Card Objects

- `evaluate5(a, b, c, d, e)` - Evaluate a 5-card poker hand
- `evaluate6(a, b, c, d, e, f)` - Evaluate a 6-card poker hand
- `evaluate7(a, b, c, d, e, f, g)` - Evaluate a 7-card poker hand
- `evaluateOmaha(c1, c2, c3, c4, c5, h1, h2, h3, h4)` - Evaluate an Omaha poker hand

### Functions Using String Notation

- `evaluate5FromStrings(a, b, c, d, e)` - Evaluate a 5-card poker hand using string notation
- `evaluate6FromStrings(a, b, c, d, e, f)` - Evaluate a 6-card poker hand using string notation
- `evaluate7FromStrings(a, b, c, d, e, f, g)` - Evaluate a 7-card poker hand using string notation
- `evaluateOmahaFromStrings(c1, c2, c3, c4, c5, h1, h2, h3, h4)` - Evaluate an Omaha poker hand using string notation

### Utility Functions

- `createCardFromString(cardStr)` - Create a Card object from a string representation
- `createCardFromId(id)` - Create a Card object from a numeric ID
- `cardStringToId(cardStr)` - Convert a card string to its corresponding card ID

String notation format: `<rank><suit>` where:
- Rank: 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A
- Suit: c (clubs), d (diamonds), h (hearts), s (spades)

Examples: "Ah" (Ace of hearts), "Kd" (King of diamonds), "2c" (Two of clubs)

## Demos & Examples

See the file in example folder

## Project Structure

- `src/` - C++ WASM bindings
  - `src/phevaluator_wasm.cpp` - C++ wrapper for exposing the poker hand evaluator to JavaScript
  - `src/include/` - Header files
- `lib/` - JavaScript wrapper code
- `dist/` - Compiled WebAssembly output
- `examples/` - Usage examples
- `__tests__/` - Test suite
- `PokerHandEvaluator/` - Git submodule of the original PokerHandEvaluator library
- `CMakeLists.txt` - CMake build configuration for the WebAssembly module
- `.github/workflows/` - GitHub Actions workflows for testing and publishing

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the Apache License 2.0, the same as the original PokerHandEvaluator. 