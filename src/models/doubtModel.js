// schemas/doubtSchema.js

import mongoose from 'mongoose';

const doubtSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['Live', 'Recorded', 'Image'], // Example solution types
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Assuming you store the path to the image file
    default: '', // Default empty string if no image is provided
  },
  video: {
    type: String, // Assuming you store the path to the video file
    default: '', // Default empty string if no video is provided
  },
  bidRange: {
    type: String, // Or Number, based on your requirements
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model for creator information
    required: true,
  },
}, { timestamps: true });

const Problem =  mongoose.models.Problem || mongoose.model('Problem', doubtSchema);

export default Problem;
