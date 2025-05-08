import { PokerHandEvaluatorModule } from '../dist/phevaluator';

/**
 * Pre-initialized WASM poker hand evaluator
 */
declare const PHEvaluator: {
  /**
   * Check if the WASM module is fully initialized
   * @returns true if the module is ready, false otherwise
   */
  isReady(): boolean;
  
  /**
   * Wait for the module to be fully initialized
   * @returns A promise that resolves when the module is ready
   */
  ready(): Promise<PokerHandEvaluatorModule>;
  
  /**
   * Evaluates a poker hand with any number of cards (5, 6, or 7)
   * @param cards Array of card strings (e.g., ["Ah", "Kh", "Qh", "Jh", "Th"])
   * @returns The hand rank object
   */
  evaluate(cards: string[]): any;
  
  /**
   * Evaluates a 5-card poker hand using string notation
   * @param a String representation of the first card (e.g., "Ah" for Ace of hearts)
   * @param b String representation of the second card
   * @param c String representation of the third card
   * @param d String representation of the fourth card
   * @param e String representation of the fifth card
   * @returns A HandRank object indicating the hand strength
   */
  evaluate5(a: string, b: string, c: string, d: string, e: string): any;
  
  /**
   * Evaluates a 6-card poker hand using string notation
   * @param a String representation of the first card (e.g., "Ah" for Ace of hearts)
   * @param b String representation of the second card
   * @param c String representation of the third card
   * @param d String representation of the fourth card
   * @param e String representation of the fifth card
   * @param f String representation of the sixth card
   * @returns A HandRank object indicating the hand strength
   */
  evaluate6(a: string, b: string, c: string, d: string, e: string, f: string): any;
  
  /**
   * Evaluates a 7-card poker hand using string notation
   * @param a String representation of the first card (e.g., "Ah" for Ace of hearts)
   * @param b String representation of the second card
   * @param c String representation of the third card
   * @param d String representation of the fourth card
   * @param e String representation of the fifth card
   * @param f String representation of the sixth card
   * @param g String representation of the seventh card
   * @returns A HandRank object indicating the hand strength
   */
  evaluate7(a: string, b: string, c: string, d: string, e: string, f: string, g: string): any;
  
  /**
   * Evaluates an Omaha poker hand using string notation
   * @param c1 String representation of the first community card
   * @param c2 String representation of the second community card
   * @param c3 String representation of the third community card
   * @param c4 String representation of the fourth community card
   * @param c5 String representation of the fifth community card
   * @param h1 String representation of the first hole card
   * @param h2 String representation of the second hole card
   * @param h3 String representation of the third hole card
   * @param h4 String representation of the fourth hole card
   * @returns A HandRank object indicating the hand strength
   */
  evaluateOmaha(
    c1: string,
    c2: string,
    c3: string,
    c4: string,
    c5: string,
    h1: string,
    h2: string,
    h3: string,
    h4: string
  ): any;
  
  /**
   * Get the raw WebAssembly module (for advanced usage)
   * @returns The initialized WebAssembly module
   */
  getRawModule(): PokerHandEvaluatorModule;
};

/**
 * Factory function to instantiate the WebAssembly module
 * @returns A promise that resolves to the PokerHandEvaluatorModule
 */
declare function PokerHandEvaluatorWasmFactory(): Promise<PokerHandEvaluatorModule>;

export default PHEvaluator;
export { PokerHandEvaluatorWasmFactory }; 