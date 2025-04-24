
📝 Notes App (Full Stack)

A full-stack notes application built with Django (backend) and React (frontend). Users can sign up, log in, create, edit, and delete notes with authentication powered by JWT.

📁 Project Structure
/backend       # Django REST API
/frontend      # React frontend

⚙️ Backend Setup (Django)

 Prerequisites

- Python 3.10+
- pip
- PostgreSQL (if not using SQLite)
- Virtualenv
- 
Installation
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

Environment Variables

Create a `.env` file in the `backend` directory:

SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=your-database-url  # optional if using SQLite

### Migrations & Run Server

python manage.py migrate
python manage.py runserver

## 🔥 Frontend Setup (React)

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation
cd frontend
npm install

### Development Server
npm start
# or
yarn start

By default, the frontend assumes the backend is running on `http://localhost:8000`. Update `.env` or `api.js` accordingly if hosted elsewhere.

🌐 Deployment

- **Frontend:** Hosted on [Netlify](https://www.netlify.com) or [Vercel](https://vercel.com)
- **Backend:** Hosted on [Render](https://render.com)


## 📦 Useful Commands

### Django

python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser

### React

npm run build       # Builds for production
npm run lint        # Lints the code


Want me to customize this more for your exact file names, routes, or deploy links?
