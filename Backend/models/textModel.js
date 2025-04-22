// models/Story.js

import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  contributorNames: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userModel', // assuming your user model is called "User"
    required: true,
  },
});

const Story = mongoose.model('Story', storySchema);

export default Story;
