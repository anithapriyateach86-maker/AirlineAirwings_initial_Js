# Airwings UI Port

This build ports the UI (navigation/header, footer, global styles) from `Frontend_without node` into the Airwings app, preserving the Search flow and existing routes.

## What was changed
- Replaced `src/App.css` and `src/index.css` with the UI styles from Frontend.
- Replaced `src/components/Navbar.jsx` with Navigation UI from Frontend (file kept as `Navbar.jsx`).
- Added `src/components/Footer.jsx` and included it in `App.jsx` layout.
- Added `src/components/NotificationCenter.jsx` and `src/components/auth/AuthModal.jsx` as used by the new Navbar.

## How to run
```
npm install
npm run dev
```

If any import complaints appear for Redux slices, ensure `src/store/userSlice.js` and `src/store/notificationSlice.js` exist (they already do in this project).
