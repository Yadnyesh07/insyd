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
