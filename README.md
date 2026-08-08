# Malhar

The current cinematic Malhar website. This repository contains only the active
React experience and the small contact-form service it uses.

## Structure

- `frontend/` — React website and verified local assets
- `backend/express/` — contact-form API

## Run locally

```bash
cd frontend
npm ci
npm start
```

For the contact API, configure `MONGO_URL` and run:

```bash
cd backend/express
npm ci
npm start
```

## Production build

```bash
cd frontend
npm run build
```
