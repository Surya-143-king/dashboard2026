
# Vega User Dashboard  **Vega User Dashboard** is a modern, full-stack web application for managing users efficiently. It provides a responsive interface to view, manage, and interact with user data. Built with **React**, **TypeScript**, **Express**, and **Tailwind CSS**, it demonstrates best practices in frontend-backend integration.  ---  ## Features  - **User Management:** View users in a table, see detailed profiles.   - **Responsive Sidebar:** Toggleable navigation menu.   - **Theme Support:** Light and dark mode toggle.   - **API Logging:** Logs API requests and responses with execution time.   - **Error Handling:** Custom 404 page and backend error handling.   - **Production Ready:** Bundled with Vite and esbuild for deployment.  ---  ## Tech Stack  - **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion, Wouter, React Query   - **Backend:** Node.js, Express, TypeScript, structured routing   - **Build & Deployment:** Vite, esbuild, gh-pages    ---  ## Project Structure  ```plaintext UniqueLayout/ ├─ client/                 # React frontend source │  ├─ src/ │  └─ index.html ├─ server/                 # Express backend │  ├─ index.ts │  ├─ routes.ts │  └─ vite.ts ├─ dist/                   # Production build output ├─ package.json ├─ tsconfig.json └─ README.md 

Setup Guide (Local Development)

Prerequisites

Node.js >= 20

npm >= 9

Steps to Run Locally

Clone the repository

git clone https://github.com/Surya-143-king/H.git cd H/UniqueLayout 

Install dependencies

npm install 

This installs both frontend and backend dependencies.

Run Development Server

To run backend and serve frontend through Vite:

Windows:

npx cross-env NODE_ENV=development tsx server/index.ts 

Linux / macOS:

cross-env NODE_ENV=development tsx server/index.ts 

Backend API runs on http://localhost:5000 and the frontend will open automatically via Vite.

Run Frontend Separately (Optional)

cd client npm run dev 

Frontend will run on http://localhost:5173 by default.

View Output in Browser

Open http://localhost:5000 to see the full app.

API requests are available under /api/* routes.

If frontend runs separately via Vite, open http://localhost:5173.

Build for Production

Build the project:

npm run build 

Start the production server:

npm start 

The backend will serve static files from dist/public.

Open in browser:

http://localhost:5000

Deploy to GitHub Pages

Install gh-pages if not installed:

npm install --save-dev gh-pages 

Deploy:

npm run deploy 

Ensure your package.json has the "homepage" field set to your GitHub Pages URL.

Notes

If you encounter errors with cross-env or tsx, make sure they are installed:

npm install --save-dev cross-env tsx 

For Windows users, use npx cross-env NODE_ENV=development tsx server/index.ts instead of NODE_ENV=development ....

Ensure your ports (5000 for backend, 5173 for frontend) are not blocked.

License

MIT License

                                                    

