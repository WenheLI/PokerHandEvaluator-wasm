module.exports = {
  // Indicate the environments where code will run
  testEnvironment: 'node',
  
  // Test file patterns
  testMatch: ['**/__tests__/**/*.test.js'],
  
  // Allow time for WASM to compile and load
  testTimeout: 30000,
  
  // Configure transformations
  transform: {},
  
  // Module file extensions
  moduleFileExtensions: ['js', 'wasm'],
  
  // Test coverage configuration
  collectCoverage: false,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  coveragePathIgnorePatterns: ['/node_modules/'],
  
  // Consider adding custom reporters as needed
  reporters: ['default'],
}; 