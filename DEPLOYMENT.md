# 🚀 AI Learning Platform - Deployment Guide

## 📋 Prerequisites

1. **MongoDB Atlas Account** (free tier)
2. **Railway Account** (for backend)
3. **Vercel Account** (for frontend)
4. **OpenAI API Key** (optional)

## 🗄️ Step 1: Database Setup (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for free account
3. Create new project: "AI Learning Platform"

### 1.2 Create Database Cluster
1. Click "Build a Database"
2. Choose **FREE** tier (M0 Sandbox)
3. Select region closest to you
4. Name cluster: `ai-learning-cluster`

### 1.3 Setup Database Access
1. **Database Access** → Add New Database User
   - Username: `admin`
   - Password: Generate secure password
   - Role: `Atlas admin`

2. **Network Access** → Add IP Address
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Or add your specific IP

### 1.4 Get Connection String
1. Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy connection string (looks like):
   ```
   mongodb+srv://admin:<password>@ai-learning-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## 🖥️ Step 2: Backend Deployment (Railway)

### 2.1 Prepare Repository
1. Make sure your code is pushed to GitHub
2. Repository should be public

### 2.2 Deploy to Railway
1. Go to [Railway](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your repository
6. Select the `backend` folder

### 2.3 Configure Environment Variables
In Railway dashboard, go to Variables tab and add:

```env
MONGODB_URI=mongodb+srv://admin:<password>@ai-learning-cluster.xxxxx.mongodb.net/ai-learning-platform?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=production
OPENAI_API_KEY=your-openai-key-here
FRONTEND_URL=https://your-frontend-url.vercel.app
```

### 2.4 Deploy
1. Railway will automatically deploy
2. Get your backend URL (e.g., `https://your-app.railway.app`)

## 🌐 Step 3: Frontend Deployment (Vercel)

### 3.1 Update API URL
Update the API base URL in your frontend:

**File: `frontend/src/services/api.js`**
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### 3.2 Deploy to Vercel
1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Set Root Directory to `frontend`
6. Framework Preset: `Vite`

### 3.3 Configure Environment Variables
In Vercel dashboard, add:
```env
REACT_APP_API_URL=https://your-backend.railway.app/api
```

### 3.4 Deploy
1. Click "Deploy"
2. Get your frontend URL (e.g., `https://your-app.vercel.app`)

## 🔄 Step 4: Update Backend CORS

Update your Railway backend environment:
```env
FRONTEND_URL=https://your-app.vercel.app
```

## 🌱 Step 5: Seed Database

1. In Railway dashboard, go to your backend service
2. Open "Deployments" tab
3. Click on latest deployment
4. Open "View Logs"
5. In the terminal, run:
   ```bash
   npm run seed
   ```

## ✅ Step 6: Test Your Deployment

1. Visit your frontend URL
2. Try to register a new user
3. Login with admin credentials:
   - Phone: `0500000000`
   - Password: `admin123`
4. Test all features

## 🔗 Final URLs

- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.railway.app`
- **API Docs:** `https://your-backend.railway.app/api/health`

## 🐛 Troubleshooting

### Common Issues:

1. **CORS Error:**
   - Check FRONTEND_URL in Railway environment
   - Make sure URLs match exactly

2. **Database Connection:**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist in Atlas

3. **API Not Working:**
   - Check Railway logs for errors
   - Verify all environment variables

## 📱 Demo Credentials

**Admin User:**
- Phone: `0500000000`
- Password: `admin123`

**Regular User:**
- Phone: `0501234567`
- Password: `test123`

---

## 🎉 Congratulations!

Your AI Learning Platform is now live and accessible worldwide! 🌍