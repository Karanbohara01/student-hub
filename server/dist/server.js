"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// --- 1. Require all packages at the top ---
var express = require('express');
var dotenv = require('dotenv');
var cors = require('cors');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var path = require('path');
var _require = require('http'),
  createServer = _require.createServer; // Correctly require http
var _require2 = require('socket.io'),
  Server = _require2.Server; // Correctly require socket.io
var reviewRoutes = require('./routes/reviewRoutes.js'); // <-- Import
var chatRoutes = require('./routes/chatRoutes.js');
var Message = require('./models/Message.js'); // <-- Import Message model
var Conversation = require('./models/Conversation.js');
// --- 2. Import Route Files ---
var authRoutes = require('./routes/authRoutes.js');
var userRoutes = require('./routes/userRoutes.js');
var projectRoutes = require('./routes/projectRoutes.js');
var bookRoutes = require('./routes/bookRoutes.js');
var articleRoutes = require('./routes/articleRoutes.js');
var gigRoutes = require('./routes/gigRoutes.js');
var noteRoutes = require('./routes/noteRoutes.js');
var dataRoutes = require('./routes/dataRoutes.js'); // <-- ADD THIS
var adminRoutes = require('./routes/adminRoutes.js');
var paymentRoutes = require('./routes/paymentRoutes.js');
var fileProxyRoute = require('./routes/fileProxy');
var testimonialRoutes = require('./routes/testimonialRoutes.js');

// --- 3. Initial Setup ---
dotenv.config();
var app = express();
var httpServer = createServer(app); // Create HTTP server from Express app
var io = new Server(httpServer, {
  // Attach socket.io to the HTTP server
  cors: {
    origin: "http://localhost:5173",
    // Your future React frontend URL
    methods: ["GET", "POST"]
  }
});
var onlineUsers = new Map();

// --- 4. Core Middleware ---
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// --- 5. Database Connection ---
var mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI).then(function () {
  return console.log('✅ DB Connected!');
})["catch"](function (err) {
  return console.error('DB Connection Error:', err);
});

// --- 6. API Routes ---
app.get('/', function (req, res) {
  return res.send('API is running...');
});
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
app.use('/api/payments', paymentRoutes);
app.use('/api/files', fileProxyRoute);
app.use('/api/testimonials', testimonialRoutes);

// --- 7. Serve Static Files ---
app.use('/uploads', express["static"](path.join(__dirname, 'uploads')));
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

io.on('connection', function (socket) {
  console.log("\u2705 User Connected: ".concat(socket.id));
  socket.on('user_online', function (userId) {
    onlineUsers.set(userId, socket.id);
    io.emit('update_online_status', Array.from(onlineUsers.keys()));
  });
  socket.on('typing', function (data) {
    socket.to(data.room).emit('user_typing', {
      userId: data.userId
    });
  });
  socket.on('stop_typing', function (data) {
    socket.to(data.room).emit('user_stopped_typing');
  });
  socket.on('join_room', function (data) {
    socket.join(data.room);
  });
  socket.on('send_message', /*#__PURE__*/function () {
    var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(data) {
      var conversation, newMessage, messageToSend, _t;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.p = _context.n) {
          case 0:
            // This log will show us the exact data arriving at the server
            console.log('Backend received send_message event with data:', data);
            _context.p = 1;
            _context.n = 2;
            return Conversation.findOneAndUpdate({
              _id: data.conversationId
            }, {
              $setOnInsert: {
                participants: [data.sender, data.receiver]
              }
            }, {
              "new": true,
              upsert: true
            });
          case 2:
            conversation = _context.v;
            newMessage = new Message({
              conversationId: conversation._id,
              sender: data.sender,
              text: data.text,
              fileUrl: data.fileUrl,
              // <-- Ensure fileUrl is saved
              fileType: data.fileType // <-- Ensure fileType is saved
            });
            _context.n = 3;
            return newMessage.save();
          case 3:
            _context.n = 4;
            return newMessage.populate('sender', 'name profilePicture');
          case 4:
            messageToSend = _context.v;
            io["in"](data.room).emit('receive_message', messageToSend);
            _context.n = 6;
            break;
          case 5:
            _context.p = 5;
            _t = _context.v;
            console.error('Socket message error:', _t);
          case 6:
            return _context.a(2);
        }
      }, _callee, null, [[1, 5]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
  socket.on('disconnect', function () {
    console.log("\u274C User Disconnected: ".concat(socket.id));
    var _iterator = _createForOfIteratorHelper(onlineUsers.entries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          userId = _step$value[0],
          socketId = _step$value[1];
        if (socketId === socket.id) {
          onlineUsers["delete"](userId);
          break;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    io.emit('update_online_status', Array.from(onlineUsers.keys()));
  });
});

// --- 9. Start the Server ---
var PORT = process.env.PORT || 5001;
// The httpServer must be the one to listen, not the app
httpServer.listen(PORT, function () {
  return console.log("\uD83D\uDE80 Server (with chat) running on port ".concat(PORT));
});