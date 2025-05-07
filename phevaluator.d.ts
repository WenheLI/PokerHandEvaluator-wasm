declare module 'phevaluator-wasm' {
  interface PokerHandEvaluatorModule {
    /**
     * Evaluates a 5-card poker hand
     * @param a Card ID for the first card
     * @param b Card ID for the second card
     * @param c Card ID for the third card
     * @param d Card ID for the fourth card
     * @param e Card ID for the fifth card
     * @returns A score indicating the hand strength (lower is better)
     */
    evaluate5(a: number, b: number, c: number, d: number, e: number): number;

    /**
     * Evaluates a 6-card poker hand
     * @param a Card ID for the first card
     * @param b Card ID for the second card
     * @param c Card ID for the third card
     * @param d Card ID for the fourth card
     * @param e Card ID for the fifth card
     * @param f Card ID for the sixth card
     * @returns A score indicating the hand strength (lower is better)
     */
    evaluate6(a: number, b: number, c: number, d: number, e: number, f: number): number;

    /**
     * Evaluates a 7-card poker hand (Texas Hold'em)
     * @param a Card ID for the first card
     * @param b Card ID for the second card
     * @param c Card ID for the third card
     * @param d Card ID for the fourth card
     * @param e Card ID for the fifth card
     * @param f Card ID for the sixth card
     * @param g Card ID for the seventh card
     * @returns A score indicating the hand strength (lower is better)
     */
    evaluate7(a: number, b: number, c: number, d: number, e: number, f: number, g: number): number;

    /**
     * Evaluates an Omaha poker hand
     * @param c1 Card ID for the first community card
     * @param c2 Card ID for the second community card
     * @param c3 Card ID for the third community card
     * @param c4 Card ID for the fourth community card
     * @param c5 Card ID for the fifth community card
     * @param h1 Card ID for the first hole card
     * @param h2 Card ID for the second hole card
     * @param h3 Card ID for the third hole card
     * @param h4 Card ID for the fourth hole card
     * @returns A score indicating the hand strength (lower is better)
     */
    evaluateOmaha(
      c1: number,
      c2: number,
      c3: number,
      c4: number,
      c5: number,
      h1: number,
      h2: number,
      h3: number,
      h4: number
    ): number;

    /**
     * Evaluates a 5-card poker hand using string notation
     * @param a String representation of the first card (e.g., "Ah" for Ace of hearts)
     * @param b String representation of the second card
     * @param c String representation of the third card
     * @param d String representation of the fourth card
     * @param e String representation of the fifth card
     * @returns A score indicating the hand strength (lower is better), or -1 if invalid input
     */
    evaluate5FromStrings(a: string, b: string, c: string, d: string, e: string): number;

    /**
     * Evaluates a 7-card poker hand using string notation
     * @param a String representation of the first card (e.g., "Ah" for Ace of hearts)
     * @param b String representation of the second card
     * @param c String representation of the third card
     * @param d String representation of the fourth card
     * @param e String representation of the fifth card
     * @param f String representation of the sixth card
     * @param g String representation of the seventh card
     * @returns A score indicating the hand strength (lower is better), or -1 if invalid input
     */
    evaluate7FromStrings(
      a: string,
      b: string,
      c: string,
      d: string,
      e: string,
      f: string,
      g: string
    ): number;

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
     * @returns A score indicating the hand strength (lower is better), or -1 if invalid input
     */
    evaluateOmahaFromStrings(
      c1: string,
      c2: string,
      c3: string,
      c4: string,
      c5: string,
      h1: string,
      h2: string,
      h3: string,
      h4: string
    ): number;

    /**
     * Converts a card string to its corresponding card ID
     * @param cardStr Card string in the format "<rank><suit>" (e.g., "Ah" for Ace of hearts)
     * @returns The card ID, or -1 if invalid input
     */
    card_string_to_id(cardStr: string): number;
  }

  /**
   * Factory function to instantiate the WebAssembly module
   * @returns A promise that resolves to the PokerHandEvaluatorModule
   */
  function PokerHandEvaluator(): Promise<PokerHandEvaluatorModule>;

  export = PokerHandEvaluator;
} 