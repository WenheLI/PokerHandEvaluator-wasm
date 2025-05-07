const PokerHandEvaluator = require('../dist/phevaluator.js');
const HANDS = require('./test-helpers');

// Setup and teardown
let pheModule;

beforeAll(async () => {
  // Initialize the WASM module once before all tests
  pheModule = await PokerHandEvaluator();
});

describe('5-Card String-Based Evaluation', () => {
  test('should correctly evaluate a Royal Flush', () => {
    const royalFlush = HANDS.ROYAL_FLUSH;
    const rank = pheModule.evaluate5FromStrings(
      royalFlush[0], royalFlush[1], royalFlush[2], royalFlush[3], royalFlush[4]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
    expect(rank.value).toBeLessThan(10); // Royal flush has a very low value
  });

  test('should correctly evaluate a Straight Flush', () => {
    const straightFlush = HANDS.STRAIGHT_FLUSH;
    const rank = pheModule.evaluate5FromStrings(
      straightFlush[0], straightFlush[1], straightFlush[2], straightFlush[3], straightFlush[4]
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
});

describe('6-Card String-Based Evaluation', () => {
  test('should correctly evaluate a 6-card hand with Royal Flush', () => {
    const sixCards = [...HANDS.ROYAL_FLUSH, "9h"];
    const rank = pheModule.evaluate6FromStrings(
      sixCards[0], sixCards[1], sixCards[2], sixCards[3], sixCards[4], sixCards[5]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
  
  test('should correctly evaluate a 6-card hand with Four of a Kind', () => {
    const sixCards = [...HANDS.FOUR_OF_A_KIND, "2s"];
    const rank = pheModule.evaluate6FromStrings(
      sixCards[0], sixCards[1], sixCards[2], sixCards[3], sixCards[4], sixCards[5]
    );
    
    expect(rank.categoryName()).toBe("Four of a Kind");
    expect(rank.category).toBe(8);
  });
  
  test('should correctly evaluate a 6-card hand with best 5-card combination', () => {
    // Four of a kind aces + two kings
    const sixCards = ["Ah", "Ad", "As", "Ac", "Kh", "Ks"];
    const rank = pheModule.evaluate6FromStrings(
      sixCards[0], sixCards[1], sixCards[2], sixCards[3], sixCards[4], sixCards[5]
    );
    
    expect(rank.categoryName()).toBe("Four of a Kind");
    expect(rank.category).toBe(8);
  });
});

describe('7-Card String-Based Evaluation', () => {
  test('should correctly evaluate a 7-card hand with Royal Flush', () => {
    const sevenCards = [...HANDS.ROYAL_FLUSH, "9h", "2c"];
    const rank = pheModule.evaluate7FromStrings(
      sevenCards[0], sevenCards[1], sevenCards[2], sevenCards[3], 
      sevenCards[4], sevenCards[5], sevenCards[6]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
  
  test('should correctly evaluate a 7-card hand with Four of a Kind', () => {
    const sevenCards = [...HANDS.FOUR_OF_A_KIND, "2s", "3d"];
    const rank = pheModule.evaluate7FromStrings(
      sevenCards[0], sevenCards[1], sevenCards[2], sevenCards[3], 
      sevenCards[4], sevenCards[5], sevenCards[6]
    );
    
    expect(rank.categoryName()).toBe("Four of a Kind");
    expect(rank.category).toBe(8);
  });
  
  test('should correctly evaluate a 7-card hand with Full House', () => {
    const sevenCards = ["Ah", "Ad", "As", "Kh", "Kd", "Qs", "Jc"];
    const rank = pheModule.evaluate7FromStrings(
      sevenCards[0], sevenCards[1], sevenCards[2], sevenCards[3], 
      sevenCards[4], sevenCards[5], sevenCards[6]
    );
    
    expect(rank.categoryName()).toBe("Full House");
    expect(rank.category).toBe(7);
  });
  
  test('should evaluate a Texas Hold\'em hand (2 hole + 5 community)', () => {
    const holeCards = ["Ah", "Kh"];
    const communityCards = ["Qh", "Jh", "Th", "2c", "3d"];
    const allCards = [...holeCards, ...communityCards];
    
    const rank = pheModule.evaluate7FromStrings(
      allCards[0], allCards[1], allCards[2], allCards[3], 
      allCards[4], allCards[5], allCards[6]
    );
    
    expect(rank.categoryName()).toBe("Straight Flush");
    expect(rank.category).toBe(9);
  });
});

describe('Omaha String-Based Evaluation', () => {
  test('should correctly evaluate an Omaha hand with Royal Flush', () => {
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
  
  test('should correctly evaluate an Omaha hand with Flush', () => {
    const communityCards = HANDS.COMMUNITY_CARDS.FLUSH_POTENTIAL;
    const holeCards = HANDS.HOLE_CARDS.FLUSH_COMPLETER;
    
    const rank = pheModule.evaluateOmahaFromStrings(
      communityCards[0], communityCards[1], communityCards[2], 
      communityCards[3], communityCards[4],
      holeCards[0], holeCards[1], holeCards[2], holeCards[3]
    );
    
    expect(rank.categoryName()).toBe("Flush");
    expect(rank.category).toBe(6);
  });
  
  test('should correctly evaluate an Omaha hand with Straight', () => {
    const communityCards = HANDS.COMMUNITY_CARDS.STRAIGHT_POTENTIAL;
    const holeCards = HANDS.HOLE_CARDS.STRAIGHT_COMPLETER;
    
    const rank = pheModule.evaluateOmahaFromStrings(
      communityCards[0], communityCards[1], communityCards[2], 
      communityCards[3], communityCards[4],
      holeCards[0], holeCards[1], holeCards[2], holeCards[3]
    );
    
    expect(rank.categoryName()).toBe("Straight");
    expect(rank.category).toBe(5);
  });
}); 