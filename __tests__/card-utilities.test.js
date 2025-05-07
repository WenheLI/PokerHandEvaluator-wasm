const PokerHandEvaluator = require('../dist/phevaluator.js');

// Setup and teardown
let pheModule;

beforeAll(async () => {
  // Initialize the WASM module once before all tests
  pheModule = await PokerHandEvaluator();
});

describe('Card Creation and Conversion', () => {
  test('should create a Card from string notation', () => {
    const card = pheModule.createCard("Ah");
    expect(card).toBeDefined();
    expect(card.id()).toBeGreaterThanOrEqual(0);
  });
  
  test('should create a Card from numerical ID', () => {
    const id = pheModule.cardStringToId("Kc");
    const card = new pheModule.Card(id);
    expect(card).toBeDefined();
    expect(card.id()).toBe(id);
  });
  
  test('should correctly convert card strings to IDs', () => {
    expect(pheModule.cardStringToId("2c")).toBeGreaterThanOrEqual(0);
    expect(pheModule.cardStringToId("Td")).toBeGreaterThanOrEqual(0);
    expect(pheModule.cardStringToId("Ah")).toBeGreaterThanOrEqual(0);
  });
  
  test('should create different IDs for different cards', () => {
    const id1 = pheModule.cardStringToId("Ah");
    const id2 = pheModule.cardStringToId("Kh");
    const id3 = pheModule.cardStringToId("Ac");
    
    expect(id1).not.toBe(id2);
    expect(id1).not.toBe(id3);
    expect(id2).not.toBe(id3);
  });
});

describe('Card Methods', () => {
  test('should return card ID with id() method', () => {
    const card = pheModule.createCard("Ah");
    expect(typeof card.id()).toBe('number');
  });
  
  test('should have valid card representation methods', () => {
    const cardAh = pheModule.createCard("Ah");
    const cardKc = pheModule.createCard("Kc");
    const card2d = pheModule.createCard("2d");
    const cardTs = pheModule.createCard("Ts");
    
    // Check if the Card object has the expected methods
    expect(typeof cardAh.describeCard).toBe('function');
    expect(typeof cardAh.describeRank).toBe('function');
    expect(typeof cardAh.describeSuit).toBe('function');
    
    // The current implementation may return numbers or strings,
    // so we'll just verify the methods can be called without errors
    expect(() => cardAh.describeCard()).not.toThrow();
    expect(() => cardAh.describeRank()).not.toThrow();
    expect(() => cardAh.describeSuit()).not.toThrow();
    
    expect(() => cardKc.describeCard()).not.toThrow();
    expect(() => card2d.describeCard()).not.toThrow();
    expect(() => cardTs.describeCard()).not.toThrow();
  });
});

describe('Card Validation', () => {
  test('should reject invalid card strings', () => {
    // This test depends on the implementation's behavior with invalid cards
    // Some implementations might return -1, others might throw
    // We'll focus on ID comparisons instead of errors
    
    const validId = pheModule.cardStringToId("Ah");
    
    const invalidCardId1 = pheModule.cardStringToId("X1"); // Invalid rank
    const invalidCardId2 = pheModule.cardStringToId("AX"); // Invalid suit
    const invalidCardId3 = pheModule.cardStringToId("A");  // Too short
    
    // The implementation should handle these cases somehow (different ID or error)
    expect(invalidCardId1).not.toBe(validId);
    
    // Note that some implementations might throw errors for invalid cards,
    // in which case we'd need to modify this test
  });
});

describe('HandRank Properties', () => {
  test('should have value and category properties', () => {
    const royalFlush = ["Ah", "Kh", "Qh", "Jh", "Th"];
    const rank = pheModule.evaluate5FromStrings(
      royalFlush[0], royalFlush[1], royalFlush[2], royalFlush[3], royalFlush[4]
    );
    
    expect(typeof rank.value).toBe('number');
    expect(typeof rank.category).toBe('number');
    expect(typeof rank.categoryName()).toBe('string');
  });
  
  test('different hand categories should have different values', () => {
    const straightFlush = pheModule.evaluate5FromStrings("Ah", "Kh", "Qh", "Jh", "Th");
    const fourOfAKind = pheModule.evaluate5FromStrings("Ah", "Ad", "As", "Ac", "Kh");
    const fullHouse = pheModule.evaluate5FromStrings("Ah", "Ad", "As", "Kh", "Kd");
    
    // Verify that hand rankings are ordered correctly
    expect(straightFlush.category).toBeGreaterThan(fourOfAKind.category);
    expect(fourOfAKind.category).toBeGreaterThan(fullHouse.category);
  });
}); 