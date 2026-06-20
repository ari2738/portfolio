from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["portfiiii.netlify.app"])

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///portfolio.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'portfolio-secret-key')

db = SQLAlchemy(app)

# ─── Models ───────────────────────────────────────────────

class Project(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    tech_stack  = db.Column(db.String(300), nullable=False)   # comma-separated
    category    = db.Column(db.String(50), nullable=False)    # ML / Web / Data
    status      = db.Column(db.String(20), default='live')    # live / wip
    github_url  = db.Column(db.String(200), default='')
    demo_url    = db.Column(db.String(200), default='')
    icon        = db.Column(db.String(50), default='folder')  # tabler icon name
    color       = db.Column(db.String(20), default='blue')    # blue/teal/amber/purple/coral

    def to_dict(self):
        return {
            'id':          self.id,
            'name':        self.name,
            'description': self.description,
            'tech_stack':  [t.strip() for t in self.tech_stack.split(',')],
            'category':    self.category,
            'status':      self.status,
            'github_url':  self.github_url,
            'demo_url':    self.demo_url,
            'icon':        self.icon,
            'color':       self.color,
        }


class Skill(db.Model):
    id       = db.Column(db.Integer, primary_key=True)
    name     = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(50), nullable=False)  # ML / Frontend / Backend / Database
    level    = db.Column(db.Integer, default=75)         # 0–100

    def to_dict(self):
        return {
            'id':       self.id,
            'name':     self.name,
            'category': self.category,
            'level':    self.level,
        }


class Message(db.Model):
    id         = db.Column(db.Integer, primary_key=True)
    name       = db.Column(db.String(100), nullable=False)
    email      = db.Column(db.String(100), nullable=False)
    subject    = db.Column(db.String(200), nullable=False)
    message    = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

    def to_dict(self):
        return {
            'id':         self.id,
            'name':       self.name,
            'email':      self.email,
            'subject':    self.subject,
            'message':    self.message,
            'created_at': str(self.created_at),
        }


# ─── Project Routes ───────────────────────────────────────

@app.route('/api/projects', methods=['GET'])
def get_projects():
    category = request.args.get('category')
    if category and category != 'All':
        projects = Project.query.filter_by(category=category).all()
    else:
        projects = Project.query.all()
    return jsonify([p.to_dict() for p in projects])


@app.route('/api/projects/<int:id>', methods=['GET'])
def get_project(id):
    project = Project.query.get_or_404(id)
    return jsonify(project.to_dict())


@app.route('/api/projects', methods=['POST'])
def add_project():
    data = request.get_json()
    project = Project(
        name        = data['name'],
        description = data['description'],
        tech_stack  = data['tech_stack'],
        category    = data['category'],
        status      = data.get('status', 'live'),
        github_url  = data.get('github_url', ''),
        demo_url    = data.get('demo_url', ''),
        icon        = data.get('icon', 'folder'),
        color       = data.get('color', 'blue'),
    )
    db.session.add(project)
    db.session.commit()
    return jsonify(project.to_dict()), 201


@app.route('/api/projects/<int:id>', methods=['PUT'])
def update_project(id):
    project = Project.query.get_or_404(id)
    data = request.get_json()
    for field in ['name','description','tech_stack','category','status','github_url','demo_url','icon','color']:
        if field in data:
            setattr(project, field, data[field])
    db.session.commit()
    return jsonify(project.to_dict())


@app.route('/api/projects/<int:id>', methods=['DELETE'])
def delete_project(id):
    project = Project.query.get_or_404(id)
    db.session.delete(project)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'})


# ─── Skills Routes ────────────────────────────────────────

