# Insyd - Next-Gen Social Platform for Architects

## Project Overview
Insyd is a proof-of-concept notification system for architects, designed to showcase real-time social interactions.

## System Design
Refer to `docs/SYSTEM_DESIGN.md` for detailed system architecture and design considerations.

## Tech Stack
- Frontend: NextJS (TypeScript)
- Backend: NodeJS, Express
- Real-time Communication: Socket.IO
- Database: MongoDB

## Local Setup

### Prerequisites
- Node.js (v16+)
- MongoDB

### Backend Setup
1. Navigate to `backend` directory
2. Run `npm install`
3. Create `.env` file with MongoDB connection string
4. Run `npm run dev`

### Frontend Setup
1. Navigate to `frontend` directory
2. Run `npm install`
3. Run `npm run dev`

## POC Features
- Real-time follow notifications
- Basic notification display
- Simulated user interactions

## Limitations
- No authentication
- Minimal error handling
- Single-region deployment

## Future Enhancements
- User authentication
- Advanced AI-powered recommendations
- Scalable notification infrastructure

## Deployment Options
### Local Development
1. Clone the repository
2. Set up backend:
   ```bash
   cd backend
   npm install
   npm run dev
   ```
3. Set up frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

### Deployment Platforms
#### Backend
- Recommended: Railway.app
- Alternative: Heroku, DigitalOcean App Platform

#### Frontend
- Recommended: Vercel
- Alternative: Netlify, Cloudflare Pages

#### Database
- Recommended: MongoDB Atlas

### Deployment Steps
#### Frontend (Vercel)
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to frontend directory
3. Run `vercel`
4. Follow interactive setup

#### Backend (Railway)
1. Create account at railway.app
2. Create new project
3. Connect GitHub repository
4. Set environment variables:
   - `MONGODB_URI`: MongoDB connection string
   - `PORT`: 5000

#### Database (MongoDB Atlas)
1. Create free cluster
2. Whitelist your deployment IP
3. Create database user
4. Get connection string

### Environment Variables
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Backend server port (default: 5000)

### GitHub Repository
Repository will be created at: https://github.com/yadnyeshkamod/insyd
- User authentication
- Advanced AI-powered recommendations
- Scalable notification infrastructure
