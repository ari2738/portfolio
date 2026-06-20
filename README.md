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


