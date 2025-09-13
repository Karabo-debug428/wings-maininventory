Wings Café Inventory

Overview:
Wings Café Inventory is a full-stack web application designed for café inventory management. The project demonstrates a modern architecture using React and CSS for the frontend, Node.js with Express for the backend, and a JSON file that serves as a simple database. It manages products, stock transactions, customers, and sales, while providing essential reports and low-stock alerts.

Frontend:
The frontend was built with React and Vite, styled using CSS. It offered a clean and interactive interface for managing products, customers, and sales.

Backend:
The backend was powered by Node.js and Express, with CORS enabled to allow communication with the frontend. It handled all the data operations, including stock management and sales processing. The database was stored in a JSON file (backend/src/db/db.json) for simplicity and ease of use.

Key Features:

Product Management: Full CRUD operations for products, including name, description, category, price, and quantity.

Stock Transactions: Allowed adding or removing stock with built-in validation to prevent negative stock levels.

Low-Stock Alerts: Provided real-time low-stock notifications displayed on the dashboard.

Customer Management: Included minimal CRUD functionality for customers.

Sales Management: Created sales records while automatically adjusting stock levels.

Reports: Generated low-stock reports and simple sales summaries to support inventory decisions.

Deployment:
The project was structured for deployment with the frontend hosted on Netlify or Vercel, and the backend on Render, Glitch, or Railway. The frontend communicated with the backend via a configurable BASE_URL.

Purpose:
This project illustrated a full-stack development workflow, integrating frontend and backend technologies to solve real-world inventory management challenges in a café environment.
