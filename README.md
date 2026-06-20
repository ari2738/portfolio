# Personal Portfolio — Full Stack

React + Flask + PostgreSQL | Deployed on Vercel + Render

---

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

Backend runs at: http://localhost:5000

### 2. Frontend (React)

```powershell
cd frontend
npm install
npm run dev
```

Frontend runs at: http://localhost:5173

---

## Pages

| URL      | Page             |
|----------|------------------|
| /        | Public portfolio |
| /admin   | Admin panel      |

---

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

### Frontend → Vercel
1. Push frontend/ to GitHub
2. Go to vercel.com → Import repo
3. Deploy → get yourname.vercel.app

### Backend → Render
1. Push backend/ to GitHub
2. Go to render.com → New Web Service
3. Build: `pip install -r requirements.txt`
4. Start: `python app.py`
5. Add DATABASE_URL in environment variables

### Update API URL for production
In frontend/vite.config.js change proxy to your Render URL.
