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

### Clone the Repository

This repository uses the original PokerHandEvaluator as a Git submodule. Use the following command to clone it with all submodules:

```bash
# Clone the repository with submodules
git clone --recurse-submodules https://github.com/WenheLI/PokerHandEvaluator-wasm.git
cd PokerHandEvaluator-wasm
```

If you already cloned the repository without the `--recurse-submodules` flag, you can initialize and update the submodule with:

```bash
git submodule init
git submodule update
```

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

```javascript
// Install the package
// npm install phevaluator-wasm

const PokerHandEvaluator = require('phevaluator-wasm');

// Load the module asynchronously
PokerHandEvaluator().then(module => {
    // Evaluate a 5-card hand using card IDs
    // Card IDs: rank * 4 + suit (0:clubs, 1:diamonds, 2:hearts, 3:spades)
    const Ah = new module.Card(51);
    const Kh = new module.Card(47);
    const Qh = new module.Card(43);
    const Jh = new module.Card(39);
    const Th = new module.Card(35);
    
    const royalFlushHand = module.evaluate5(Ah, Kh, Qh, Jh, Th); // Royal Flush
    console.log("Royal Flush:", royalFlushHand.toString()); // "Straight Flush (Score: 1)"
    console.log("Hand Category:", royalFlushHand.categoryName()); // "Straight Flush"
    console.log("Category Value:", royalFlushHand.category); // 9
    console.log("Hand Score:", royalFlushHand.value); // 1
    
    // Evaluate using string notation
    const straightFlushHand = module.evaluate7FromStrings("Ah", "Kh", "Qh", "Jh", "Th", "9h", "8h");
    console.log("Straight Flush:", straightFlushHand.toString());
    
    // Evaluate a 6-card hand
    const sixCardHand = module.evaluate6FromStrings("Ah", "Kh", "Qh", "Jh", "Th", "9h");
    console.log("Six-card hand:", sixCardHand.toString());
    
    // Evaluate Omaha hand (4 hole cards, 5 community cards)
    // Community cards: Ah, Kh, Qh, Jd, 2c
    // Hole cards: Th, 9h, 3c, 4d
    const omahaHand = module.evaluateOmahaFromStrings(
        "Ah", "Kh", "Qh", "Jd", "2c",  // Community cards
        "Th", "9h", "3c", "4d"         // Hole cards
    );
    console.log("Omaha Hand:", omahaHand.toString());
    
    // Compare two hands (lower score is better)
    const hand1 = module.evaluate5FromStrings("Ah", "Kh", "Qh", "Jh", "Th"); // Royal Flush
    const hand2 = module.evaluate5FromStrings("As", "Ks", "Qs", "Js", "Ts"); // Royal Flush (different suit)
    const hand3 = module.evaluate5FromStrings("Ah", "Ad", "Ac", "As", "Kh"); // Four of a Kind
    
    if (hand1.value === hand2.value) {
        console.log("Hand 1 and Hand 2 are equal in strength");
    } else if (hand1.value < hand2.value) {
        console.log("Hand 1 is stronger than Hand 2");
    } else {
        console.log("Hand 2 is stronger than Hand 1");
    }
});
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

- `examples/demo.html` - Interactive web demo for evaluating poker hands
- `examples/example.js` - Example usage in Node.js
- `test.js` - Test suite for the WASM module

To run the web demo:

```bash
node server.js
```

Then open your browser to http://localhost:8080/

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

### Development

1. Clone the repository with submodules:
   ```bash
   git clone --recurse-submodules https://github.com/WenheLI/PokerHandEvaluator-wasm.git
   cd PokerHandEvaluator-wasm
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the WebAssembly module:
   ```bash
   npm run build
   ```

4. Run tests:
   ```bash
   npm test
   ```

### Release Process

This project uses GitHub Actions for automated testing and publishing to npm.

#### Manual Release

1. Update the version in package.json using one of the version scripts:
   ```bash
   npm run version:patch   # 0.1.0 -> 0.1.1
   npm run version:minor   # 0.1.0 -> 0.2.0
   npm run version:major   # 0.1.0 -> 1.0.0
   ```

2. Push the new version tag to GitHub:
   ```bash
   git push --follow-tags
   ```

3. Create a new release on GitHub with the same version tag

4. The GitHub Actions workflow will automatically build and publish the package to npm

#### Automated Release via GitHub

1. Go to your GitHub repository's Actions tab
2. Select the "Publish to NPM" workflow
3. Click "Run workflow"
4. The workflow will automatically build, test, and publish the package to npm

## License

This project is licensed under the Apache License 2.0, the same as the original PokerHandEvaluator. 