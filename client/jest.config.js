module.exports = {
  // The root directory for Jest to search for test files and modules
  rootDir: './src', 
  
  // Directories Jest should look in for modules. 
  // 'node_modules' is the default, but we also include <rootDir> to allow 
  // Jest to look inside the 'src' directory for modules.
  moduleDirectories: ['node_modules', '<rootDir>'],
  
  // Setting the test environment to 'jsdom' which simulates a browser environment for testing
  // This is useful for testing front-end code that relies on DOM manipulation
  testEnvironment: 'jsdom',
};