const User = require('../models/User');
const Notification = require('../models/Notification');

class RecommendationService {
  // Simple content recommendation based on user's followers and specialization
  async generateRecommendations(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) return [];

      // Find users with similar specialization
      const similarUsers = await User.find({
        'profile.specialization': user.profile.specialization,
        _id: { $ne: userId }
      }).limit(5);

      // Generate recommendation notifications
      const recommendations = similarUsers.map(similarUser => ({
        recipient: userId,
        sender: similarUser._id,
        type: 'recommendation',
        content: `Check out ${similarUser.profile.name}'s profile in ${similarUser.profile.specialization}`
      }));

      // Save recommendations as notifications
      return await Notification.insertMany(recommendations);
    } catch (error) {
      console.error('Recommendation generation error:', error);
      return [];
    }
  }
}

module.exports = new RecommendationService();
