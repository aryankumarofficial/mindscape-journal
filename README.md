# Mindscape Journal – AI-Assisted Journaling System

## Overview

Mindscape Journal is an AI-assisted journaling platform designed to help users reflect on their experiences during immersive nature sessions (forest, ocean, mountain). Users can record journal entries, analyze emotions using an LLM, and receive insights about their emotional patterns over time.

The system integrates a backend API, LLM-based emotion analysis, and a minimal frontend interface to demonstrate end-to-end functionality.

---

## Features

### Journal Management

- Create journal entries
- Retrieve previous journal entries
- Store entries with ambience context

### LLM Emotion Analysis

- Analyze journal text using an LLM
- Extract:
  - Primary emotion
  - Keywords
  - Short emotional summary

- Store analysis results to avoid repeated LLM calls

### Insights Generation

Provides aggregated insights such as:

- Total journal entries
- Most frequent emotion
- Most used ambience
- Recently detected emotional keywords

### Minimal Frontend

Users can:

- Write journal entries
- View previous entries
- Analyze journal emotion
- View insights

---

## Tech Stack

### Backend

- Node.js
- Express.js
- Drizzle ORM
- PostgreSQL

### Frontend

- React / Next.js (minimal UI)

### LLM Integration

- Groq API (LLM inference)
- Model examples:
  - `llama-3.3-70b-versatile`
  - `openai/gpt-oss-120b`

### Other Tools

- Bun (package manager)
- TypeScript
- Zod validation
- Docker (optional)

---

## API Endpoints

### Create Journal Entry

```
POST /api/journal
```

Example request:

```json
{
  "ambience": "forest",
  "text": "I felt calm today after listening to the rain."
}
```

---

### Get User Entries

```
GET /api/journal/:userId
```

Returns all journal entries for the user.

---

### Analyze Emotion

```
POST /api/journal/analyze
```

Example request:

```json
{
  "journalId": "journal_id_here"
}
```

Response:

```json
{
  "emotion": "calm",
  "keywords": ["rain", "nature", "peace"],
  "summary": "User experienced relaxation during the forest session"
}
```

---

### Insights API

```
GET /api/journal/insights/:userId
```

Example response:

```json
{
  "totalEntries": 8,
  "topEmotion": "calm",
  "mostUsedAmbience": "forest",
  "recentKeywords": ["focus", "nature", "rain"]
}
```

---

## Database Schema

Main tables:

- `users`
- `journal_entries`
- `journal_analysis`

The `journal_analysis` table stores the results of LLM emotion analysis to avoid repeated LLM calls and support fast insights queries.

---

## Running the Project

### 1 Install dependencies

```
bun install
```

### 2 Setup environment variables

```
DATABASE_URL=
GROQ_API_KEY=
JWT_SECRET=
```

### 3 Run database migrations

```
bun drizzle-kit push
```

### 4 Start the server

```
bun run dev:api
```

Server runs at:

```
http://localhost:5000
```

### 5. Run the Frontend

```
bun run dev:web
```

Frontend runs at:

```
http://localhost:3000
```

---

## Folder Structure

```
src
 ├ controllers
 ├ services
 ├ repositories
 ├ middlewares
 ├ validators
 ├ utils
 ├ routes
 └ types
```

The architecture follows a layered structure:

```
Controller → Service → Repository → Database
```

---

## Future Improvements

- Streaming LLM responses
- Emotion trend visualization
- Background analysis jobs
- Rate limiting
- Redis caching
- Advanced mental health insights

---

## Author

Aryan Kumar
