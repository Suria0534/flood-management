# Deployment

## Local run

1. Start MongoDB, or use a MongoDB Atlas connection string.
2. In `backend`, copy `.env.example` to `.env` and fill in the values.
3. Run `npm install` and `npm start` in `backend`.
4. In `frontend/fms`, run `npm install` and `npm run dev`.

The backend health check is available at `http://localhost:5000/health`.

## Deploy the backend

Use Render, Railway, or another Node.js host with `backend` as the service root.

- Build command: `npm install`
- Start command: `npm start`
- `MONGO_URI`: MongoDB Atlas connection string
- `JWT_SECRET`: a new long random secret
- `FRONTEND_URL`: the deployed frontend URL
- `OPENWEATHER_KEY`: OpenWeather API key

Do not commit `.env`. The `uploads` directory must use persistent storage if uploaded files need to survive redeploys.

## Deploy the frontend

Use Vercel, Netlify, or another static host with `frontend/fms` as the project root.

- Build command: `npm run build`
- Output directory: `dist`
- Environment variable: `VITE_API_URL=https://your-backend-domain.example`

The Vite build replaces the old local API address with `VITE_API_URL`, so deployed requests go to the deployed backend. Configure SPA fallback to `index.html` so React routes such as `/login` work after refresh.
