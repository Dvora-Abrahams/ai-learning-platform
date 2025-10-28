# AI Learning Platform

> Advanced learning platform powered by artificial intelligence

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-app.vercel.app)
[![Backend API](https://img.shields.io/badge/API-Live-blue)](https://your-backend.railway.app)

## Features

- **AI-Powered Learning** - Get personalized lessons from OpenAI GPT
- **User Management** - Secure authentication with JWT
- **Admin Dashboard** - User management with pagination and filtering
- **Learning History** - Track your progress and view past lessons
- **Category System** - Organized learning topics and subtopics
- **Responsive Design** - Works on all devices
- **Role-Based Access** - User and Admin permissions

## Live Demo

**Frontend:** [https://your-app.vercel.app](https://your-app.vercel.app)
**Backend API:** [https://your-backend.railway.app](https://your-backend.railway.app)

### Demo Credentials

**Admin User:**
- Phone: `0500000000`
- Password: `admin123`

**Regular User:**
- Phone: `0501234567`
- Password: `test123`

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **OpenAI API** - AI integration
- **bcryptjs** - Password hashing

### Frontend
- **React 19** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **CSS Modules** - Styling
- **Vite** - Build tool

### Deployment
- **Railway** - Backend hosting
- **Vercel** - Frontend hosting
- **MongoDB Atlas** - Database hosting

## Installation & Setup

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- OpenAI API Key (optional)

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run seed
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

## Project Structure

```
ai-learning-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # Database models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   ├── config/         # Configuration
│   │   └── scripts/        # Utility scripts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   └── hooks/         # Custom hooks
│   └── package.json
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id/subcategories` - Get subcategories

### Prompts
- `POST /api/prompts` - Create new prompt
- `GET /api/prompts/me` - Get user's prompts

### Admin
- `GET /api/admin/users` - Get all users (paginated)
- `GET /api/admin/users/:id/prompts` - Get user's prompts
- `DELETE /api/admin/users/:id` - Delete user

## Bonus Features Implemented

- **JWT Authentication** - Secure token-based auth
- **Pagination & Filtering** - Advanced admin panel
- **User Management** - Complete CRUD operations
- **Live Deployment** - Production-ready hosting

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

**Star this repo if you found it helpful!**