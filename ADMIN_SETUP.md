# Admin Panel Setup Guide

## Backend Setup

1. **Install Backend Dependencies**
```bash
cd server
npm install
```

2. **Start Backend Server**
```bash
npm run dev
```
Server will run on http://localhost:5000

## Create Admin User

Use this script to create your first admin user:

```bash
cd server
node -e "
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
mongoose.connect('mongodb+srv://admin:admin123@mydb.mmybzmn.mongodb.net/portfolio').then(async () => {
  const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    email: String
  }));
  const hashedPassword = await bcrypt.hash('admin123', 10);
  await User.create({ username: 'admin', password: hashedPassword, email: 'admin@portfolio.com' });
  console.log('Admin user created!');
  process.exit(0);
});
"
```

Or manually register via API:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123","email":"admin@portfolio.com"}'
```

## Frontend Setup

1. **Install React Router (if not installed)**
```bash
npm install react-router-dom
```

2. **Start Frontend**
```bash
npm run dev
```

## Access Admin Panel

1. Navigate to: http://localhost:5173/admin/login
2. Login with:
   - Username: `admin`
   - Password: `admin123`

## Features

### Projects Management
- Add/Edit/Delete projects
- Set featured projects
- Upload project images
- Manage tech stack

### Education Management
- Add/Edit/Delete education entries
- Manage degrees, institutions, grades

### Skills Management
- Organize skills by category
- Set skill proficiency levels

### Certifications Management
- Add/Edit/Delete certifications
- Link to credential verification

### Events & Hackathons Management
- Manage events and hackathons separately
- Upload event images and certificates

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Login

### Projects
- GET `/api/projects` - Get all projects
- POST `/api/projects` - Create project (auth required)
- PUT `/api/projects/:id` - Update project (auth required)
- DELETE `/api/projects/:id` - Delete project (auth required)

### Education
- GET `/api/education` - Get all education
- POST `/api/education` - Create education (auth required)
- PUT `/api/education/:id` - Update education (auth required)
- DELETE `/api/education/:id` - Delete education (auth required)

### Skills
- GET `/api/skills` - Get all skills
- POST `/api/skills` - Create skill (auth required)
- PUT `/api/skills/:id` - Update skill (auth required)
- DELETE `/api/skills/:id` - Delete skill (auth required)

### Certifications
- GET `/api/certifications` - Get all certifications
- POST `/api/certifications` - Create certification (auth required)
- PUT `/api/certifications/:id` - Update certification (auth required)
- DELETE `/api/certifications/:id` - Delete certification (auth required)

### Events
- GET `/api/events` - Get all events
- POST `/api/events` - Create event (auth required)
- PUT `/api/events/:id` - Update event (auth required)
- DELETE `/api/events/:id` - Delete event (auth required)

### File Upload
- POST `/api/upload` - Upload file (auth required)

## Security Notes

1. **Change JWT Secret**: Update `JWT_SECRET` in `.env` file
2. **Change Admin Password**: After first login, create a new admin user with a strong password
3. **Enable HTTPS**: In production, always use HTTPS
4. **Environment Variables**: Never commit `.env` file to version control

## Production Deployment

1. Update MongoDB URI in `.env`
2. Set strong JWT_SECRET
3. Configure CORS for your domain
4. Use environment variables for sensitive data
5. Enable rate limiting
6. Add input validation
7. Implement file upload restrictions

## Troubleshooting

**MongoDB Connection Error**
- Check MongoDB URI in `.env`
- Ensure MongoDB Atlas allows connections from your IP

**CORS Error**
- Backend CORS is configured for all origins in development
- Update CORS settings for production

**Authentication Error**
- Ensure token is stored in localStorage
- Check token expiration (24h default)
