#include <emscripten.h>
#include <emscripten/bind.h>
#include <phevaluator/phevaluator.h>
#include <phevaluator/card.h>
#include <string>
#include <vector>
#include <algorithm>

using namespace emscripten;

// Forward declare the 7-card evaluator from the original library
extern "C" int evaluate_7cards(int a, int b, int c, int d, int e, int f, int g);

// Our own implementation of evaluate_omaha_cards using evaluate_7cards
// This one is simpler than the optimized version in the original library
// but should work for a WASM port
int evaluate_omaha_cards(int c1, int c2, int c3, int c4, int c5, int h1, int h2, int h3, int h4) {
    // Omaha requires using exactly 2 hole cards and 3 community cards
    // We need to find the best 5-card hand from all valid combinations
    
    // Community cards
    std::vector<int> community = {c1, c2, c3, c4, c5};
    
    // Hole cards
    std::vector<int> hole = {h1, h2, h3, h4};
    
    // Store all possible scores
    std::vector<int> scores;
    
    // Generate all 2-card combinations from hole cards (6 combinations)
    for (int i = 0; i < 3; i++) {
        for (int j = i + 1; j < 4; j++) {
            // Generate all 3-card combinations from community cards (10 combinations)
            for (int k = 0; k < 3; k++) {
                for (int l = k + 1; l < 4; l++) {
                    for (int m = l + 1; m < 5; m++) {
                        // Evaluate the 5-card hand
                        int score = evaluate_5cards(
                            hole[i], hole[j], 
                            community[k], community[l], community[m]
                        );
                        scores.push_back(score);
                    }
                }
            }
        }
    }
    
    // Return the best score (lowest value)
    return *std::min_element(scores.begin(), scores.end());
}

// Expose the C evaluate functions to JavaScript
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int evaluate_5cards_wasm(int a, int b, int c, int d, int e) {
        return evaluate_5cards(a, b, c, d, e);
    }

    EMSCRIPTEN_KEEPALIVE
    int evaluate_6cards_wasm(int a, int b, int c, int d, int e, int f) {
        return evaluate_6cards(a, b, c, d, e, f);
    }

    EMSCRIPTEN_KEEPALIVE
    int evaluate_7cards_wasm(int a, int b, int c, int d, int e, int f, int g) {
        return evaluate_7cards(a, b, c, d, e, f, g);
    }

    EMSCRIPTEN_KEEPALIVE
    int evaluate_omaha_cards_wasm(int c1, int c2, int c3, int c4, int c5, int h1, int h2, int h3, int h4) {
        return evaluate_omaha_cards(c1, c2, c3, c4, c5, h1, h2, h3, h4);
    }
}

// Helper function to convert card string notation to card ID
int card_string_to_id(const std::string& card_str) {
    if (card_str.length() != 2) {
        return -1; // Invalid input
    }
    
    char rank_char = card_str[0];
    char suit_char = card_str[1];
    
    int rank;
    if (rank_char == 'A') rank = 12;
    else if (rank_char == 'K') rank = 11;
    else if (rank_char == 'Q') rank = 10;
    else if (rank_char == 'J') rank = 9;
    else if (rank_char == 'T') rank = 8;
    else if (rank_char >= '2' && rank_char <= '9') rank = rank_char - '2';
    else return -1; // Invalid rank
    
    int suit;
    if (suit_char == 'c' || suit_char == 'C') suit = 0;
    else if (suit_char == 'd' || suit_char == 'D') suit = 1;
    else if (suit_char == 'h' || suit_char == 'H') suit = 2;
    else if (suit_char == 's' || suit_char == 'S') suit = 3;
    else return -1; // Invalid suit
    
    return rank * 4 + suit;
}

// Additional JavaScript-friendly functions with string input
int evaluate_hand_from_strings(const std::string& a, const std::string& b, 
                              const std::string& c, const std::string& d, 
                              const std::string& e) {
    int card_a = card_string_to_id(a);
    int card_b = card_string_to_id(b);
    int card_c = card_string_to_id(c);
    int card_d = card_string_to_id(d);
    int card_e = card_string_to_id(e);
    
    if (card_a < 0 || card_b < 0 || card_c < 0 || card_d < 0 || card_e < 0) {
        return -1; // Error in card format
    }
    
    return evaluate_5cards(card_a, card_b, card_c, card_d, card_e);
}

int evaluate_7card_hand_from_strings(const std::string& a, const std::string& b, 
                                   const std::string& c, const std::string& d, 
                                   const std::string& e, const std::string& f,
                                   const std::string& g) {
    int card_a = card_string_to_id(a);
    int card_b = card_string_to_id(b);
    int card_c = card_string_to_id(c);
    int card_d = card_string_to_id(d);
    int card_e = card_string_to_id(e);
    int card_f = card_string_to_id(f);
    int card_g = card_string_to_id(g);
    
    if (card_a < 0 || card_b < 0 || card_c < 0 || card_d < 0 || card_e < 0 || card_f < 0 || card_g < 0) {
        return -1; // Error in card format
    }
    
    return evaluate_7cards(card_a, card_b, card_c, card_d, card_e, card_f, card_g);
}

// Helper function for evaluating Omaha hands with string input
int evaluate_omaha_from_strings(const std::string& c1, const std::string& c2, 
                              const std::string& c3, const std::string& c4, 
                              const std::string& c5, const std::string& h1,
                              const std::string& h2, const std::string& h3,
                              const std::string& h4) {
    int community1 = card_string_to_id(c1);
    int community2 = card_string_to_id(c2);
    int community3 = card_string_to_id(c3);
    int community4 = card_string_to_id(c4);
    int community5 = card_string_to_id(c5);
    int hole1 = card_string_to_id(h1);
    int hole2 = card_string_to_id(h2);
    int hole3 = card_string_to_id(h3);
    int hole4 = card_string_to_id(h4);
    
    if (community1 < 0 || community2 < 0 || community3 < 0 || community4 < 0 || community5 < 0 ||
        hole1 < 0 || hole2 < 0 || hole3 < 0 || hole4 < 0) {
        return -1; // Error in card format
    }
    
    return evaluate_omaha_cards(community1, community2, community3, community4, community5,
                              hole1, hole2, hole3, hole4);
}

// Using Embind to register functions with more convenient JavaScript bindings
EMSCRIPTEN_BINDINGS(phevaluator) {
    function("evaluate5", &evaluate_5cards_wasm);
    function("evaluate6", &evaluate_6cards_wasm);
    function("evaluate7", &evaluate_7cards_wasm);
    function("evaluateOmaha", &evaluate_omaha_cards_wasm);
    
    // String versions
    function("evaluate5FromStrings", &evaluate_hand_from_strings);
    function("evaluate7FromStrings", &evaluate_7card_hand_from_strings);
    function("evaluateOmahaFromStrings", &evaluate_omaha_from_strings);
    
    // Utility function
    function("card_string_to_id", &card_string_to_id);
}

// Entry point
int main() {
    return 0;
} 