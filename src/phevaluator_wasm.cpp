#include <emscripten.h>
#include <emscripten/bind.h>
#include <phevaluator/phevaluator.h>
#include <phevaluator/card.h>
#include <phevaluator/rank.h>
#include <string>
#include <vector>
#include <algorithm>

using namespace emscripten;
using namespace phevaluator;

// Helper class to represent a hand rank in JavaScript
class HandRank {
public:
    HandRank(const Rank& rank) : value_(rank.value()) {
        // Map the rank value to the correct category 
        category_ = mapValueToCategory(value_);
    }
    
    // Default constructor for invalid hands
    HandRank() : value_(-1), category_(-1) {}
    
    int value() const { return value_; }
    int category() const { return category_; }
    
    // String representation of the hand category
    std::string categoryName() const {
        switch (category_) {
            case 9: return "Straight Flush";
            case 8: return "Four of a Kind";
            case 7: return "Full House";
            case 6: return "Flush";
            case 5: return "Straight";
            case 4: return "Three of a Kind";
            case 3: return "Two Pair";
            case 2: return "One Pair";
            case 1: return "High Card";
            default: return "Invalid Hand";
        }
    }
    
    // String representation of the hand for toString in JavaScript
    std::string toString() const {
        if (value_ == -1) {
            return "Invalid Hand";
        }
        return categoryName() + " (Score: " + std::to_string(value_) + ")";
    }
    
private:
    // Convert the numeric rank value to the correct category (1-9)
    int mapValueToCategory(int value) const {
        // Straight Flush (including Royal Flush)
        if (value <= 10) return 9;
        // Four of a Kind
        if (value <= 166) return 8;
        // Full House
        if (value <= 322) return 7;
        // Flush
        if (value <= 1599) return 6;
        // Straight
        if (value <= 1609) return 5;
        // Three of a Kind
        if (value <= 2467) return 4;
        // Two Pair
        if (value <= 3325) return 3;
        // One Pair
        if (value <= 6185) return 2;
        // High Card
        return 1;
    }

    int value_;
    int category_;
};

HandRank evaluateOmahaCards(const Card& c1, const Card& c2, const Card& c3, 
                         const Card& c4, const Card& c5, 
                         const Card& h1, const Card& h2, 
                         const Card& h3, const Card& h4) {
    // Community cards
    std::vector<Card> community = {c1, c2, c3, c4, c5};
    
    // Hole cards
    std::vector<Card> hole = {h1, h2, h3, h4};
    
    // Store all possible scores
    std::vector<Rank> ranks;
    
    // Generate all 2-card combinations from hole cards (6 combinations)
    for (int i = 0; i < 3; i++) {
        for (int j = i + 1; j < 4; j++) {
            // Generate all 3-card combinations from community cards (10 combinations)
            for (int k = 0; k < 3; k++) {
                for (int l = k + 1; l < 4; l++) {
                    for (int m = l + 1; m < 5; m++) {
                        // Evaluate the 5-card hand
                        Rank rank = EvaluateCards(
                            hole[i], hole[j], 
                            community[k], community[l], community[m]
                        );
                        ranks.push_back(rank);
                    }
                }
            }
        }
    }
    
    // Find the best rank (lowest value)
    auto bestRank = std::min_element(ranks.begin(), ranks.end(), 
                                   [](const Rank& a, const Rank& b) {
                                       return a.value() < b.value();
                                   });
    
    return HandRank(*bestRank);
}

// Factory functions for creating Cards
Card createCardFromId(int id) {
    return Card(id);
}

bool isValidCard(const std::string& card_str) {
    if (card_str.length() != 2) {
        return false;
    }
    bool is_valid_suit = suitMap.find(card_str[1]) != suitMap.end();
    bool is_valid_rank = rankMap.find(card_str[0]) != rankMap.end();
    return is_valid_suit && is_valid_rank;
}

Card createCardFromString(const std::string& card_str) {
    if (!isValidCard(card_str)) {
        return Card(-1); // Invalid card
    }
    return Card(card_str);
}

int cardStringToId(const std::string& card_str) {
    Card card = createCardFromString(card_str);
    return static_cast<int>(card);
}

HandRank evaluate5CardHandFromStrings(const std::string& a, const std::string& b, 
                                   const std::string& c, const std::string& d, 
                                   const std::string& e) {
    Card card_a = createCardFromString(a);
    Card card_b = createCardFromString(b);
    Card card_c = createCardFromString(c);
    Card card_d = createCardFromString(d);
    Card card_e = createCardFromString(e);

    if (static_cast<int>(card_a) < 0 || static_cast<int>(card_b) < 0 || 
        static_cast<int>(card_c) < 0 || static_cast<int>(card_d) < 0 || 
        static_cast<int>(card_e) < 0) {
        return HandRank(); // Error in card format
    }
    
    Rank rank = EvaluateCards(card_a, card_b, card_c, card_d, card_e);
    return HandRank(rank);
}

