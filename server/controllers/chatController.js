
const Conversation = require('../models/Conversation.js');
const Message = require('../models/Message.js');


const getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({ participants: req.user._id })
      .populate('participants', 'name profilePicture');

    res.status(200).json(conversations);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
const uploadChatFile = async (req, res) => {
  if (req.file) {
    res.status(200).json({
      message: 'File uploaded successfully',
      fileUrl: `/uploads/${req.file.filename}`,
    });
  } else {
    res.status(400).json({ message: 'File upload failed' });
  }
};

const getMessages = async (req, res) => {
  try {
    const messages = await Message.find({ conversationId: req.params.id })
      .populate('sender', 'name profilePicture');
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// const findOrCreateConversation = async (req, res) => {
//   const { receiverId } = req.body;
//   const senderId = req.user._id;

//   if (!receiverId) {
//     return res.status(400).json({ message: 'Receiver ID is required.' });
//   }

//   try {
//     // Sort participant IDs to ensure consistent query
//     const participants = [senderId, receiverId].sort();

//     // Use findOneAndUpdate with upsert to avoid race conditions
//     let conversation = await Conversation.findOneAndUpdate(
//       {
//         participants: {
//           $all: participants,
//           $size: 2
//         }
//       },
//       { $setOnInsert: { participants } },
//       {
//         new: true,
//         upsert: true,
//         populate: { path: 'participants', select: 'name profilePicture' }
//       }
//     );

//     res.status(200).json(conversation);
//   } catch (error) {
//     console.error('Error in findOrCreateConversation:', error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

const findOrCreateConversation = async (req, res) => {
  const { receiverId } = req.body;
  const senderId = req.user._id;

  if (!receiverId) {
    return res.status(400).json({ message: 'Receiver ID is required.' });
  }

  try {
    const participants = [senderId.toString(), receiverId.toString()].sort();

    let conversation = await Conversation.findOne({
      participants: { $all: participants, $size: 2 }
    });

    if (!conversation) {
      conversation = await Conversation.create({ participants });
    }

    // Now populate manually
    conversation = await Conversation.findById(conversation._id).populate(
      'participants',
      'name profilePicture'
    );

    res.status(200).json(conversation);
  } catch (error) {
    console.error('Error in findOrCreateConversation:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};


module.exports = { getConversations, getMessages, findOrCreateConversation, uploadChatFile };