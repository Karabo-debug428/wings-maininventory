# Wings Café Inventory — Assignment Starter

This project scaffolds your Web Application Development assignment:
React + CSS (frontend), Node/Express (backend), JSON file as the "database".

## Quick Start
1) Install Node.js LTS.
2) In one terminal:
```
cd backend
npm install
npm run dev
```
Backend runs at http://localhost:4000 and stores data in `src/db/db.json`.

3) In another terminal:
```
cd frontend
npm install
npm run dev
```
Open the URL Vite prints (usually http://localhost:5173).

## Tech
- Frontend: React + Vite + CSS
- Backend: Express + CORS
- Database: JSON (`backend/src/db/db.json`)

## Features included
- Product CRUD (name, description, category, price, quantity)
- Stock transactions (add/remove), with validation (no negative stock)
- Low-stock alert endpoint + dashboard tile
- Customers minimal CRUD
- Sales create (records sale and adjusts stock)
- Reports: low stock, simple sales summary

## Deploy
- Push to GitHub (root contains both backend and frontend).
- Host Frontend on Netlify/Vercel; host Backend on Render/Glitch/Railway.
- Update `frontend/src/api/client.js` BASE_URL to your deployed backend URL.

Good luck!
n