HandRank evaluate6CardHandFromStrings(const std::string& a, const std::string& b, 
                                   const std::string& c, const std::string& d, 
                                   const std::string& e, const std::string& f) {
    Card card_a = createCardFromString(a);
    Card card_b = createCardFromString(b);
    Card card_c = createCardFromString(c);
    Card card_d = createCardFromString(d);
    Card card_e = createCardFromString(e);
    Card card_f = createCardFromString(f);
    
    if (static_cast<int>(card_a) < 0 || static_cast<int>(card_b) < 0 || 
        static_cast<int>(card_c) < 0 || static_cast<int>(card_d) < 0 || 
        static_cast<int>(card_e) < 0 || static_cast<int>(card_f) < 0) {
        return HandRank(); // Error in card format
    }
    
    Rank rank = EvaluateCards(card_a, card_b, card_c, card_d, card_e, card_f);
    return HandRank(rank);
}

HandRank evaluate7CardHandFromStrings(const std::string& a, const std::string& b, 
                                   const std::string& c, const std::string& d, 
                                   const std::string& e, const std::string& f,
                                   const std::string& g) {
    Card card_a = createCardFromString(a);
    Card card_b = createCardFromString(b);
    Card card_c = createCardFromString(c);
    Card card_d = createCardFromString(d);
    Card card_e = createCardFromString(e);
    Card card_f = createCardFromString(f);
    Card card_g = createCardFromString(g);
    
    if (static_cast<int>(card_a) < 0 || static_cast<int>(card_b) < 0 || 
        static_cast<int>(card_c) < 0 || static_cast<int>(card_d) < 0 || 
        static_cast<int>(card_e) < 0 || static_cast<int>(card_f) < 0 || 
        static_cast<int>(card_g) < 0) {
        return HandRank(); // Error in card format
    }
    
    Rank rank = EvaluateCards(card_a, card_b, card_c, card_d, card_e, card_f, card_g);
    return HandRank(rank);
}

// Helper function for evaluating Omaha hands with string input
HandRank evaluateOmahaFromStrings(const std::string& c1, const std::string& c2, 
                               const std::string& c3, const std::string& c4, 
                               const std::string& c5, const std::string& h1,
                               const std::string& h2, const std::string& h3,
                               const std::string& h4) {
    Card community1 = createCardFromString(c1);
    Card community2 = createCardFromString(c2);
    Card community3 = createCardFromString(c3);
    Card community4 = createCardFromString(c4);
    Card community5 = createCardFromString(c5);
    Card hole1 = createCardFromString(h1);
    Card hole2 = createCardFromString(h2);
    Card hole3 = createCardFromString(h3);
    Card hole4 = createCardFromString(h4);
    
    if (static_cast<int>(community1) < 0 || static_cast<int>(community2) < 0 || 
        static_cast<int>(community3) < 0 || static_cast<int>(community4) < 0 || 
        static_cast<int>(community5) < 0 || static_cast<int>(hole1) < 0 || 
        static_cast<int>(hole2) < 0 || static_cast<int>(hole3) < 0 || 
        static_cast<int>(hole4) < 0) {
        return HandRank(); // Error in card format
    }
    
    return evaluateOmahaCards(community1, community2, community3, community4, community5,
                           hole1, hole2, hole3, hole4);
}

// Using Embind to register the HandRank class and functions with JavaScript
EMSCRIPTEN_BINDINGS(phevaluator) {
    class_<HandRank>("HandRank")
        .constructor<>()
        .property("value", &HandRank::value)
        .property("category", &HandRank::category)
        .function("categoryName", &HandRank::categoryName)
        .function("toString", &HandRank::toString);
    
    class_<Card>("Card")
        .constructor<int>()
        .function("describeCard", &Card::describeCard)
        .function("describeRank", &Card::describeRank)
        .function("describeSuit", &Card::describeSuit)
        .function("id", optional_override([](const Card& card) {
            return static_cast<int>(card);
        }))
        .function("toString", optional_override([](const Card& card) {
            return card.describeCard();
        }));
    
    function("createCardFromId", &createCardFromId);
    function("createCardFromString", &createCardFromString);
    
    function("evaluate5", optional_override([](const Card& a, const Card& b, const Card& c, 
                                           const Card& d, const Card& e) {
        Rank rank = EvaluateCards(a, b, c, d, e);
        return HandRank(rank);
    }));
    
    function("evaluate6", optional_override([](const Card& a, const Card& b, const Card& c, 
                                           const Card& d, const Card& e, const Card& f) {
        Rank rank = EvaluateCards(a, b, c, d, e, f);
        return HandRank(rank);
    }));
    
    function("evaluate7", optional_override([](const Card& a, const Card& b, const Card& c, 
                                           const Card& d, const Card& e, const Card& f, 
                                           const Card& g) {
        Rank rank = EvaluateCards(a, b, c, d, e, f, g);
        return HandRank(rank);
    }));
    
    function("evaluateOmaha", optional_override([](const Card& c1, const Card& c2, const Card& c3, 
                                               const Card& c4, const Card& c5, 
                                               const Card& h1, const Card& h2, 
                                               const Card& h3, const Card& h4) {
        return evaluateOmahaCards(c1, c2, c3, c4, c5, h1, h2, h3, h4);
    }));
    
    // String versions
    function("evaluate5FromStrings", &evaluate5CardHandFromStrings);
    function("evaluate6FromStrings", &evaluate6CardHandFromStrings);
    function("evaluate7FromStrings", &evaluate7CardHandFromStrings);
    function("evaluateOmahaFromStrings", &evaluateOmahaFromStrings);
    
    // Utility functions
    function("createCard", &createCardFromString);
    function("cardStringToId", &cardStringToId);
}
