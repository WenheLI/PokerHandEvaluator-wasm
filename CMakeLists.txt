cmake_minimum_required(VERSION 3.13)
project(PokerHandEvaluator-wasm)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Include Emscripten tools
include(${CMAKE_ROOT}/Modules/FetchContent.cmake)

# Source files from original project needed for the WASM port
set(SOURCES
    PokerHandEvaluator/cpp/src/hashtable5.c
    PokerHandEvaluator/cpp/src/hashtable6.c
    PokerHandEvaluator/cpp/src/hashtable7.c
    PokerHandEvaluator/cpp/src/rank.c
    PokerHandEvaluator/cpp/src/tables_bitwise.c
    PokerHandEvaluator/cpp/src/7462.c
    PokerHandEvaluator/cpp/src/dptables.c
    PokerHandEvaluator/cpp/src/evaluator5.c
    PokerHandEvaluator/cpp/src/evaluator6.c
    PokerHandEvaluator/cpp/src/evaluator7.c
    PokerHandEvaluator/cpp/src/hash.c
    PokerHandEvaluator/cpp/src/hashtable.c
    src/phevaluator_wasm.cpp
)

# Include directories
include_directories(
    PokerHandEvaluator/cpp/include
    src/include
)

# Emscripten options
set(EMSCRIPTEN_LINK_FLAGS
    "-s WASM=1 \
     -s EXPORTED_RUNTIME_METHODS=['ccall','cwrap'] \
     -s ALLOW_MEMORY_GROWTH=1 \
     -s MODULARIZE=1 \
     -s EXPORT_NAME=PokerHandEvaluator \
     -s NO_EXIT_RUNTIME=1 \
     -lembind \
     -O3"
)

# Create the library
add_executable(phevaluator ${SOURCES})
set_target_properties(phevaluator PROPERTIES OUTPUT_NAME "phevaluator")
set_target_properties(phevaluator PROPERTIES SUFFIX ".js")
set_target_properties(phevaluator PROPERTIES LINK_FLAGS ${EMSCRIPTEN_LINK_FLAGS}) 