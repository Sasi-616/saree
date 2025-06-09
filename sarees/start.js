const { execSync } = require('child_process');
const path = require('path');

try {
  // Run the build script
  console.log('Building the application...');
  require('./build');

  // Start the server
  console.log('Starting the server...');
  require('./server');

  // Open the browser
  const url = 'http://localhost:3000';
  const start = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start' : 'xdg-open';
  execSync(`${start} ${url}`);

} catch (error) {
  console.error('Error starting the application:', error);
  process.exit(1);
} 