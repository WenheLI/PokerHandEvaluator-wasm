# PokerHandEvaluator-wasm

A WebAssembly port of [Henry Lee's PokerHandEvaluator](https://github.com/HenryRLee/PokerHandEvaluator), an efficient poker hand evaluation algorithm and implementation.

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
git clone --recurse-submodules https://github.com/YourUsername/PokerHandEvaluator-wasm.git
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

This will generate `phevaluator.js` and `phevaluator.wasm` files in the current directory.

## Usage

### In a Web Browser

```html
<!DOCTYPE html>
<html>
<head>
    <title>PokerHandEvaluator WASM Demo</title>
</head>
<body>
    <h1>PokerHandEvaluator WASM Demo</h1>
    <div id="result"></div>

    <script>
        // Load the WebAssembly module
        var Module = {
            onRuntimeInitialized: function() {
                // Use the poker hand evaluator
                const result = Module.evaluate5FromStrings("Ah", "Kh", "Qh", "Jh", "Th");
                document.getElementById("result").textContent = 
                    "Royal Flush Score: " + result;
            }
        };
    </script>
    <script src="phevaluator.js"></script>
</body>
</html>
```

### In Node.js

```javascript
const PokerHandEvaluator = require('./phevaluator.js');

PokerHandEvaluator().then(module => {
    // Evaluate a 5-card hand using card IDs
    // Card IDs: rank * 4 + suit (0:clubs, 1:diamonds, 2:hearts, 3:spades)
    const score5 = module.evaluate5(48, 44, 40, 36, 32); // Ah, Kh, Qh, Jh, Th
    console.log("Royal Flush Score:", score5);
    
    // Evaluate a hand using string notation
    const score7 = module.evaluate7FromStrings("Ah", "Kh", "Qh", "Jh", "Th", "9h", "8h");
    console.log("Straight Flush Score:", score7);
});
```

## API Reference

The WebAssembly module exposes the following functions:

### Using Card IDs

- `evaluate5(a, b, c, d, e)` - Evaluate a 5-card poker hand
- `evaluate6(a, b, c, d, e, f)` - Evaluate a 6-card poker hand
- `evaluate7(a, b, c, d, e, f, g)` - Evaluate a 7-card poker hand
- `evaluateOmaha(c1, c2, c3, c4, c5, h1, h2, h3, h4)` - Evaluate an Omaha poker hand

### Using String Notation

- `evaluate5FromStrings(a, b, c, d, e)` - Evaluate a 5-card poker hand using string notation
- `evaluate7FromStrings(a, b, c, d, e, f, g)` - Evaluate a 7-card poker hand using string notation
- `evaluateOmahaFromStrings(c1, c2, c3, c4, c5, h1, h2, h3, h4)` - Evaluate an Omaha poker hand using string notation

String notation format: `<rank><suit>` where:
- Rank: 2, 3, 4, 5, 6, 7, 8, 9, T, J, Q, K, A
- Suit: c (clubs), d (diamonds), h (hearts), s (spades)

Examples: "Ah" (Ace of hearts), "Kd" (King of diamonds), "2c" (Two of clubs)

## Demos & Examples

- `demo.html` - Interactive web demo for evaluating poker hands
- `example.js` - Example usage in Node.js
- `test.js` - Test suite for the WASM module

To run the web demo:

```bash
node server.js
```

Then open your browser to http://localhost:8080/

## Project Structure

- `src/phevaluator_wasm.cpp` - C++ wrapper for exposing the poker hand evaluator to JavaScript
- `CMakeLists.txt` - CMake build configuration for the WebAssembly module
- `PokerHandEvaluator/` - Git submodule of the original PokerHandEvaluator library

## License

This project is licensed under the Apache License 2.0, the same as the original PokerHandEvaluator. 