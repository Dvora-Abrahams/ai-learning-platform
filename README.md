# AI Learning Platform

> Enterprise-grade learning platform powered by artificial intelligence


[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)

## Overview

A full-stack learning platform that enables users to select learning topics, submit prompts to AI, and receive personalized educational content. Features include user authentication, admin dashboard, learning history, and enterprise-grade security.

## Features

### Core Functionality
- **AI-Powered Learning** - Get personalized lessons from OpenAI GPT with fallback responses
- **Category System** - Organized learning topics and subtopics with dynamic loading
- **Learning History** - Track progress and view past lessons with search and filtering
- **User Authentication** - Secure JWT-based authentication with role-based access

### Admin Features
- **User Management** - Complete CRUD operations with pagination and search
- **Analytics Dashboard** - Platform statistics and user activity monitoring
- **Prompt History** - View all user interactions and AI responses

### Technical Features
- **Enterprise Security** - Rate limiting, input sanitization, security headers
- **Performance Monitoring** - Request logging and performance metrics
- **Health Checks** - System monitoring and status endpoints
- **API Documentation** - Complete Postman collection included
- **Responsive Design** - Mobile-first design that works on all devices



### Demo Credentials

**Admin User:**
- Phone: `0500000000`
- Password: `admin123`

**Regular User:**
- Phone: `0501234567`
- Password: `test123`

## Technologies Used

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js** - Web framework with security middleware
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - Stateless authentication
- **OpenAI API** - AI integration with fallback responses
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - API protection
- **Input Validation** - Request sanitization

### Frontend
- **React 19** - Modern UI library
- **TypeScript** - Type safety and better development experience
- **React Router** - Client-side routing
- **Axios** - HTTP client with interceptors
- **CSS Modules** - Scoped styling
- **Vite** - Fast build tool and development server

### DevOps & Development
- **Docker & Docker Compose** - Containerization for local development
- **MongoDB** - Local or cloud database
- **GitHub** - Version control

### Development Tools
- **ESLint** - Code linting
- **Postman** - API testing
- **Nodemon** - Development server

## Prerequisites

- **Node.js 18+** - [Download here](https://nodejs.org/)
- **MongoDB** - Local installation or [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Git** - [Download here](https://git-scm.com/)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/) (optional)

## Installation & Setup

### Option 1: Docker Setup (Recommended)

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ai-learning-platform.git
cd ai-learning-platform
```

2. **Start with Docker Compose**
```bash
docker-compose up -d
```

3. **Seed the database**
```bash
docker-compose exec backend npm run seed
```

4. **Access the application**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- MongoDB: localhost:27017

### Option 2: Manual Setup

#### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run seed
npm run dev
```

#### Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env.local
# Edit .env.local with your API URL
npm run dev
```

### Environment Configuration

#### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/ai-learning-platform
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
OPENAI_API_KEY=your-openai-api-key-here
FRONTEND_URL=http://localhost:5173
NODE_ENV=development
```

#### Frontend (.env.local)
```env
VITE_API_URL=http://localhost:5000/api
```

## Running Locally

### Development Mode
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev

# Terminal 3 - MongoDB (if local)
mongod
```

### Production Mode
```bash
# Backend
cd backend
npm start

# Frontend
cd frontend
npm run build
npm run preview
```

### Using Docker
```bash
# Development
docker-compose up

# Production
docker-compose -f docker-compose.prod.yml up
```

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

## Assumptions Made

### Technical Assumptions
- Users have modern browsers supporting ES6+
- MongoDB is available (local or cloud)
- Node.js 18+ is installed
- Internet connection for OpenAI API (optional)

### Business Assumptions
- Users register with Israeli phone numbers (05xxxxxxxx format)
- Admin users are created manually or through seeding
- AI responses have fallback when OpenAI is unavailable
- Categories and subcategories are predefined

### Security Assumptions
- JWT tokens are stored in localStorage (consider httpOnly cookies for production)
- Rate limiting is sufficient for basic protection
- HTTPS is used in production
- Environment variables are properly secured

## Architecture

### Project Structure
```
ai-learning-platform/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/         # Database schemas
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   ├── utils/          # Utility functions
│   │   ├── config/         # Configuration
│   │   └── scripts/        # Database scripts
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── context/       # React context
│   │   ├── hooks/         # Custom hooks
│   │   └── types/         # TypeScript types
│   ├── Dockerfile.dev
│   └── package.json
├── docker-compose.yml
└── README.md
```

### Database Schema
- **Users** - Authentication and profile data
- **Categories** - Learning topic categories
- **SubCategories** - Detailed topic subdivisions
- **Prompts** - User questions and AI responses

## Enterprise Features

- **Security Headers** - XSS protection, CSRF prevention
- **Rate Limiting** - API abuse prevention
- **Input Validation** - Request sanitization
- **Error Handling** - Comprehensive error management
- **Logging** - Request/response logging
- **Health Checks** - System monitoring
- **Performance Monitoring** - Response time tracking
- **API Documentation** - Postman collection included

## API Documentation

Import the Postman collection from `postman-collection.json` for complete API documentation.

### Key Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/categories` - Get all categories
- `POST /api/prompts` - Submit learning prompt
- `GET /api/prompts/me` - Get user's learning history
- `GET /api/admin/users` - Admin: List all users
- `GET /api/health` - System health check

## Testing

### Manual Testing
1. Import Postman collection
2. Test all endpoints
3. Verify authentication flows
4. Check admin functionality

### Demo Credentials
**Admin User:**
- Phone: `0500000000`
- Password: `admin123`

**Regular User:**
- Phone: `0501234567`
- Password: `test123`

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

## Troubleshooting

### Common Issues

**MongoDB Connection Error**
```bash
# Check if MongoDB is running
mongod --version
# Or use Docker
docker-compose up mongodb
```

**Port Already in Use**
```bash
# Kill process on port 5000
npx kill-port 5000
# Or change PORT in .env
```

**OpenAI API Errors**
- Check API key validity
- Verify account has credits
- System falls back to mock responses

**CORS Issues**
- Verify FRONTEND_URL in backend .env
- Check API_URL in frontend .env

## Performance Considerations

- **Database Indexing** - Categories and users are indexed
- **Rate Limiting** - Prevents API abuse
- **Caching** - Consider Redis for production
- **CDN** - Use for static assets in production

## Security Best Practices

- **Environment Variables** - Never commit .env files
- **JWT Secrets** - Use strong, unique secrets
- **HTTPS** - Always use in production
- **Input Validation** - All inputs are sanitized
- **Rate Limiting** - Prevents brute force attacks

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ for modern learning experiences**