"use strict";

function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var User = require('../models/User.js');
var Note = require('../models/Note.js');
var Project = require('../models/Project.js');
var Review = require('../models/Review.js');
var getUserProfile = function getUserProfile(req, res) {
  if (req.user) {
    res.status(200).json(req.user);
  } else {
    res.status(404).json({
      message: 'User not found'
    });
  }
};
var updateUserProfile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var user, updatedUser;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          _context.n = 1;
          return User.findById(req.user._id);
        case 1:
          user = _context.v;
          if (!user) {
            _context.n = 3;
            break;
          }
          user.name = req.body.name || user.name;
          user.university = req.body.university || user.university;
          user.bio = req.body.bio || user.bio;
          if (req.body.supportLinks) {
            user.supportLinks.buyMeACoffee = req.body.supportLinks.buyMeACoffee || user.supportLinks.buyMeACoffee;
            user.supportLinks.github = req.body.supportLinks.github || user.supportLinks.github;
          }
          _context.n = 2;
          return user.save();
        case 2:
          updatedUser = _context.v;
          res.status(200).json(updatedUser);
          _context.n = 4;
          break;
        case 3:
          res.status(404).json({
            message: 'User not found'
          });
        case 4:
          return _context.a(2);
      }
    }, _callee);
  }));
  return function updateUserProfile(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var addNoteToFavorites = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var noteId, user, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          noteId = req.body.noteId;
          _context2.n = 1;
          return User.findById(req.user._id);
        case 1:
          user = _context2.v;
          if (!user) {
            _context2.n = 3;
            break;
          }
          _context2.n = 2;
          return user.updateOne({
            $addToSet: {
              savedNotes: noteId
            }
          });
        case 2:
          res.status(200).json({
            message: 'Note added to favorites'
          });
          _context2.n = 4;
          break;
        case 3:
          res.status(404).json({
            message: 'User not found'
          });
        case 4:
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t = _context2.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 6:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 5]]);
  }));
  return function addNoteToFavorites(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getFavoriteNotes = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var user, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return User.findById(req.user._id).populate({
            path: 'savedNotes',
            populate: {
              path: 'postedBy',
              select: 'name'
            } // Also get the note's author
          });
        case 1:
          user = _context3.v;
          if (user) {
            res.status(200).json(user.savedNotes);
          } else {
            res.status(404).json({
              message: 'User not found'
            });
          }
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t2 = _context3.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function getFavoriteNotes(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var removeNoteFromFavorites = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var noteId, user, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          noteId = req.body.noteId;
          _context4.n = 1;
          return User.findById(req.user._id);
        case 1:
          user = _context4.v;
          if (!user) {
            _context4.n = 3;
            break;
          }
          _context4.n = 2;
          return user.updateOne({
            $pull: {
              savedNotes: noteId
            }
          });
        case 2:
          res.status(200).json({
            message: 'Note removed from favorites'
          });
          _context4.n = 4;
          break;
        case 3:
          res.status(404).json({
            message: 'User not found'
          });
        case 4:
          _context4.n = 6;
          break;
        case 5:
          _context4.p = 5;
          _t3 = _context4.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 6:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 5]]);
  }));
  return function removeNoteFromFavorites(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var getUserPublicProfile = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var user, _yield$Promise$all, _yield$Promise$all2, notes, projects, reviews, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return User.findById(req.params.id).select('-password');
        case 1:
          user = _context5.v;
          if (user) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(404).json({
            message: 'User not found'
          }));
        case 2:
          _context5.n = 3;
          return Promise.all([Note.find({
            postedBy: user._id,
            status: 'Approved'
          }), Project.find({
            user: user._id
          }), Review.find({
            seller: user._id
          }).populate('user', 'name profilePicture')]);
        case 3:
          _yield$Promise$all = _context5.v;
          _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 3);
          notes = _yield$Promise$all2[0];
          projects = _yield$Promise$all2[1];
          reviews = _yield$Promise$all2[2];
          res.status(200).json({
            user: user,
            notes: notes,
            projects: projects,
            reviews: reviews
          });
          _context5.n = 5;
          break;
        case 4:
          _context5.p = 4;
          _t4 = _context5.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 5:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 4]]);
  }));
  return function getUserPublicProfile(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var updateProfilePicture = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var user, _t5;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return User.findById(req.user._id);
        case 1:
          user = _context6.v;
          if (!user) {
            _context6.n = 5;
            break;
          }
          if (!req.file) {
            _context6.n = 3;
            break;
          }
          user.profilePicture = "/uploads/".concat(req.file.filename);
          _context6.n = 2;
          return user.save();
        case 2:
          res.status(200).json({
            message: 'Profile picture updated successfully',
            profilePicture: user.profilePicture
          });
          _context6.n = 4;
          break;
        case 3:
          res.status(400).json({
            message: 'Please upload an image file.'
          });
        case 4:
          _context6.n = 6;
          break;
        case 5:
          res.status(404).json({
            message: 'User not found'
          });
        case 6:
          _context6.n = 8;
          break;
        case 7:
          _context6.p = 7;
          _t5 = _context6.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 8:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 7]]);
  }));
  return function updateProfilePicture(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  getUserProfile: getUserProfile,
  addNoteToFavorites: addNoteToFavorites,
  getFavoriteNotes: getFavoriteNotes,
  updateUserProfile: updateUserProfile,
  removeNoteFromFavorites: removeNoteFromFavorites,
  getUserPublicProfile: getUserPublicProfile,
  updateProfilePicture: updateProfilePicture
};