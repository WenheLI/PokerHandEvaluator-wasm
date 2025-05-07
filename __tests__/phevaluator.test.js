const PokerHandEvaluator = require('../dist/phevaluator.js');
const HANDS = require('./test-helpers');

// Setup and teardown
let pheModule;

beforeAll(async () => {
  // Initialize the WASM module once before all tests
  pheModule = await PokerHandEvaluator();
});

function getCategory(rank) {
  if (rank.categoryName() === "Straight Flush") return HANDS.CATEGORIES.STRAIGHT_FLUSH;
  if (rank.categoryName() === "Four of a Kind") return HANDS.CATEGORIES.FOUR_OF_A_KIND;
  if (rank.categoryName() === "Full House") return HANDS.CATEGORIES.FULL_HOUSE;
  if (rank.categoryName() === "Flush") return HANDS.CATEGORIES.FLUSH;
  if (rank.categoryName() === "Straight") return HANDS.CATEGORIES.STRAIGHT;
  if (rank.categoryName() === "Three of a Kind") return HANDS.CATEGORIES.THREE_OF_A_KIND;
  if (rank.categoryName() === "Two Pair") return HANDS.CATEGORIES.TWO_PAIR;
  if (rank.categoryName() === "One Pair") return HANDS.CATEGORIES.ONE_PAIR;
  if (rank.categoryName() === "High Card") return HANDS.CATEGORIES.HIGH_CARD;
  return -1; // Unknown
}

describe('PokerHandEvaluator WASM Tests', () => {
  test('should correctly evaluate a Royal Flush', () => {
    const royalFlush = HANDS.ROYAL_FLUSH;
    const rank = pheModule.evaluate5FromStrings(
      royalFlush[0], royalFlush[1], royalFlush[2], royalFlush[3], royalFlush[4]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });

  test('should correctly evaluate Four of a Kind', () => {
    const fourOfAKind = HANDS.FOUR_OF_A_KIND;
    const rank = pheModule.evaluate5FromStrings(
      fourOfAKind[0], fourOfAKind[1], fourOfAKind[2], fourOfAKind[3], fourOfAKind[4]
    );
    
    expect(rank.categoryName()).toBe("Four of a Kind");
    expect(rank.category).toBe(8);
  });

  test('should correctly evaluate a Full House', () => {
    const fullHouse = HANDS.FULL_HOUSE;
    const rank = pheModule.evaluate5FromStrings(
      fullHouse[0], fullHouse[1], fullHouse[2], fullHouse[3], fullHouse[4]
    );
    
    expect(rank.categoryName()).toBe("Full House");
    expect(rank.category).toBe(7);
  });

  test('should correctly evaluate a Flush', () => {
    const flush = HANDS.FLUSH;
    const rank = pheModule.evaluate5FromStrings(
      flush[0], flush[1], flush[2], flush[3], flush[4]
    );
    
    expect(rank.categoryName()).toBe("Flush");
    expect(rank.category).toBe(6);
  });

  test('should correctly evaluate a Straight', () => {
    const straight = HANDS.STRAIGHT;
    const rank = pheModule.evaluate5FromStrings(
      straight[0], straight[1], straight[2], straight[3], straight[4]
    );
    
    expect(rank.categoryName()).toBe("Straight");
    expect(rank.category).toBe(5);
  });

  test('should correctly evaluate Three of a Kind', () => {
    const threeOfAKind = HANDS.THREE_OF_A_KIND;
    const rank = pheModule.evaluate5FromStrings(
      threeOfAKind[0], threeOfAKind[1], threeOfAKind[2], threeOfAKind[3], threeOfAKind[4]
    );
    
    expect(rank.categoryName()).toBe("Three of a Kind");
    expect(rank.category).toBe(4);
  });

  test('should correctly evaluate Two Pair', () => {
    const twoPair = HANDS.TWO_PAIR;
    const rank = pheModule.evaluate5FromStrings(
      twoPair[0], twoPair[1], twoPair[2], twoPair[3], twoPair[4]
    );
    
    expect(rank.categoryName()).toBe("Two Pair");
    expect(rank.category).toBe(3);
  });

  test('should correctly evaluate One Pair', () => {
    const onePair = HANDS.ONE_PAIR;
    const rank = pheModule.evaluate5FromStrings(
      onePair[0], onePair[1], onePair[2], onePair[3], onePair[4]
    );
    
    expect(rank.categoryName()).toBe("One Pair");
    expect(rank.category).toBe(2);
  });

  test('should correctly evaluate High Card', () => {
    const highCard = HANDS.HIGH_CARD;
    const rank = pheModule.evaluate5FromStrings(
      highCard[0], highCard[1], highCard[2], highCard[3], highCard[4]
    );
    
    expect(rank.categoryName()).toBe("High Card");
    expect(rank.category).toBe(1);
  });
  
  test('should correctly evaluate a Straight Flush', () => {
    const straightFlush = HANDS.STRAIGHT_FLUSH;
    const rank = pheModule.evaluate5FromStrings(
      straightFlush[0], straightFlush[1], straightFlush[2], straightFlush[3], straightFlush[4]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
  
  test('should correctly evaluate a 7-card hand', () => {
    const sevenCards = [...HANDS.ROYAL_FLUSH, "9h", "2c"];
    const rank = pheModule.evaluate7FromStrings(
      sevenCards[0], sevenCards[1], sevenCards[2], sevenCards[3], 
      sevenCards[4], sevenCards[5], sevenCards[6]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
  
  test('should correctly evaluate a 6-card hand', () => {
    const sixCards = [...HANDS.ROYAL_FLUSH, "9h"];
    const rank = pheModule.evaluate6FromStrings(
      sixCards[0], sixCards[1], sixCards[2], sixCards[3], sixCards[4], sixCards[5]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
  
  test('should correctly evaluate an Omaha hand', () => {
    const communityCards = HANDS.COMMUNITY_CARDS.ROYAL_POTENTIAL;
    const holeCards = HANDS.HOLE_CARDS.ROYAL_COMPLETER;
    
    const rank = pheModule.evaluateOmahaFromStrings(
      communityCards[0], communityCards[1], communityCards[2], 
      communityCards[3], communityCards[4],
      holeCards[0], holeCards[1], holeCards[2], holeCards[3]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
});

describe('Card Utilities', () => {
  test('should correctly get card ID from string', () => {
    expect(pheModule.cardStringToId("2c")).toBeGreaterThanOrEqual(0);
    expect(pheModule.cardStringToId("Td")).toBeGreaterThanOrEqual(0);
  });

  test('should create cards from string IDs', () => {
    const id = pheModule.cardStringToId("Kc");
    const card = new pheModule.Card(id);
    expect(card.id()).toBe(id);
  });

  // Skip the invalid card test for now as it crashes
  test('should handle invalid cards gracefully', () => {
    const invalidRank = pheModule.evaluate5FromStrings("Ah", "Kh", "Qh", "Jh", "XX");
    expect(invalidRank.value).toBe(-1);
    expect(invalidRank.category).toBe(-1);
  });
});

// Additional test cases for comprehensive coverage
describe('Comprehensive Hand Evaluations', () => {
  test('should correctly evaluate a Straight Flush', () => {
    const straightFlush = HANDS.STRAIGHT_FLUSH;
    const rank = pheModule.evaluate5FromStrings(
      straightFlush[0], straightFlush[1], straightFlush[2], straightFlush[3], straightFlush[4]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(getCategory(rank)).toBe(HANDS.CATEGORIES.STRAIGHT_FLUSH);
  });
}); 