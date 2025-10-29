# Booklt: Experiences & Slots

A **full-stack web application** built for the **Fullstack Intern Assignment** — allowing users to explore curated travel experiences, view availability, and complete a seamless booking flow.

---

## Project Goal

The goal of this project is to demonstrate a **complete end-to-end booking flow**, showcasing both frontend and backend development skills:
- API integration and data handling
- Real-world booking logic (slots, validation, promos)
- Clean, responsive UI adhering to a given **Figma design**

---

## LIVE LINK

- **Frontend (Vercel):** [https://book-it-puce.vercel.app/](https://book-it-puce.vercel.app/)  
- **Backend (Vercel):** [https://book-it-sc23.vercel.app/](https://book-it-sc23.vercel.app/)
- **GitHub Repository:** [https://github.com/Zayedmd12321/bookIt.git](https://github.com/Zayedmd12321/bookIt.git) 

---

## Tech Stack

### **Frontend**
- Framework: **React + TypeScript** (Vite)
- Styling: **TailwindCSS (v4)**
- Routing: **React Router DOM**
- API Client: **Axios**
- Icons: **React Icons**

### **Backend**
- Framework: **Node.js + Express**
- Database: **MongoDB (Mongoose ORM)**
- Environment Management: **dotenv**
- CORS Enabled API: **cors**

---

## Features

  Browse a list of travel experiences  
  View detailed information & availability for each experience  
  Select dates and time slots (with “Sold Out” states)  
  Adjust quantity and view dynamic pricing (with tax)  
  Apply promo codes (e.g., `SAVE10`, `FLAT100`)  
  Complete checkout with form validation  
  Booking confirmation screen  
  Responsive design for desktop & mobile  
  Skeleton loaders for smooth UX  
  Prevents double-booking on the backend  

---

## Setup Instructions

### **Prerequisites**
- Node.js (v18+)
- npm or yarn
- MongoDB Atlas account (or local MongoDB instance)

---

### Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `/server` directory:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<your_cluster_url>/BookltDB?retryWrites=true&w=majority
PORT=5000
```

Seed sample data:
```bash
npm run seed
```

Start the server:
```bash
npm start
```

API available at: **http://localhost:5000/api**

---

### Frontend Setup

```bash
cd ../client
npm install
```

Create a `.env` file inside `/client`:

```env
VITE_API_URL=http://localhost:5000/api
```

Run the development server:
```bash
npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## API Endpoints

| Method | Endpoint | Description |
|---------|-----------|-------------|
| **GET** | `/api/experiences` | Fetch all experiences |
| **GET** | `/api/experiences/:id` | Fetch single experience & slots |
| **POST** | `/api/promo/validate` | Validate promo code |
| **POST** | `/api/bookings` | Create a new booking with validation |

---

## Integration Flow

**Home → Details → Checkout → Result**

Data is dynamically fetched from the backend:
- Experiences & slots are stored in MongoDB
- Promo code validation and booking logic handled via API
- Frontend consumes these APIs with Axios

---

## Design Specification

- Based on provided Figma:  
  [HD Booking Figma Design](https://www.figma.com/design/8X6E1Ev8YdtZ3erV0Iifvb/HD-booking?node-id=0-1&p=f&t=K4scwnxfIHmfbb2a-0)

- Fully responsive (desktop & mobile)
- Matches Figma spacing, typography, and colors precisely

---

## Deliverables Checklist

 Functional fullstack app hosted live  
 Dynamic data flow (no hardcoded values)  
 Matches design exactly  
 Clean code organization (frontend & backend)  
 README with setup + run instructions  

---

## Author

**Md Zayed Ghanchi**  
Fullstack Developer — Booklt: Experiences & Slots  
[eagle.zayed@gmail.com](mailto:zayedmd12321@gmail.com)  
[GitHub Profile](https://github.com/Zayedmd12321)

---

**Assignment Reference:**  
Based on the "Fullstack Intern Assignment" outlining project requirements for **Booklt: Experiences & Slots**.
