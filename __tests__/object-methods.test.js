const PokerHandEvaluator = require('../dist/phevaluator.js');
const HANDS = require('./test-helpers');

// Setup and teardown
let pheModule;

beforeAll(async () => {
  // Initialize the WASM module once before all tests
  pheModule = await PokerHandEvaluator();
});

// Helper to create a Card object from a string notation
function createCard(cardStr) {
  return pheModule.createCard(cardStr);
}

// Helper to create an array of Card objects from string notations
function createCards(cardStrs) {
  return cardStrs.map(str => pheModule.createCard(str));
}

describe('5-Card Object-Based Evaluation', () => {
  test('should correctly evaluate a Royal Flush using Card objects', () => {
    const cards = createCards(HANDS.ROYAL_FLUSH);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
    expect(rank.value).toBeLessThan(10); // Royal flush has a very low value
  });

  test('should correctly evaluate a Straight Flush using Card objects', () => {
    const cards = createCards(HANDS.STRAIGHT_FLUSH);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });

  test('should correctly evaluate Four of a Kind using Card objects', () => {
    const cards = createCards(HANDS.FOUR_OF_A_KIND);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("Four of a Kind");
    expect(rank.category).toBe(8);
  });

  test('should correctly evaluate a Full House using Card objects', () => {
    const cards = createCards(HANDS.FULL_HOUSE);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("Full House");
    expect(rank.category).toBe(7);
  });

  test('should correctly evaluate a Flush using Card objects', () => {
    const cards = createCards(HANDS.FLUSH);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("Flush");
    expect(rank.category).toBe(6);
  });

  test('should correctly evaluate a Straight using Card objects', () => {
    const cards = createCards(HANDS.STRAIGHT);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("Straight");
    expect(rank.category).toBe(5);
  });

  test('should correctly evaluate Three of a Kind using Card objects', () => {
    const cards = createCards(HANDS.THREE_OF_A_KIND);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("Three of a Kind");
    expect(rank.category).toBe(4);
  });

  test('should correctly evaluate Two Pair using Card objects', () => {
    const cards = createCards(HANDS.TWO_PAIR);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("Two Pair");
    expect(rank.category).toBe(3);
  });

  test('should correctly evaluate One Pair using Card objects', () => {
    const cards = createCards(HANDS.ONE_PAIR);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("One Pair");
    expect(rank.category).toBe(2);
  });

  test('should correctly evaluate High Card using Card objects', () => {
    const cards = createCards(HANDS.HIGH_CARD);
    const rank = pheModule.evaluate5(cards[0], cards[1], cards[2], cards[3], cards[4]);
    
    expect(rank.categoryName()).toBe("High Card");
    expect(rank.category).toBe(1);
  });
});

