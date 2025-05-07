const PokerHandEvaluator = require('./phevaluator.js');

// Function to get hand name from score
function getHandName(score) {
    if (score <= 1) return "Royal Flush";
    if (score <= 10) return "Straight Flush";
    if (score <= 166) return "Four of a Kind";
    if (score <= 322) return "Full House";
    if (score <= 1599) return "Flush";
    if (score <= 1609) return "Straight";
    if (score <= 2467) return "Three of a Kind";
    if (score <= 3325) return "Two Pair";
    if (score <= 6185) return "One Pair";
    return "High Card";
}

// Initialize the WASM module
PokerHandEvaluator().then(module => {
    console.log("===== PokerHandEvaluator WASM Tests =====");
    
    // Test 1: Royal Flush
    const royalFlush = ["Ah", "Kh", "Qh", "Jh", "Th"];
    const score1 = module.evaluate5FromStrings(
        royalFlush[0], royalFlush[1], royalFlush[2], royalFlush[3], royalFlush[4]
    );
    console.log(`Royal Flush: ${getHandName(score1)} (Score: ${score1})`);
    
    // Test 2: Four of a Kind
    const fourOfAKind = ["As", "Ac", "Ad", "Ah", "Kh"];
    const score2 = module.evaluate5FromStrings(
        fourOfAKind[0], fourOfAKind[1], fourOfAKind[2], fourOfAKind[3], fourOfAKind[4]
    );
    console.log(`Four of a Kind: ${getHandName(score2)} (Score: ${score2})`);
    
    // Test 3: 7-card evaluation
    const sevenCards = ["Ah", "Kh", "Qh", "Jh", "Th", "9h", "2c"];
    const score3 = module.evaluate7FromStrings(
        sevenCards[0], sevenCards[1], sevenCards[2], sevenCards[3], 
        sevenCards[4], sevenCards[5], sevenCards[6]
    );
    console.log(`7-card Royal Flush: ${getHandName(score3)} (Score: ${score3})`);
    
    // Test 4: Omaha evaluation
    // Community cards: Ah, Kh, Qh, Jh, 2c
    // Hole cards: Th, 9h, 3d, 4s
    const communityCards = ["Ah", "Kh", "Qh", "Jh", "2c"];
    const holeCards = ["Th", "9h", "3d", "4s"];
    
    const score4 = module.evaluateOmahaFromStrings(
        communityCards[0], communityCards[1], communityCards[2], 
        communityCards[3], communityCards[4],
        holeCards[0], holeCards[1], holeCards[2], holeCards[3]
    );
    
    console.log(`Omaha Hand: ${getHandName(score4)} (Score: ${score4})`);
    
    // Test utilities
    console.log("\n===== Card ID Utilities =====");
    console.log("Card ID for 'Ah':", module.card_string_to_id("Ah"));
    console.log("Card ID for '2c':", module.card_string_to_id("2c"));
    console.log("Card ID for 'Td':", module.card_string_to_id("Td"));
    
    console.log("\nAll tests completed successfully!");
    
}).catch(error => {
    console.error("Error running tests:", error);
}); 