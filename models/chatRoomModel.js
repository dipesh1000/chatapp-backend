const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function () {
        return this.isGroup;
      },
    },
    isGroup: { type: Boolean, default: false },
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    maxMembers: { type: Number, default: 5 },
    lastMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
  },
  { timestamps: true }
);

ChatRoomSchema.index({ members: 1 });
module.exports = mongoose.model('ChatRoom', ChatRoomSchema);
