const fs = require('fs');

const serverExists = fs.existsSync('dist/server.js')
const bundleExists = fs.existsSync('dist/index.html')

if (!(serverExists && bundleExists)) {
  console.error("Error: 'npm run build' must be executed first")
  process.exit(1);
}