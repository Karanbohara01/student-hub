"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() { } function GeneratorFunction() { } function GeneratorFunctionPrototype() { } t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// Use require for CommonJS modules
var User = require('../models/User.js');
var generateToken = require('../utils/generateToken.js');
var nodemailer = require('nodemailer');
var crypto = require('crypto');
var registerUser = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, name, email, password, userExists, user, transporter, verificationLink, mailOptions, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.p = 1;
          _context.n = 2;
          return User.findOne({
            email: email
          });
        case 2:
          userExists = _context.v;
          if (!userExists) {
            _context.n = 3;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: 'User already exists'
          }));
        case 3:
          // Create user but don't log them in yet
          user = new User({
            name: name,
            email: email,
            password: password,
            // Generate a verification token
            emailVerificationToken: crypto.randomBytes(20).toString('hex')
          });
          _context.n = 4;
          return user.save();
        case 4:
          // --- Send Verification Email ---
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          verificationLink = "https://student-hub-frontend-pq6x.onrender.com/verify-email/".concat(user.emailVerificationToken);
          mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verify Your Email for StudentHub',
            html: "<p>Please verify your email by clicking on the following link: <a href=\"".concat(verificationLink, "\">").concat(verificationLink, "</a></p>")
          };
          _context.n = 5;
          return transporter.sendMail(mailOptions);
        case 5:
          res.status(201).json({
            message: 'Registration successful. Please check your email to verify your account.'
          });
          _context.n = 7;
          break;
        case 6:
          _context.p = 6;
          _t = _context.v;
          res.status(500).json({
            message: 'Server Error',
            error: _t.message
          });
        case 7:
          return _context.a(2);
      }
    }, _callee, null, [[1, 6]]);
  }));
  return function registerUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var verifyEmail = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var token, user, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          token = req.params.token;
          _context2.n = 1;
          return User.findOne({
            emailVerificationToken: token
          });
        case 1:
          user = _context2.v;
          if (user) {
            _context2.n = 2;
            break;
          }
          return _context2.a(2, res.status(404).json({
            message: 'Invalid or expired verification link.'
          }));
        case 2:
          user.isEmailVerified = true;
          user.emailVerificationToken = undefined; // Token is one-time use
          _context2.n = 3;
          return user.save();
        case 3:
          res.status(200).json({
            message: 'Email verified successfully. You can now log in.'
          });
          _context2.n = 5;
          break;
        case 4:
          _context2.p = 4;
          _t2 = _context2.v;
          res.status(500).json({
            message: 'Server Error',
            error: _t2.message
          });
        case 5:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 4]]);
  }));
  return function verifyEmail(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

// const loginUser = async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (user && (await user.matchPassword(password))) {
//             // --- ADD THIS CHECK ---
//             if (!user.isEmailVerified) {
//                 return res.status(401).json({ message: 'Please verify your email before logging in.' });
//             }
//             // --- END OF CHECK ---

//             generateToken(res, user._id);
//             res.status(200).json({
//                 _id: user._id,
//                 name: user.name,
//                 email: user.email,
//             });
//         } else {
//             res.status(401).json({ message: 'Invalid email or password' });
//         }
//     } catch (error) {
//         res.status(401).json({ message: error.message });
//     }
// };

var loginUser = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var _req$body2, email, password, user, _t3, _t4;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context3.p = 1;
          _context3.n = 2;
          return User.findOne({
            email: email
          });
        case 2:
          user = _context3.v;
          _t3 = user;
          if (!_t3) {
            _context3.n = 4;
            break;
          }
          _context3.n = 3;
          return user.matchPassword(password);
        case 3:
          _t3 = _context3.v;
        case 4:
          if (!_t3) {
            _context3.n = 6;
            break;
          }
          if (user.isEmailVerified) {
            _context3.n = 5;
            break;
          }
          return _context3.a(2, res.status(401).json({
            message: 'Please verify your email before logging in.'
          }));
        case 5:
          generateToken(res, user._id);
          res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin // <-- Add this line
          });
          _context3.n = 7;
          break;
        case 6:
          res.status(401).json({
            message: 'Invalid email or password'
          });
        case 7:
          _context3.n = 9;
          break;
        case 8:
          _context3.p = 8;
          _t4 = _context3.v;
          res.status(401).json({
            message: _t4.message
          });
        case 9:
          return _context3.a(2);
      }
    }, _callee3, null, [[1, 8]]);
  }));
  return function loginUser(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var forgotPassword = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var user, resetToken, resetUrl, message, transporter, mailOptions, _t5;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return User.findOne({
            email: req.body.email
          });
        case 1:
          user = _context4.v;
          if (user) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, res.status(200).json({
            message: 'If a user with that email exists, a password reset link has been sent.'
          }));
        case 2:
          // 1. Generate a plain reset token
          resetToken = crypto.randomBytes(20).toString('hex'); // 2. Hash the token and save it to the database
          user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

          // 3. Set an expiry date (e.g., 10 minutes)
          user.passwordResetExpires = Date.now() + 10 * 60 * 1000;
          _context4.n = 3;
          return user.save();
        case 3:
          // 4. Send the email with the PLAIN token
          resetUrl = "https://student-hub-frontend-pq6x.onrender.com/reset-password/".concat(resetToken);
          message = "You are receiving this email because you (or someone else) have requested the reset of a password. Please make a PUT request to: \n\n ".concat(resetUrl); // Setup Nodemailer to send email (as we did for verification)
          transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS
            }
          });
          mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Password Reset Token for StudentHub',
            text: message
          };
          _context4.n = 4;
          return transporter.sendMail(mailOptions);
        case 4:
          res.status(200).json({
            message: 'If a user with that email exists, a password reset link has been sent.'
          });
          _context4.n = 6;
          break;
        case 5:
          _context4.p = 5;
          _t5 = _context4.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 6:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 5]]);
  }));
  return function forgotPassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var resetPassword = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var hashedToken, user, _t6;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          // 1. Get the hashed token
          hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex'); // 2. Find user by hashed token and check if it's not expired
          _context5.n = 1;
          return User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: {
              $gt: Date.now()
            }
          });
        case 1:
          user = _context5.v;
          if (user) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(400).json({
            message: 'Token is invalid or has expired'
          }));
        case 2:
          // 3. Set the new password
          user.password = req.body.password;
          // 4. Clear the reset token fields
          user.passwordResetToken = undefined;
          user.passwordResetExpires = undefined;
          _context5.n = 3;
          return user.save();
        case 3:
          // We can generate a new login token here if we want to auto-login the user
          // generateToken(res, user._id); 

          res.status(200).json({
            message: 'Password has been reset successfully.'
          });
          _context5.n = 5;
          break;
        case 4:
          _context5.p = 4;
          _t6 = _context5.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 5:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 4]]);
  }));
  return function resetPassword(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// Use module.exports for CommonJS
module.exports = {
  registerUser: registerUser,
  loginUser: loginUser,
  verifyEmail: verifyEmail,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword
};