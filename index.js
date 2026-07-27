const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;

// INTENTIONAL HIGH-RISK ISSUE #1: hard-coded secret in source
const API_KEY = 'SUPER_SECRET_API_KEY_SHOULD_NOT_BE_HARDCODED';

app.get('/', (req, res) => {
  res.send('Hello world');
};

// INTENTIONAL HIGH-RISK ISSUE #2: command injection / remote code execution
// This endpoint unsafely executes arbitrary shell commands from a query parameter.
app.get('/run', (req, res) => {
  const cmd = req.query.cmd || '';
  if (!cmd) {
    return res.status(400).send('Provide ?cmd=');
  }

  // Danger: executing user input without sanitization
  exec(cmd, { timeout: 5000 }, (err, stdout, stderr) => {
    if (err) {
      return res.status(500).send(`Error: ${String(err)}`);
    }
    res.type('text/plain').send(stdout || stderr || 'OK');
  });
});

// Optional insecure header to make it easier for reviewers to spot missing security
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*'); // overly permissive CORS
  next();
});

app.listen(port, () => {
  console.log(`sample-project listening on ${port}`);
});
