/**
 * Test helpers for PokerHandEvaluator-wasm tests
 * Provides common poker hand combinations and category information
 */

// Common poker hand combinations
module.exports = {
  // Five-card hands
  ROYAL_FLUSH: ["Ah", "Kh", "Qh", "Jh", "Th"],
  STRAIGHT_FLUSH: ["9h", "8h", "7h", "6h", "5h"],
  FOUR_OF_A_KIND: ["Ah", "Ad", "As", "Ac", "Kh"],
  FULL_HOUSE: ["Ah", "Ad", "As", "Kh", "Kd"],
  FLUSH: ["Ah", "9h", "7h", "5h", "3h"],
  STRAIGHT: ["Ah", "Kd", "Qc", "Js", "Th"],
  THREE_OF_A_KIND: ["Ah", "Ad", "As", "Kh", "Qd"],
  TWO_PAIR: ["Ah", "Ad", "Kh", "Kd", "Qc"],
  ONE_PAIR: ["Ah", "Ad", "Kh", "Qd", "Jc"],
  HIGH_CARD: ["Ah", "Kd", "Qh", "Js", "9c"],
  
  // Hand categories and value ranges (based on actual implementation)
  CATEGORIES: {
    HIGH_CARD: 1,         // High Card
    ONE_PAIR: 2,          // One Pair
    TWO_PAIR: 3,          // Two Pair
    THREE_OF_A_KIND: 4,   // Three of a Kind
    STRAIGHT: 5,          // Straight
    FLUSH: 6,             // Flush
    FULL_HOUSE: 7,        // Full House
    FOUR_OF_A_KIND: 8,    // Four of a Kind
    STRAIGHT_FLUSH: 9     // Straight Flush
  },
  
  // Community card sets for Omaha testing
  COMMUNITY_CARDS: {
    ROYAL_POTENTIAL: ["Ah", "Kh", "Qh", "Jh", "2c"],
    FLUSH_POTENTIAL: ["2h", "5h", "8h", "Jd", "Ac"],
    STRAIGHT_POTENTIAL: ["9c", "Td", "Jh", "Qc", "Kd"],
    FULL_HOUSE_POTENTIAL: ["Ah", "Ad", "Kh", "Kd", "2c"]
  },
  
  // Hole card sets for Omaha testing
  HOLE_CARDS: {
    ROYAL_COMPLETER: ["Th", "9h", "3d", "4s"],
    FLUSH_COMPLETER: ["3h", "4h", "5d", "6c"],
    STRAIGHT_COMPLETER: ["8h", "7s", "5d", "2c"],
    FULL_HOUSE_COMPLETER: ["As", "Ks", "2d", "3c"]
  },
  
  // Invalid cards for testing error handling
  INVALID_CARDS: {
    INVALID_RANK: "Xh",       // Invalid rank
    INVALID_SUIT: "AX",       // Invalid suit
    TOO_SHORT: "A",           // Too short
    TOO_LONG: "Ahx",          // Too long
    EMPTY: "",                // Empty string
    SPECIAL_CHARS: "!@"       // Special characters
  },
  
  // Value ranges for hand categories (for validation)
  VALUE_RANGES: {
    STRAIGHT_FLUSH: [1, 10],
    FOUR_OF_A_KIND: [11, 166],
    FULL_HOUSE: [167, 322],
    FLUSH: [323, 1599],
    STRAIGHT: [1600, 1609],
    THREE_OF_A_KIND: [1610, 2467],
    TWO_PAIR: [2468, 3325],
    ONE_PAIR: [3326, 6185],
    HIGH_CARD: [6186, Infinity]
  },
  
  // Texas Hold'em hand examples (2 hole cards + 5 community)
  TEXAS_HOLDEM: {
    ROYAL_FLUSH: {
      HOLE: ["Ah", "Kh"],
      COMMUNITY: ["Qh", "Jh", "Th", "2c", "3d"]
    },
    FOUR_OF_A_KIND: {
      HOLE: ["Ah", "Ad"],
      COMMUNITY: ["As", "Ac", "Kh", "2c", "3d"]
    },
    FULL_HOUSE: {
      HOLE: ["Ah", "Ad"],
      COMMUNITY: ["As", "Kh", "Kd", "2c", "3d"]
    }
  }
}; 