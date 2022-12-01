/**
 * An express app to serve the webpack-bundled React application alone.
 */

import path from "path";
import express from "express";

const PORT = 3000;

const app = express();

app.use(express.static(__dirname));

app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Serving application bundle on port ${PORT}.`)
});