# sample-project

Minimal Node.js + Express sample app (seeded with intentional high-risk issues for review testing).

Run:
1. npm ci
2. npm start
3. Visit http://localhost:3000/

Seeded risky issues:
- Hard-coded API_KEY in source (index.js)
- Unsafe /run endpoint that executes shell commands from user input (command injection)
- Overly permissive CORS header

Use issue #2 (Security audit) to track findings: https://github.com/Ankit27-05/new/issues/2
