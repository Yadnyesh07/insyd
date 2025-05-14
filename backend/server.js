require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const User = require('./models/User');
const Notification = require('./models/Notification');
const RecommendationService = require('./services/recommendationService');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Socket.IO Connection Handling
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('follow', async (data) => {
    try {
      const { followerId, followedId } = data;
      
      // Update follower/following lists
      await User.findByIdAndUpdate(followerId, { $addToSet: { following: followedId } });
      await User.findByIdAndUpdate(followedId, { $addToSet: { followers: followerId } });

      // Create notification
      const notification = new Notification({
        recipient: followedId,
        sender: followerId,
        type: 'follow'
      });
      await notification.save();

      // Emit notification to recipient
      socket.to(followedId).emit('newNotification', notification);
    } catch (error) {
      console.error('Follow error:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Generate recommendations periodically
  socket.on('generateRecommendations', async (userId) => {
    try {
      const recommendations = await RecommendationService.generateRecommendations(userId);
      socket.emit('recommendations', recommendations);
    } catch (error) {
      console.error('Recommendation generation failed:', error);
    }
  });
});

// API Routes
app.get('/notifications/:userId', async (req, res) => {
  try {
    const notifications = await Notification.find({ recipient: req.params.userId })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate('sender', 'username profile');
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
