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
    console.log("PokerHandEvaluator WASM module loaded!");
    
    // Example 1: Evaluate a 5-card hand using card IDs
    // Card IDs: rank * 4 + suit (0:clubs, 1:diamonds, 2:hearts, 3:spades)
    // Ah, Kh, Qh, Jh, Th (Royal flush in hearts)
    const hand1 = [50, 46, 42, 38, 34];
    const score1 = module.evaluate5(hand1[0], hand1[1], hand1[2], hand1[3], hand1[4]);
    console.log(`Example 1 - Royal Flush: ${getHandName(score1)} (Score: ${score1})`);
    
    // Example 2: Evaluate using string notation
    const hand2 = ["As", "Ks", "Qs", "Js", "Ts"];
    const score2 = module.evaluate5FromStrings(hand2[0], hand2[1], hand2[2], hand2[3], hand2[4]);
    console.log(`Example 2 - Royal Flush (string notation): ${getHandName(score2)} (Score: ${score2})`);
    
    // Example 3: Evaluate a 7-card hand (Texas Hold'em)
    // Ah, Kh, Qh, Jh, Th, 9h, 8h
    const hand3 = ["Ah", "Kh", "Qh", "Jh", "Th", "9h", "8h"];
    const score3 = module.evaluate7FromStrings(
        hand3[0], hand3[1], hand3[2], hand3[3], hand3[4], hand3[5], hand3[6]
    );
    console.log(`Example 3 - 7-card Straight Flush: ${getHandName(score3)} (Score: ${score3})`);
    
    // Example 4: Evaluate two Hold'em hands to determine the winner
    const hand4a = ["Ah", "Kd", "Qs", "Jc", "Th", "9d", "8s"]; // Straight
    const hand4b = ["As", "Ad", "Ac", "Kh", "Qd", "2s", "3h"]; // Three of a kind
    
    const score4a = module.evaluate7FromStrings(
        hand4a[0], hand4a[1], hand4a[2], hand4a[3], hand4a[4], hand4a[5], hand4a[6]
    );
    const score4b = module.evaluate7FromStrings(
        hand4b[0], hand4b[1], hand4b[2], hand4b[3], hand4b[4], hand4b[5], hand4b[6]
    );
    
    console.log(`Hand 4A - ${getHandName(score4a)} (Score: ${score4a})`);
    console.log(`Hand 4B - ${getHandName(score4b)} (Score: ${score4b})`);
    
    // Lower score is better
    if (score4a < score4b) {
        console.log("Hand 4A wins!");
    } else if (score4b < score4a) {
        console.log("Hand 4B wins!");
    } else {
        console.log("It's a tie!");
    }
    
    // Example 5: Evaluate an Omaha hand using the string version
    // Community cards: Ah, Kh, Qh, Jh, Th
    // Hole cards: 9h, 8h, 7h, 6h
    const communityCards = ["Ah", "Kh", "Qh", "Jh", "Th"];
    const holeCards = ["9h", "8h", "7h", "6h"];
    
    const score5 = module.evaluateOmahaFromStrings(
        communityCards[0], communityCards[1], communityCards[2], 
        communityCards[3], communityCards[4],
        holeCards[0], holeCards[1], holeCards[2], holeCards[3]
    );
    
    console.log(`Example 5 - Omaha Hand: ${getHandName(score5)} (Score: ${score5})`);
    
    // Example 6: Using the utility function directly
    console.log("Card ID for 'Ah':", module.card_string_to_id("Ah"));
    console.log("Card ID for '2c':", module.card_string_to_id("2c"));
    console.log("Card ID for 'Td':", module.card_string_to_id("Td"));
    
}).catch(error => {
    console.error("Error loading WASM module:", error);
}); 