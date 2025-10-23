# AI Learning Platform - Backend API

A production-grade REST API for an AI-powered learning platform built with Node.js, Express, MongoDB, and OpenAI GPT integration.

##  Features

- **User Management**: Register users with name and phone
- **Category System**: Hierarchical categories and subcategories for learning topics
- **AI-Powered Lessons**: Generate educational content using OpenAI GPT-3.5
- **Learning History**: Track all user prompts and AI responses
- **Admin Dashboard**: View all users, their learning history, and platform statistics
- **Input Validation**: Comprehensive validation and error handling
- **RESTful Architecture**: Clean, modular code structure

##  Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- Docker & Docker Compose (optional, for MongoDB)
- OpenAI API Key

##  Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **AI Integration**: OpenAI GPT-3.5 Turbo
- **Validation**: Custom middleware
- **Error Handling**: Centralized error handler

##  Project Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── database.js       # MongoDB connection
│   │   └── env.js            # Environment configuration
│   ├── models/
│   │   ├── User.js           # User schema
│   │   ├── Category.js       # Category schema
│   │   ├── SubCategory.js    # SubCategory schema
│   │   └── Prompt.js         # Prompt schema
│   ├── controllers/
│   │   ├── userController.js
│   │   ├── categoryController.js
│   │   ├── promptController.js
│   │   └── adminController.js
│   ├── services/
│   │   └── openaiService.js  # OpenAI integration
│   ├── routes/
│   │   ├── userRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── promptRoutes.js
│   │   └── adminRoutes.js
│   ├── middleware/
│   │   ├── errorHandler.js   # Global error handler
│   │   └── validator.js      # Input validation
│   ├── scripts/
│   │   └── seedDatabase.js   # Database seeding
│   └── app.js                # Express app setup
├── server.js                 # Entry point
├── package.json
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

##  Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ai-learning-platform
OPENAI_API_KEY=
NODE_ENV=development
```

### 4. Start MongoDB

**Option A: Using Docker (Recommended)**

```bash
docker-compose up -d
```

**Option B: Local MongoDB**

Make sure MongoDB is installed and running on your system.

### 5. Seed the Database

```bash
npm run seed
```

This will populate categories and subcategories (Science/Space, Mathematics/Algebra, etc.)

### 6. Start the Server

**Development mode (with auto-restart):**

```bash
npm run dev
```

**Production mode:**

```bash
npm start
```

Server will run on `http://localhost:5000`

##  API Endpoints

### Health Check

```
GET /health
```

### Users

```
POST   /api/users              # Register new user
GET    /api/users/:id          # Get user by ID
```

### Categories

```
GET    /api/categories                    # Get all categories
GET    /api/categories/:id/subcategories  # Get subcategories
POST   /api/categories                    # Create category (admin)
POST   /api/categories/:id/subcategories  # Create subcategory (admin)
```

### Prompts

```
POST   /api/prompts                 # Create prompt & get AI lesson
GET    /api/prompts/user/:userId    # Get user's learning history
```

### Admin

```
GET    /api/admin/users     # Get all users with their prompts
GET    /api/admin/stats     # Get platform statistics
```

##  API Usage Examples

### 1. Register a User

```bash
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Israel Cohen",
    "phone": "0501234567"
  }'
```

### 2. Get All Categories

```bash
curl http://localhost:5000/api/categories
```

### 3. Create a Prompt (Get AI Lesson)

```bash
curl -X POST http://localhost:5000/api/prompts \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "USER_ID_HERE",
    "category_id": "CATEGORY_ID_HERE",
    "sub_category_id": "SUBCATEGORY_ID_HERE",
    "prompt": "Teach me about black holes"
  }'
```

### 4. Get User's Learning History

```bash
curl http://localhost:5000/api/prompts/user/USER_ID_HERE
```

### 5. Admin: Get All Users

```bash
curl http://localhost:5000/api/admin/users
```

##  Database Schema

### Users Collection
- `name`: String (required, min 2 chars)
- `phone`: String (required, unique, 10-15 digits)
- `timestamps`: createdAt, updatedAt

### Categories Collection
- `name`: String (required, unique)
- `timestamps`: createdAt, updatedAt

### SubCategories Collection
- `name`: String (required)
- `category_id`: ObjectId (ref: Category)
- Unique compound index: (name, category_id)

### Prompts Collection
- `user_id`: ObjectId (ref: User)
- `category_id`: ObjectId (ref: Category)
- `sub_category_id`: ObjectId (ref: SubCategory)
- `prompt`: String (required, min 5 chars)
- `response`: String (AI-generated)
- `timestamps`: createdAt, updatedAt

##  Validation & Error Handling

- **Input Validation**: All endpoints validate required fields and formats
- **MongoDB Validation**: Schema-level validation with custom error messages
- **ObjectId Validation**: Validates MongoDB IDs before database queries
- **Centralized Error Handler**: Consistent error responses across the API
- **Duplicate Prevention**: Unique constraints on phone and category names

##  Testing the API

Use tools like:
- **Postman**: Import and test all endpoints
- **curl**: Command-line testing (examples above)
- **Thunder Client** (VS Code extension)
- **Insomnia**: API client

## Deployment Recommendations

- **Environment Variables**: Use secure secrets management
- **MongoDB**: Deploy on MongoDB Atlas or similar cloud service
- **API Keys**: Rotate OpenAI keys regularly
- **CORS**: Configure allowed origins for production
- **Rate Limiting**: Add rate limiting middleware (express-rate-limit)
- **Logging**: Implement Winston or Morgan for production logging
- **Process Manager**: Use PM2 for production deployment

##  Notes

- The OpenAI API key provided is for development only
- Seed script creates 5 categories with 4 subcategories each
- All timestamps are in ISO 8601 format
- Phone numbers accept 10-15 digits only
- AI responses are limited to 1000 tokens

##  Contributing

Feel free to submit issues and enhancement requests!

##  License

MIT License

---

**Author**: [Your Name]  
**Contact**: [Your Email]  
**Repository**: [GitHub URL]
