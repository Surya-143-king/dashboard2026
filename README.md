# Vega User Dashboard

**Vega User Dashboard** is a modern, full-stack web application for managing users efficiently. It provides a responsive interface to view, manage, and interact with user data. Built with **React**, **TypeScript**, **Express**, and **Tailwind CSS**, it demonstrates best practices in frontend-backend integration.

---

## Features

- **User Management:** View users in a table, see detailed profiles.  
- **Responsive Sidebar:** Toggleable navigation menu.  
- **Theme Support:** Light and dark mode toggle.  
- **API Logging:** Logs API requests and responses with execution time.  
- **Error Handling:** Custom 404 page and backend error handling.  
- **Production Ready:** Bundled with Vite and esbuild for deployment.

---

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS, Framer Motion, Wouter, React Query  
- **Backend:** Node.js, Express, TypeScript, structured routing  
- **Build & Deployment:** Vite, esbuild, gh-pages  

---

## Project Structure

```plaintext
UniqueLayout/
├─ client/                 # React frontend source
│  ├─ src/
│  └─ index.html
├─ server/                 # Express backend
│  ├─ index.ts
│  ├─ routes.ts
│  └─ vite.ts
├─ dist/                   # Production build output
├─ package.json
├─ tsconfig.json
└─ README.md
