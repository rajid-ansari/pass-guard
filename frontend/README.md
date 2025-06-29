# PassGuard Frontend

A modern, secure, and user-friendly password manager web application built with React, Vite, and Tailwind CSS. PassGuard allows users to safely store, manage, and generate strong passwords, with all sensitive data encrypted and authenticated via a robust backend API.

## Features

- **User Authentication:** Register, login, and logout securely.
- **Password Vault:** Save, view, update, and delete passwords in your personal encrypted vault.
- **Password Generator:** Easily generate strong, random passwords.
- **Protected Routes:** Dashboard and vault pages are accessible only to authenticated users.
- **Responsive UI:** Clean, modern, and mobile-friendly design using Tailwind CSS.
- **Notifications:** User feedback via React Toastify.
- **Animations:** Smooth UI transitions with GSAP.

## Tech Stack

- **React 19**
- **Vite** (for fast development and build)
- **Tailwind CSS** (utility-first styling)
- **React Router DOM** (routing)
- **Axios** (API requests)
- **React Toastify** (notifications)
- **GSAP** (animations)

## Getting Started

### Prerequisites
- Node.js (v18 or above recommended)
- Backend API (see `/backend` folder)

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/rajid-ansari/passguard.git
   cd passguard/frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Configure environment variables:**
   - Create a `.env` file in the `frontend` folder.
   - Add the following:
     ```env
     VITE_BASE_URI=http://localhost:3000
     ```
   - Adjust the URI if your backend runs elsewhere.

4. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at `http://localhost:5173` by default.

## Project Structure

```
frontend/
  ├── public/           # Static assets (icons, images)
  ├── src/
  │   ├── assets/       # App images
  │   ├── components/   # Reusable React components
  │   ├── contexts/     # React context providers
  │   ├── pages/        # Route pages (Home, Login, Signup, Dashboard, Voult)
  │   ├── utils/        # Utility functions (e.g., password generator)
  │   ├── App.jsx       # Main app component
  │   └── main.jsx      # Entry point
  ├── index.html        # HTML template
  └── ...
```

## Usage

- **Register:** Create a new account.
- **Login:** Access your dashboard and vault.
- **Add Password:** Save new credentials to your vault.
- **View/Update/Delete:** Manage your saved passwords.
- **Generate Password:** Use the built-in generator for strong passwords.
- **Logout:** End your session securely.

## Environment Variables
- `VITE_BASE_URI` – The base URL of your backend API (default: `http://localhost:3000`).


---
For backend API details, see the `/backend/README.md`.
