const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['follow', 'like', 'comment', 'share', 'recommendation'], 
    required: true 
  },
  content: { type: String },
  isRead: { type: Boolean, default: false },
  relatedContent: { type: mongoose.Schema.Types.ObjectId }
}, { timestamps: true });

module.exports = mongoose.model('Notification', NotificationSchema);
