/**
 * ES Modules example for PokerHandEvaluator-wasm
 * 
 * Run with: node --experimental-modules examples/esm-example.mjs
 * (Node.js may require the --experimental-modules flag depending on version)
 */

// Import using ES modules syntax
import PHEvaluator from '../lib/phevaluator.mjs';

async function main() {
  try {
    // Wait for the module to initialize
    console.log('Initializing WebAssembly module...');
    await PHEvaluator.ready();
    console.log('Module initialized successfully!\n');

    // Evaluate some example hands
    console.log('Evaluating hands:');
    
    // Royal Flush
    const royalFlush = PHEvaluator.evaluate(['As', 'Ks', 'Qs', 'Js', 'Ts']);
    console.log('Royal Flush:', royalFlush.toString());
    console.log('  Category:', royalFlush.categoryName());
    console.log('  Value:', royalFlush.value);
    
    // Full House
    const fullHouse = PHEvaluator.evaluate(['Ah', 'Ad', 'As', 'Kh', 'Kd']);
    console.log('\nFull House:', fullHouse.toString());
    console.log('  Category:', fullHouse.categoryName());
    console.log('  Value:', fullHouse.value);
    
    // Evaluate Texas Hold'em hand (7 cards)
    const holdemHand = PHEvaluator.evaluate7('Ah', 'Kh', 'Qh', 'Jh', 'Th', '2c', '3d');
    console.log('\nTexas Hold\'em (7 cards):', holdemHand.toString());
    
    // Compare hands
    console.log('\nComparing hands:');
    if (royalFlush.value < fullHouse.value) {
      console.log('Royal Flush is stronger than Full House');
    } else {
      console.log('Full House is stronger than Royal Flush');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the example
main().catch(console.error); 