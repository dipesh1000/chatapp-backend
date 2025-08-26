const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
  {
    chatRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      trim: true,
      required: function () {
        return !this.media;
      },
    },
    media: [
      {
        url: String,
        type: { type: String, enum: ['image', 'document'] },
        size: Number,
      },
    ],
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true }
);

MessageSchema.index({ chatRoom: 1, createdAt: -1 });
module.exports = mongoose.model('Message', MessageSchema);
