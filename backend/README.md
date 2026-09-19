# DEVATLAS 2.0 — Backend API

> Express + TypeScript backend powering the DEVATLAS unified developer profile platform.

---

## Architecture

```
backend/
├── src/
│   ├── server.ts           # Entry point — starts Express, graceful shutdown
│   ├── app.ts              # Express config, middleware stack, route mounting
│   ├── config/
│   │   ├── env.ts          # Environment validation & typed config object
│   │   └── cors.ts         # CORS configuration (origin, credentials, methods)
│   ├── routes/             # Route definitions — thin, delegate to controllers
│   ├── controllers/        # Request/response logic — calls services
│   ├── services/           # Business logic & external API integration
│   │   ├── auth.service.ts     # GitHub OAuth flow
│   │   ├── github.service.ts   # GitHub REST API v3
│   │   ├── leetcode.service.ts # LeetCode GraphQL API
│   │   ├── codeforces.service.ts# Codeforces REST API v1
│   │   └── score.service.ts    # DevScore calculation engine
│   ├── middleware/
│   │   ├── auth.middleware.ts  # requireAuth guard
│   │   ├── error.middleware.ts # Centralized error handler
│   │   └── notFound.middleware.ts # 404 handler
│   └── utils/
│       ├── apiResponse.ts  # Standardized response helpers & AppError
│       └── asyncHandler.ts # Wraps async handlers, forwards errors to Express
├── .env.example            # Template — copy to .env and fill in values
├── package.json
└── tsconfig.json
```

---

## Setup

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment

```bash
cp .env.example .env
# Edit .env with your values
```

### 3. Set up GitHub OAuth App

1. Go to https://github.com/settings/developers → OAuth Apps → **New OAuth App**
2. Set:
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:5000/api/auth/callback`
3. Copy the **Client ID** and **Client Secret** into `backend/.env`

### 4. Start the server

```bash
# Development (hot reload)
npm run dev

# Production
npm run build && npm start
```

Server starts at **http://localhost:5000**

---

## API Endpoints

| Method | Endpoint | Auth | Purpose |
|--------|----------|------|---------|
| GET | `/api/health` | No | Health check |
| GET | `/api/auth/github` | No | Initiate GitHub OAuth |
| GET | `/api/auth/callback` | No | GitHub OAuth callback |
| GET | `/api/auth/session` | No | Current session state |
| POST | `/api/auth/logout` | Yes | Logout / destroy session |
| GET | `/api/github/profile` | Yes | GitHub profile (authenticated user) |
| GET | `/api/github/stats` | Yes | GitHub stats (repos, commits, languages) |
| GET | `/api/leetcode/profile?username=` | No | LeetCode profile by username |
| GET | `/api/codeforces/profile?handle=` | No | Codeforces profile by handle |
| GET | `/api/profile/:username` | No | Unified public developer profile |
| GET | `/api/score/:username` | No | DevScore computation |

### Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": {
    "code": "SOME_ERROR_CODE",
    "message": "Human readable message"
  }
}
```

### Health Check

```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "success": true,
  "data": {
    "message": "DEVATLAS API is running",
    "environment": "development",
    "timestamp": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Authentication Flow

```
[User clicks "Continue with GitHub"]
         ↓
[Frontend → GET /api/auth/github]
         ↓
[Backend redirects to GitHub OAuth consent page]
         ↓
[GitHub → GET /api/auth/callback?code=...]
         ↓
[Backend exchanges code ↔ access token (server-side, secret protected)]
         ↓
[Backend creates HTTP-only session cookie]
         ↓
[Backend redirects to frontend: /?auth=success&user=username]
         ↓
[Frontend fetches GET /api/auth/session to read authenticated state]
         ↓
[Protected requests include session cookie automatically]
```

**Security:** The GitHub access token is stored only in the server-side session. It is **never** included in any API response or accessible from browser JavaScript.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | No | `development` or `production` |
| `PORT` | No | Server port (default: `5000`) |
| `FRONTEND_URL` | No | Frontend origin for CORS (default: `http://localhost:3000`) |
| `BACKEND_URL` | No | This server's URL (default: `http://localhost:5000`) |
| `GITHUB_CLIENT_ID` | Prod only | GitHub OAuth App Client ID |
| `GITHUB_CLIENT_SECRET` | Prod only | GitHub OAuth App Client Secret |
| `GITHUB_CALLBACK_URL` | No | OAuth callback URL |
| `SESSION_SECRET` | Prod only | Strong random string for session signing |

---

## Frontend Integration

The frontend communicates with the backend via `src/lib/api.ts`.

Configure the backend URL in the **root** `.env.local`:
```env
VITE_API_URL=http://localhost:5000
```

All frontend API calls use `credentials: 'include'` so session cookies are sent automatically.

---

## Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `BAD_REQUEST` | 400 | Invalid or missing request parameters |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Access denied |
| `NOT_FOUND` | 404 | Resource or route not found |
| `VALIDATION_ERROR` | 422 | Input validation failed |
| `GITHUB_API_ERROR` | 502 | GitHub API failure |
| `LEETCODE_API_ERROR` | 502 | LeetCode API failure |
| `CODEFORCES_API_ERROR` | 502 | Codeforces API failure |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |
