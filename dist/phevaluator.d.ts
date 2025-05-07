declare module 'phevaluator-wasm' {
  // Define HandRank class interface
  interface HandRank {
    /** The numeric score value of the hand (lower is better) */
    value: number;
    
    /** The category of the hand (1-9, where 9 is the best) */
    category: number;
    
    /** Get the name of the hand category (e.g., "Royal Flush", "Four of a Kind") */
    categoryName(): string;
    
    /** Get a string representation of the hand with category and score */
    toString(): string;
  }
  
  interface Card {
    /** Get the numeric ID of the card */
    id(): number;
    
    /** Get a string description of the card */
    describeCard(): string;
    
    /** Get a string description of the card rank */
    describeRank(): string;
    
    /** Get a string description of the card suit */
    describeSuit(): string;
    
    /** Get a string representation of the card */
    toString(): string;
  }
  
  interface PokerHandEvaluatorModule {
    /**
     * Card class constructor
     * @param id The card ID
     */
    Card: new (id: number) => Card;
    
    /**
     * HandRank class
     */
    HandRank: new () => HandRank;
    
    /**
     * Evaluates a 5-card poker hand
     * @param a Card for the first card
     * @param b Card for the second card
     * @param c Card for the third card
     * @param d Card for the fourth card
     * @param e Card for the fifth card
     * @returns A HandRank object indicating the hand strength
     */
    evaluate5(a: Card, b: Card, c: Card, d: Card, e: Card): HandRank;

    /**
     * Evaluates a 6-card poker hand
     * @param a Card for the first card
     * @param b Card for the second card
     * @param c Card for the third card
     * @param d Card for the fourth card
     * @param e Card for the fifth card
     * @param f Card for the sixth card
     * @returns A HandRank object indicating the hand strength
     */
    evaluate6(a: Card, b: Card, c: Card, d: Card, e: Card, f: Card): HandRank;

    /**
     * Evaluates a 7-card poker hand (Texas Hold'em)
     * @param a Card for the first card
     * @param b Card for the second card
     * @param c Card for the third card
     * @param d Card for the fourth card
     * @param e Card for the fifth card
     * @param f Card for the sixth card
     * @param g Card for the seventh card
     * @returns A HandRank object indicating the hand strength
     */
    evaluate7(a: Card, b: Card, c: Card, d: Card, e: Card, f: Card, g: Card): HandRank;

    /**
     * Evaluates an Omaha poker hand
     * @param c1 Card for the first community card
     * @param c2 Card for the second community card
     * @param c3 Card for the third community card
     * @param c4 Card for the fourth community card
     * @param c5 Card for the fifth community card
     * @param h1 Card for the first hole card
     * @param h2 Card for the second hole card
     * @param h3 Card for the third hole card
     * @param h4 Card for the fourth hole card
     * @returns A HandRank object indicating the hand strength
     */
    evaluateOmaha(
      c1: Card,
      c2: Card,
      c3: Card,
      c4: Card,
      c5: Card,
      h1: Card,
      h2: Card,
      h3: Card,
      h4: Card
    ): HandRank;

    /**
     * Evaluates a 5-card poker hand using string notation
     * @param a String representation of the first card (e.g., "Ah" for Ace of hearts)
     * @param b String representation of the second card
     * @param c String representation of the third card
     * @param d String representation of the fourth card
     * @param e String representation of the fifth card
     * @returns A HandRank object indicating the hand strength
     */
    evaluate5FromStrings(a: string, b: string, c: string, d: string, e: string): HandRank;

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
    evaluate6FromStrings(a: string, b: string, c: string, d: string, e: string, f: string): HandRank;

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
    evaluate7FromStrings(
      a: string,
      b: string,
      c: string,
      d: string,
      e: string,
      f: string,
      g: string
    ): HandRank;

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
    ): HandRank;

    /**
     * Converts a card string to its corresponding card ID
     * @param cardStr Card string in the format "<rank><suit>" (e.g., "Ah" for Ace of hearts)
     * @returns The card ID, or -1 if invalid input
     */
    cardStringToId(cardStr: string): number;
    
    /**
     * Creates a Card object from a string representation
     * @param cardStr Card string in the format "<rank><suit>" (e.g., "Ah" for Ace of hearts)
     * @returns A Card object
     */
    createCardFromString(cardStr: string): Card;
    
    /**
     * Creates a Card object from a numeric ID
     * @param id The card ID
     * @returns A Card object
     */
    createCardFromId(id: number): Card;
  }

  /**
   * Factory function to instantiate the WebAssembly module
   * @returns A promise that resolves to the PokerHandEvaluatorModule
   */
  function PokerHandEvaluator(): Promise<PokerHandEvaluatorModule>;

  export = PokerHandEvaluator;
} 