# Project Summary: JMS Backend

## Architecture Overview
- **Type**: Node.js Backend API
- **Framework**: Express.js
- **Database**: PostgreSQL (via `pg` client)
- **Authentication**: JWT (`jsonwebtoken`) and password hashing (`bcryptjs`)
- **Key Integrations**: 
  - Google Generative AI (`@google/generative-ai`)
  - File Uploads (`multer`)
  - Excel/Spreadsheet Parsing (`xlsx`)

## Directory Structure
- `server.js`: Main application entry point
- `routes/`: Express route definitions
- `middleware/`: Custom Express middlewares (e.g., auth, error handling)
- `services/`: Business logic and external service integrations
- `scripts/`: Utility scripts (e.g., deployments, backup, migrations)
- `migrations/`: Database schema migrations

## Core Rules and Guidelines
1. **Performance**: Ensure slow queries are optimized. Use indexes in PostgreSQL where needed.
2. **Security**: Maintain JWT validation on protected routes. Avoid exposing sensitive `.env` keys.
3. **Context Limitation**: When assisting, the agent should only scan/open files explicitly needed for the task to conserve tokens and reduce latency.
4. **Precision over Speed**: For complex requests, prioritize complete and comprehensive coverage ("Perfect Coverage") over speed. Avoid skipping steps.

## Developer Notes
- Ensure `.env` is properly populated across environments (development, Docker, production).
- Use `npm start` (which runs `node server.js`) to boot the application.
