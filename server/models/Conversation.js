// const mongoose = require('mongoose');

// const conversationSchema = new mongoose.Schema(
//   {
//     participants: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Conversation = mongoose.model('Conversation', conversationSchema);
// module.exports = Conversation;

// conversationSchema.index({ participants: 1 }, { unique: true });


const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// ✅ DO NOT add unique index on participants array
// conversationSchema.index({ participants: 1 }, { unique: true }); ❌

const Conversation = mongoose.model('Conversation', conversationSchema);
module.exports = Conversation;
