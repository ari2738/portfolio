# Personal Portfolio — Full Stack

React + Flask + PostgreSQL | Deployed on netlify + Render

---
# Abirami Shanmugam — Personal Portfolio

A full-stack personal portfolio website built to showcase my projects, skills, and experience as a BE CSE student. The site is fully dynamic — all project and skill data is stored in a PostgreSQL database and served through a REST API, with a built-in admin dashboard to add or update content without touching code.

🔗 **Live Site:**
https://portfiiii.netlify.app
🔗 **Backend API:** https://portfolio-2-jkvm.onrender.com
🔗 **Source Code:** https://github.com/ari2738/portfolio

---

## What it does

- Displays my projects with filtering by category (Machine Learning, Full-Stack, Data Engineering)
- Shows my technical skills grouped by domain with proficiency levels
- Lists my education and achievements
- Includes a working contact form — messages are saved to the database
- Has a private `/admin` dashboard to add, edit, or delete projects and skills, and view incoming messages, all without editing code

---

## Tech Stack

**Frontend:** React.js, Vite, React Router, Axios
**Backend:** Flask (Python), Flask-SQLAlchemy, Flask-CORS
**Database:** PostgreSQL
**Deployment:** Netlify (frontend), Render (backend + database)

---

## How it works

The React frontend fetches data from a Flask REST API, which reads and writes to a PostgreSQL database. Adding a project through the Admin Panel immediately reflects on the live portfolio — no redeployment needed, since the data is dynamic, not hardcoded.

## Folder Structure

```
portfolio/
├── backend/
│   ├── app.py              ← Flask API + Database models
│   ├── requirements.txt    ← Python dependencies
│   └── .env                ← Database URL config
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── index.css
        ├── pages/
        │   ├── Portfolio.jsx   ← Public portfolio page
        │   └── Admin.jsx       ← Admin panel (/admin)
        └── components/
            ├── Navbar.jsx
            ├── Hero.jsx
            ├── StatsBar.jsx
            ├── Projects.jsx
            ├── Skills.jsx
            ├── Experience.jsx
            ├── Contact.jsx
            └── Footer.jsx
```

---

## Setup — Step by Step

### 1. Backend (Flask)

```powershell
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```


### 2. Frontend (React)

```powershell
cd frontend
npm install
npm run dev
```


---

## Pages

<img width="1920" height="1020" alt="Screenshot 2026-06-20 155145" src="https://github.com/user-attachments/assets/b7b1f359-44ed-499f-9da5-a06089d2b830" />

<img width="1920" height="1020" alt="Screenshot 2026-06-20 155156" src="https://github.com/user-attachments/assets/a1e1b669-5e65-47fa-a905-3a35cae4a98b" />

<img width="1920" height="1020" alt="Screenshot 2026-06-20 172523" src="https://github.com/user-attachments/assets/e6fe74b8-6c1b-4b40-8706-be5ae17eff38" />

<img width="1920" height="1020" alt="Screenshot 2026-06-20 155209" src="https://github.com/user-attachments/assets/dea7fdfe-9230-41cd-9aff-419e11398344" />

<img width="1920" height="1020" alt="Screenshot 2026-06-20 155216" src="https://github.com/user-attachments/assets/ade1280b-5d6a-4b92-9b45-3f0f6141d8d0" />



## API Endpoints

| Method | Endpoint            | Action              |
|--------|---------------------|---------------------|
| GET    | /api/projects       | Get all projects    |
| POST   | /api/projects       | Add new project     |
| PUT    | /api/projects/:id   | Edit project        |
| DELETE | /api/projects/:id   | Delete project      |
| GET    | /api/skills         | Get all skills      |
| POST   | /api/skills         | Add skill           |
| DELETE | /api/skills/:id     | Delete skill        |
| POST   | /api/contact        | Send message        |
| GET    | /api/messages       | View all messages   |

---

## Switch to PostgreSQL

1. Install PostgreSQL from postgresql.org
2. Create database: `CREATE DATABASE portfolio_db;`
3. Update `.env`:

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/portfolio_db
```

---

## Deploy

### Frontend → netlify
1. Push frontend/ to GitHub
2. Go to netlify.com → Import repo
3. Deploy → get yourname.netlify.app

### Backend → Render
1. Push backend/ to GitHub
2. Go to render.com → New Web Service
3. Build: `pip install -r requirements.txt`
4. Start: `python app.py`
5. Add DATABASE_URL in environment variables