describe('6-Card Object-Based Evaluation', () => {
  test('should correctly evaluate a 6-card hand with Royal Flush using Card objects', () => {
    const sixCards = [...HANDS.ROYAL_FLUSH, "9h"];
    const cards = createCards(sixCards);
    
    const rank = pheModule.evaluate6(
      cards[0], cards[1], cards[2], cards[3], cards[4], cards[5]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
  
  test('should correctly evaluate a 6-card hand with Four of a Kind using Card objects', () => {
    const sixCards = [...HANDS.FOUR_OF_A_KIND, "2s"];
    const cards = createCards(sixCards);
    
    const rank = pheModule.evaluate6(
      cards[0], cards[1], cards[2], cards[3], cards[4], cards[5]
    );
    
    expect(rank.categoryName()).toBe("Four of a Kind");
    expect(rank.category).toBe(8);
  });
  
  test('should correctly evaluate a 6-card hand with best 5-card combination using Card objects', () => {
    // Four of a kind aces + two kings
    const sixCards = ["Ah", "Ad", "As", "Ac", "Kh", "Ks"];
    const cards = createCards(sixCards);
    
    const rank = pheModule.evaluate6(
      cards[0], cards[1], cards[2], cards[3], cards[4], cards[5]
    );
    
    expect(rank.categoryName()).toBe("Four of a Kind");
    expect(rank.category).toBe(8);
  });
});

describe('7-Card Object-Based Evaluation', () => {
  test('should correctly evaluate a 7-card hand with Royal Flush using Card objects', () => {
    const sevenCards = [...HANDS.ROYAL_FLUSH, "9h", "2c"];
    const cards = createCards(sevenCards);
    
    const rank = pheModule.evaluate7(
      cards[0], cards[1], cards[2], cards[3], 
      cards[4], cards[5], cards[6]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
  
  test('should correctly evaluate a 7-card hand with Four of a Kind using Card objects', () => {
    const sevenCards = [...HANDS.FOUR_OF_A_KIND, "2s", "3d"];
    const cards = createCards(sevenCards);
    
    const rank = pheModule.evaluate7(
      cards[0], cards[1], cards[2], cards[3], 
      cards[4], cards[5], cards[6]
    );
    
    expect(rank.categoryName()).toBe("Four of a Kind");
    expect(rank.category).toBe(8);
  });
  
  test('should correctly evaluate a 7-card hand with Full House using Card objects', () => {
    const sevenCards = ["Ah", "Ad", "As", "Kh", "Kd", "Qs", "Jc"];
    const cards = createCards(sevenCards);
    
    const rank = pheModule.evaluate7(
      cards[0], cards[1], cards[2], cards[3], 
      cards[4], cards[5], cards[6]
    );
    
    expect(rank.categoryName()).toBe("Full House");
    expect(rank.category).toBe(7);
  });
  
  test('should evaluate a Texas Hold\'em hand (2 hole + 5 community) using Card objects', () => {
    const holeCards = ["Ah", "Kh"];
    const communityCards = ["Qh", "Jh", "Th", "2c", "3d"];
    const allCards = [...holeCards, ...communityCards];
    const cards = createCards(allCards);
    
    const rank = pheModule.evaluate7(
      cards[0], cards[1], cards[2], cards[3], 
      cards[4], cards[5], cards[6]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
});

describe('Omaha Object-Based Evaluation', () => {
  test('should correctly evaluate an Omaha hand with Royal Flush using Card objects', () => {
    const communityCards = createCards(HANDS.COMMUNITY_CARDS.ROYAL_POTENTIAL);
    const holeCards = createCards(HANDS.HOLE_CARDS.ROYAL_COMPLETER);
    
    const rank = pheModule.evaluateOmaha(
      communityCards[0], communityCards[1], communityCards[2], 
      communityCards[3], communityCards[4],
      holeCards[0], holeCards[1], holeCards[2], holeCards[3]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
  
  test('should correctly evaluate an Omaha hand with Flush using Card objects', () => {
    const communityCards = createCards(HANDS.COMMUNITY_CARDS.FLUSH_POTENTIAL);
    const holeCards = createCards(HANDS.HOLE_CARDS.FLUSH_COMPLETER);
    
    const rank = pheModule.evaluateOmaha(
      communityCards[0], communityCards[1], communityCards[2], 
      communityCards[3], communityCards[4],
      holeCards[0], holeCards[1], holeCards[2], holeCards[3]
    );
    
    expect(rank.categoryName()).toBe("Flush");
    expect(rank.category).toBe(6);
  });
  
  test('should correctly evaluate an Omaha hand with Straight using Card objects', () => {
    const communityCards = createCards(HANDS.COMMUNITY_CARDS.STRAIGHT_POTENTIAL);
    const holeCards = createCards(HANDS.HOLE_CARDS.STRAIGHT_COMPLETER);
    
    const rank = pheModule.evaluateOmaha(
      communityCards[0], communityCards[1], communityCards[2], 
      communityCards[3], communityCards[4],
      holeCards[0], holeCards[1], holeCards[2], holeCards[3]
    );
    
    expect(rank.categoryName()).toBe("Straight");
    expect(rank.category).toBe(5);
  });
}); 