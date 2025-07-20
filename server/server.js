// --- 1. Require all packages at the top ---
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { createServer } = require('http'); // Correctly require http
const { Server } = require('socket.io');  // Correctly require socket.io
const reviewRoutes = require('./routes/reviewRoutes.js'); // <-- Import
const chatRoutes = require('./routes/chatRoutes.js');
const Message = require('./models/Message.js'); // <-- Import Message model
const Conversation = require('./models/Conversation.js');
// --- 2. Import Route Files ---
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const projectRoutes = require('./routes/projectRoutes.js');
const bookRoutes = require('./routes/bookRoutes.js');
const articleRoutes = require('./routes/articleRoutes.js');
const gigRoutes = require('./routes/gigRoutes.js');
const noteRoutes = require('./routes/noteRoutes.js');
const dataRoutes = require('./routes/dataRoutes.js'); // <-- ADD THIS
const adminRoutes = require('./routes/adminRoutes.js');



// --- 3. Initial Setup ---
dotenv.config();
const app = express();
const httpServer = createServer(app); // Create HTTP server from Express app
const io = new Server(httpServer, {   // Attach socket.io to the HTTP server
    cors: {
        origin: "http://localhost:5173", // Your future React frontend URL
        methods: ["GET", "POST"]
    }
});
const onlineUsers = new Map();


// --- 4. Core Middleware ---
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    req.io = io;
    next();
});

// --- 5. Database Connection ---
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
    .then(() => console.log('✅ DB Connected!'))
    .catch(err => console.error('DB Connection Error:', err));

// --- 6. API Routes ---
app.get('/', (req, res) => res.send('API is running...'));
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/articles', articleRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/admin', adminRoutes);





// --- 7. Serve Static Files ---
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// --- 8. Real-time Chat Logic ---

// io.on('connection', (socket) => {
//     console.log(`✅ User Connected: ${socket.id}`);
//     // When a user logs in and connects
//     socket.on('user_online', (userId) => {
//         onlineUsers.set(userId, socket.id);
//         // Broadcast to all clients that this user is now online
//         io.emit('update_online_status', Array.from(onlineUsers.keys()));
//     });
//     // When a user starts typing
//     socket.on('typing', (data) => {
//         // Send to the specific room that someone is typing
//         socket.to(data.room).emit('user_typing', { userId: data.userId });
//     });

//     // When a user stops typing
//     socket.on('stop_typing', (data) => {
//         socket.to(data.room).emit('user_stopped_typing');
//     });

//     socket.on('join_room', (data) => {
//         socket.join(data.room);
//     });

//     // When a user sends a message
//     socket.on('send_message', async (data) => {
//         try {
//             // Find or create a conversation between the two users
//             let conversation = await Conversation.findOneAndUpdate(
//                 {
//                     participants: { $all: [data.sender, data.receiver] },
//                 },
//                 {
//                     $setOnInsert: { participants: [data.sender, data.receiver] },
//                 },
//                 {
//                     new: true,
//                     upsert: true,
//                 }
//             );

//             // Save the message to the database
//             const newMessage = new Message({
//                 conversationId: conversation._id,
//                 sender: data.sender,
//                 text: data.text,
//             });
//             await newMessage.save();

//             // Broadcast the message to the room
//             io.in(data.room).emit('receive_message', newMessage);

//         } catch (error) {
//             console.error('Socket message error:', error);
//         }
//     });

//     socket.on('disconnect', () => {
//         console.log(`❌ User Disconnected: ${socket.id}`);
//         // Find and remove the user from our online list
//         for (let [userId, socketId] of onlineUsers.entries()) {
//             if (socketId === socket.id) {
//                 onlineUsers.delete(userId);
//                 break;
//             }
//         }
//         // Broadcast the new list of online users
//         io.emit('update_online_status', Array.from(onlineUsers.keys()));
//     });
// });

io.on('connection', (socket) => {
    console.log(`✅ User Connected: ${socket.id}`);

    socket.on('user_online', (userId) => {
        onlineUsers.set(userId, socket.id);
        io.emit('update_online_status', Array.from(onlineUsers.keys()));
    });

    socket.on('typing', (data) => {
        socket.to(data.room).emit('user_typing', { userId: data.userId });
    });

    socket.on('stop_typing', (data) => {
        socket.to(data.room).emit('user_stopped_typing');
    });

    socket.on('join_room', (data) => {
        socket.join(data.room);
    });

    socket.on('send_message', async (data) => {
        // This log will show us the exact data arriving at the server
        console.log('Backend received send_message event with data:', data);

        try {
            let conversation = await Conversation.findOneAndUpdate(
                { _id: data.conversationId },
                { $setOnInsert: { participants: [data.sender, data.receiver] } },
                { new: true, upsert: true }
            );

            const newMessage = new Message({
                conversationId: conversation._id,
                sender: data.sender,
                text: data.text,
                fileUrl: data.fileUrl,     // <-- Ensure fileUrl is saved
                fileType: data.fileType,   // <-- Ensure fileType is saved
            });

            await newMessage.save();

            // Populate sender info before broadcasting
            const messageToSend = await newMessage.populate('sender', 'name profilePicture');

            io.in(data.room).emit('receive_message', messageToSend);

        } catch (error) {
            console.error('Socket message error:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log(`❌ User Disconnected: ${socket.id}`);
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
        io.emit('update_online_status', Array.from(onlineUsers.keys()));
    });
});

// --- 9. Start the Server ---
const PORT = process.env.PORT || 5001;
// The httpServer must be the one to listen, not the app
httpServer.listen(PORT, () => console.log(`🚀 Server (with chat) running on port ${PORT}`));