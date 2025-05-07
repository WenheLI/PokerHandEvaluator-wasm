/**
 * Node.js Example for PokerHandEvaluator-wasm
 * 
 * This example demonstrates how to use the PokerHandEvaluator library
 * to evaluate different types of poker hands using both numeric card IDs
 * and string notation.
 */

const PokerHandEvaluator = require('../lib/phevaluator');

// Load the WASM module
PokerHandEvaluator().then(module => {
  console.log('PokerHandEvaluator WASM module loaded successfully!\n');
  
  // Example 1: Evaluate a 5-card hand using card IDs
  // Card IDs: rank * 4 + suit (0:clubs, 1:diamonds, 2:hearts, 3:spades)
  // Ah, Kh, Qh, Jh, Th (Royal Flush)
  const Ah = new module.Card(51);
  const Kh = new module.Card(47);
  const Qh = new module.Card(43);
  const Jh = new module.Card(39);
  const Th = new module.Card(35);
  const royalFlushScore = module.evaluate5(Ah, Kh, Qh, Jh, Th);
  console.log('Example 1: Royal Flush (5-card) using card IDs');
  console.log('Cards: Ah, Kh, Qh, Jh, Th');
  console.log('Hand:', royalFlushScore.toString());
  console.log();
  
  // Example 2: Evaluate a 5-card hand using string notation
  // Ah, Kh, Qh, Jh, Th (Royal Flush)
  const royalFlushScoreStr = module.evaluate5FromStrings('Ah', 'Kh', 'Qh', 'Jh', 'Th');
  console.log('Example 2: Royal Flush (5-card) using string notation');
  console.log('Cards: Ah, Kh, Qh, Jh, Th');
  console.log('Hand:', royalFlushScoreStr.toString());
  console.log();
  
  // Example 3: Evaluate a 7-card hand (Texas Hold'em)
  // Ah, Kh, Qh, Jh, Th, 2c, 3d
  const holdemScore = module.evaluate7FromStrings('Ah', 'Kh', 'Qh', 'Jh', 'Th', '2c', '3d');
  console.log('Example 3: Texas Hold\'em (7-card) hand');
  console.log('Cards: Ah, Kh, Qh, Jh, Th, 2c, 3d');
  console.log('Hand:', holdemScore.toString());
  console.log();
  
  // Example 5: Evaluate an Omaha hand (4 hole cards, 5 community cards)
  // Community cards: Ah, Kh, Qh, Jd, 2c
  // Hole cards: Th, 9h, 3c, 4d
  const omahaScore = module.evaluateOmahaFromStrings(
    'Ah', 'Kh', 'Qh', 'Jd', '2c',  // Community cards
    'Th', '9h', '3c', '4d'         // Hole cards
  );
  console.log('Example 5: Omaha Hand');
  console.log('Community cards: Ah, Kh, Qh, Jd, 2c');
  console.log('Hole cards: Th, 9h, 3c, 4d');
  console.log('Hand:', omahaScore.toString());
  console.log();
  
  // Example 6: Compare two different hands
  const hand1Score = module.evaluate5FromStrings('Ah', 'Kh', 'Qh', 'Jh', 'Th'); // Royal Flush
  const hand2Score = module.evaluate5FromStrings('As', 'Ks', 'Qs', 'Js', 'Ts'); // Royal Flush (different suit)
  const hand3Score = module.evaluate5FromStrings('Ah', 'Ad', 'Ac', 'As', 'Kh'); // Four of a Kind
  
  console.log('Example 6: Hand Comparison');
  console.log('Hand 1 (Ah, Kh, Qh, Jh, Th):', hand1Score.toString());
  console.log('Hand 2 (As, Ks, Qs, Js, Ts):', hand2Score.toString());
  console.log('Hand 3 (Ah, Ad, Ac, As, Kh):', hand3Score.toString());
  
  // Lower score is better in this evaluator
  if (hand1Score.value === hand2Score.value) {
    console.log('Hand 1 and Hand 2 are equal in strength');
  } else if (hand1Score.value < hand2Score.value) {
    console.log('Hand 1 is stronger than Hand 2');
  } else {
    console.log('Hand 2 is stronger than Hand 1');
  }
  
  if (hand1Score.value < hand3Score.value) {
    console.log('Hand 1 (Royal Flush) is stronger than Hand 3 (Four of a Kind)');
  } else {
    console.log('Hand 3 (Four of a Kind) is stronger than Hand 1 (Royal Flush)');
  }
}).catch(err => {
  console.error('Failed to load PokerHandEvaluator module:', err);
});

// How to run this example:
// node examples/example.js