@app.route('/api/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    grouped = {}
    for s in skills:
        grouped.setdefault(s.category, []).append(s.to_dict())
    return jsonify(grouped)


@app.route('/api/skills', methods=['POST'])
def add_skill():
    data = request.get_json()
    skill = Skill(
        name     = data['name'],
        category = data['category'],
        level    = data.get('level', 75),
    )
    db.session.add(skill)
    db.session.commit()
    return jsonify(skill.to_dict()), 201


@app.route('/api/skills/<int:id>', methods=['DELETE'])
def delete_skill(id):
    skill = Skill.query.get_or_404(id)
    db.session.delete(skill)
    db.session.commit()
    return jsonify({'message': 'Deleted successfully'})


# ─── Contact Route ────────────────────────────────────────

@app.route('/api/contact', methods=['POST'])
def send_message():
    data = request.get_json()
    msg = Message(
        name    = data['name'],
        email   = data['email'],
        subject = data['subject'],
        message = data['message'],
    )
    db.session.add(msg)
    db.session.commit()
    return jsonify({'message': 'Message sent successfully!'}), 201


@app.route('/api/messages', methods=['GET'])
def get_messages():
    messages = Message.query.order_by(Message.created_at.desc()).all()
    return jsonify([m.to_dict() for m in messages])


@app.route('/api/messages/<int:id>', methods=['DELETE'])
def delete_message(id):
    msg = Message.query.get_or_404(id)
    db.session.delete(msg)
    db.session.commit()
    return jsonify({'message': 'Deleted'})


# ─── Seed Data ────────────────────────────────────────────

def seed_data():
    if Project.query.count() == 0:
        projects = [
            Project(name='BookNest', description='Full-stack online bookstore with Gemini AI summaries, chatbot widget, live search autocomplete, and 159 books seeded across 15 categories.', tech_stack='Django,Gemini AI,PostgreSQL,Bootstrap,JavaScript', category='Web', status='live', github_url='https://github.com', demo_url='https://booknest.vercel.app', icon='book', color='blue'),
            Project(name='Skin Disease Classifier', description='CNN-based skin disease classification trained on HAM10000 dataset. Flask backend serves real-time predictions with confidence scores.', tech_stack='TensorFlow,Keras,Flask,OpenCV,HAM10000', category='ML', status='live', github_url='https://github.com', demo_url='', icon='brain', color='teal'),
            Project(name='NYC Taxi Trip Analyzer', description='PySpark big data pipeline processing NYC taxi trips with ML tip predictor, Flask REST API, and interactive React dashboard.', tech_stack='PySpark,React,Flask,Chart.js,Random Forest', category='Data', status='live', github_url='https://github.com', demo_url='', icon='chart-bar', color='amber'),
            Project(name='AnimaMe', description='Custom anime character generator with voice narration using Pollinations AI for image generation and gTTS for speech synthesis.', tech_stack='React,Flask,Pollinations AI,gTTS,Python', category='ML', status='wip', github_url='https://github.com', demo_url='', icon='sparkles', color='purple'),
            Project(name='Smart Expense Tracker', description='Django-based expense tracker with Chart.js visualizations, category filtering, CSV export, and monthly budget analysis.', tech_stack='Django,Chart.js,SQLite,Bootstrap,Python', category='Web', status='live', github_url='https://github.com', demo_url='', icon='wallet', color='coral'),
            Project(name='ReviewIQ', description='Product sentiment analyzer using TextBlob NLP. React frontend with Flask API backend, SQLite storage, and real-time sentiment scoring.', tech_stack='Flask,React,TextBlob,SQLite,Python', category='ML', status='live', github_url='https://github.com', demo_url='', icon='star', color='blue'),
        ]
        db.session.add_all(projects)

    if Skill.query.count() == 0:
        skills = [
            Skill(name='TensorFlow / Keras', category='Machine Learning', level=85),
            Skill(name='Scikit-learn', category='Machine Learning', level=80),
            Skill(name='PySpark', category='Machine Learning', level=70),
            Skill(name='NLP / TextBlob', category='Machine Learning', level=75),
            Skill(name='React.js', category='Frontend', level=80),
            Skill(name='JavaScript', category='Frontend', level=78),
            Skill(name='Tailwind / Bootstrap', category='Frontend', level=85),
            Skill(name='Chart.js', category='Frontend', level=72),
            Skill(name='Flask', category='Backend', level=88),
            Skill(name='Django', category='Backend', level=82),
            Skill(name='REST APIs', category='Backend', level=85),
            Skill(name='Node.js', category='Backend', level=60),
            Skill(name='PostgreSQL', category='Database & Cloud', level=80),
            Skill(name='MongoDB', category='Database & Cloud', level=75),
            Skill(name='AWS', category='Database & Cloud', level=65),
            Skill(name='MySQL', category='Database & Cloud', level=78),
        ]
        db.session.add_all(skills)

    db.session.commit()


with app.app_context():
    db.create_all()
    seed_data()

if __name__ == '__main__':
    app.run(debug=True, port=5000)
