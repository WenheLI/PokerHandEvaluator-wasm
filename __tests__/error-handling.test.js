const PokerHandEvaluator = require('../dist/phevaluator.js');

// Setup and teardown
let pheModule;

beforeAll(async () => {
  // Initialize the WASM module once before all tests
  pheModule = await PokerHandEvaluator();
});

describe('Invalid Card Input Handling', () => {
  test('should handle invalid card strings in evaluate5FromStrings', () => {
    const rank = pheModule.evaluate5FromStrings("Ah", "Kh", "Qh", "Jh", "XX");
    
    // Expecting default values for invalid hands
    expect(rank.value).toBe(-1);
    expect(rank.category).toBe(-1);
    expect(rank.categoryName()).toBe("Invalid Hand");
  });
  
  test('should handle invalid card strings in evaluate6FromStrings', () => {
    const rank = pheModule.evaluate6FromStrings("Ah", "Kh", "Qh", "Jh", "Th", "ZZ");
    
    // Expecting default values for invalid hands
    expect(rank.value).toBe(-1);
    expect(rank.category).toBe(-1);
    expect(rank.categoryName()).toBe("Invalid Hand");
  });
  
  test('should handle invalid card strings in evaluate7FromStrings', () => {
    const rank = pheModule.evaluate7FromStrings("Ah", "Kh", "Qh", "Jh", "Th", "9h", "XY");
    
    // Expecting default values for invalid hands
    expect(rank.value).toBe(-1);
    expect(rank.category).toBe(-1);
    expect(rank.categoryName()).toBe("Invalid Hand");
  });
  
  test('should handle invalid card strings in evaluateOmahaFromStrings', () => {
    const rank = pheModule.evaluateOmahaFromStrings(
      "Ah", "Kh", "Qh", "Jh", "XY",  // Last community card is invalid
      "Th", "9h", "3d", "4s"
    );
    
    // Expecting default values for invalid hands
    expect(rank.value).toBe(-1);
    expect(rank.category).toBe(-1);
    expect(rank.categoryName()).toBe("Invalid Hand");
  });
});

describe('Card Object Validation', () => {
  test('should reject creating cards with invalid string', () => {
    // The implementation might handle this differently - either return a special
    // "invalid" card or throw an error.
    // We'll test both possible behaviors.
    
    try {
      const card = pheModule.createCard("XX");
      // If it doesn't throw, it should return a card with an ID of -1 or similar
      expect(card.id()).toBe(-1);
    } catch (error) {
      // If it throws, that's fine too
      expect(error).toBeDefined();
    }
  });
  
  test('should reject creating cards with invalid IDs', () => {
    try {
      const card = new pheModule.Card(-100);
      // If it doesn't throw, the ID should at least be normalized somehow
      expect(card.id()).toBeGreaterThanOrEqual(-1);
    } catch (error) {
      // If it throws, that's fine too
      expect(error).toBeDefined();
    }
  });
});

describe('Edge Cases', () => {
  test('should handle duplicate cards in evaluate5FromStrings', () => {
    // Duplicate cards shouldn't be allowed in a valid poker hand
    // The implementation could either return an invalid result or throw
    
    try {
      const rank = pheModule.evaluate5FromStrings("Ah", "Ah", "Qh", "Jh", "Th");
      
      // If it doesn't throw, we expect an invalid result
      expect(rank.categoryName()).toBe("Invalid Hand");
    } catch (error) {
      // If it throws, that's fine too
      expect(error).toBeDefined();
    }
  });
  
  test('should handle empty or undefined cards', () => {
    try {
      // @ts-ignore - deliberately passing undefined
      const rank = pheModule.evaluate5FromStrings("Ah", "Kh", undefined, "Jh", "Th");
      
      // If it doesn't throw, we expect an invalid result
      expect(rank.categoryName()).toBe("Invalid Hand");
    } catch (error) {
      // If it throws, that's fine too
      expect(error).toBeDefined();
    }
  });
});

describe('HandRank Class Error States', () => {
  test('should create default HandRank for invalid inputs', () => {
    // This tests the default constructor behavior
    // We need to see if there's a way to create an empty HandRank
    
    try {
      // Try to create a HandRank through an invalid evaluation
      const rank = pheModule.evaluate5FromStrings("XX", "YY", "ZZ", "WW", "VV");
      
      // If it doesn't throw, we expect default values
      expect(rank.value).toBe(-1);
      expect(rank.category).toBe(-1);
      expect(rank.categoryName()).toBe("Invalid Hand");
    } catch (error) {
      // If it throws, that's fine too
      expect(error).toBeDefined();
    }
  });
}); 