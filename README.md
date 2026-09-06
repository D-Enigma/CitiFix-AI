# CitiFix AI

CitiFix AI is an AI-powered civic issue reporting and monitoring platform. It allows citizens to report problems such as potholes, garbage accumulation, and waterlogging using an image and their current location.

The submitted image is analyzed using trained YOLOv8 models. The system stores the complaint, AI confidence, severity, priority, location, and status so that citizens can track their reports and administrators can manage them from a central dashboard.

## Live Deployment

- Frontend: https://citifix-ai-frontend.onrender.com
- Backend API: https://citifix-ai-backend.onrender.com

## Features

### Citizen
- Register and log in securely
- Submit a civic complaint with an image and GPS location
- AI-based issue detection
- Automatic severity and priority calculation
- View submitted complaints
- Open individual complaint details
- Track complaint status
- View complaint location on a map

### Administrator
- Separate admin login and protected dashboard
- View all complaints and citizen information
- Search and filter complaints
- View complaint evidence and location
- Update complaint status
- View complaint locations on an interactive map
- View complaint and priority analytics

## AI Detection

The backend uses three trained YOLOv8 models:

- Pothole
- Garbage Accumulation
- Waterlogging

If an uploaded image does not contain one of the supported civic issues, the submission is rejected instead of creating an invalid complaint.

## Technology Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- React Router
- Leaflet
- OpenStreetMap

**Backend**
- Python
- FastAPI
- Uvicorn
- Beanie
- MongoDB
- Python-Jose
- pwdlib with Argon2

**AI**
- Ultralytics YOLOv8
- PyTorch
- OpenCV

**Deployment**
- Render
- MongoDB Atlas
- GitHub

## Project Structure

```text
CitiFix-AI/
├── citifix-backend/
│   ├── app/
│   │   ├── core/
│   │   ├── models/
│   │   ├── routers/
│   │   ├── schemas/
│   │   └── services/
│   ├── create_admin.py
│   ├── requirements.txt
│   └── uploads/
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

## How It Works

1. A citizen logs into the platform.
2. The citizen uploads an image and provides a description.
3. The browser captures the current GPS coordinates.
4. The FastAPI backend receives the complaint.
5. The image is analyzed by the trained YOLOv8 models.
6. The strongest supported detection is selected.
7. Severity and priority are calculated from the AI result.
8. The complaint is stored in MongoDB Atlas.
9. The citizen receives a complaint ID and can track the report.
10. Administrators can review, manage, map, and update the complaint.

## Authentication

The application uses JWT-based authentication.

Passwords are stored using Argon2 hashing rather than plain text. Citizen and administrator access are separated using role-based authorization, and citizens can only access complaints they submitted.

## Database

MongoDB Atlas is used as the production database.

The main collections are:

- `users`
- `complaints`

Complaint records contain the detected issue, description, coordinates, AI confidence, severity, priority, status, evidence path, submitting user ID, and creation time.

## Local Development

### Backend

```bash
cd citifix-backend

python -m venv venv
```

Activate the virtual environment and install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file with the required configuration:

```env
MONGO_URI=your_mongodb_connection_string
DATABASE_NAME=citifix
SECRET_KEY=your_secret_key
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password
```

Start the backend:

```bash
python -m uvicorn app.main:app --reload
```

The API will run locally at:

```text
http://127.0.0.1:8000
```

### Frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Start the frontend:

```bash
npm run dev
```

## Deployment

The production version is deployed as two services on Render:

- React/Vite frontend as a Render Static Site
- FastAPI backend as a Render Web Service

MongoDB Atlas is used for the production database.

The frontend is configured with the backend URL through `VITE_API_BASE_URL`.

## Security Notes

- Environment files are not committed to the repository.
- Database credentials and JWT secrets are stored as environment variables.
- Passwords are hashed using Argon2.
- Protected API routes require authentication.
- Administrator APIs require the admin role.
- Citizen complaint access is restricted by ownership.

## Current Scope

The current version focuses on three civic issue categories:

1. Potholes
2. Garbage accumulation
3. Waterlogging

The project is intended as an academic capstone demonstrating the integration of computer vision, web development, geolocation, cloud databases, authentication, and deployment.

## Future Improvements

Some possible improvements include:

- Persistent cloud storage for uploaded evidence
- More civic issue categories
- Municipal department and staff assignment
- Email or mobile notifications
- Heatmaps and more advanced geographic analytics
- Duplicate complaint detection
- Improved AI inference optimization for low-resource hosting
- Multilingual support

## Repository

GitHub: https://github.com/D-Enigma/CitiFix-AI
