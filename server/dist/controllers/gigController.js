"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var Gig = require('../models/Gig.js');
var createGig = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, title, subject, budget, deadline, description, gig, createdGig, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, title = _req$body.title, subject = _req$body.subject, budget = _req$body.budget, deadline = _req$body.deadline, description = _req$body.description;
          gig = new Gig({
            requester: req.user._id,
            title: title,
            subject: subject,
            budget: budget,
            deadline: deadline,
            description: description,
            filePath: req.file ? "/uploads/".concat(req.file.filename) : undefined // <-- Add this
          });
          _context.n = 1;
          return gig.save();
        case 1:
          createdGig = _context.v;
          res.status(201).json(createdGig);
          _context.n = 3;
          break;
        case 2:
          _context.p = 2;
          _t = _context.v;
          res.status(400).json({
            message: 'Error creating gig',
            error: _t.message
          });
        case 3:
          return _context.a(2);
      }
    }, _callee, null, [[0, 2]]);
  }));
  return function createGig(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var getGigs = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var gigs, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return Gig.find({
            status: 'Open'
          }).populate('requester', 'name university').sort({
            createdAt: -1
          });
        case 1:
          gigs = _context2.v;
          res.status(200).json(gigs);
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t2 = _context2.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function getGigs(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getGigById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var gig, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return Gig.findById(req.params.id).populate('requester', 'name profilePicture').populate('assignee', 'name profilePicture').populate('applicants', 'name profilePicture');
        case 1:
          gig = _context3.v;
          if (gig) {
            res.status(200).json(gig);
          } else {
            res.status(404).json({
              message: 'Gig not found'
            });
          }
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t3 = _context3.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function getGigById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var updateGig = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var gig, updatedGig, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return Gig.findById(req.params.id);
        case 1:
          gig = _context4.v;
          if (!gig) {
            _context4.n = 4;
            break;
          }
          if (!(gig.requester.toString() !== req.user._id.toString())) {
            _context4.n = 2;
            break;
          }
          return _context4.a(2, res.status(401).json({
            message: 'Not authorized'
          }));
        case 2:
          gig.title = req.body.title || gig.title;
          gig.description = req.body.description || gig.description;
          gig.budget = req.body.budget || gig.budget;
          gig.deadline = req.body.deadline || gig.deadline;
          _context4.n = 3;
          return gig.save();
        case 3:
          updatedGig = _context4.v;
          res.status(200).json(updatedGig);
          _context4.n = 5;
          break;
        case 4:
          res.status(404).json({
            message: 'Gig not found'
          });
        case 5:
          _context4.n = 7;
          break;
        case 6:
          _context4.p = 6;
          _t4 = _context4.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 7:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 6]]);
  }));
  return function updateGig(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var deleteGig = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var gig, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return Gig.findById(req.params.id);
        case 1:
          gig = _context5.v;
          if (!gig) {
            _context5.n = 4;
            break;
          }
          if (!(gig.requester.toString() !== req.user._id.toString())) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(401).json({
            message: 'Not authorized'
          }));
        case 2:
          _context5.n = 3;
          return gig.deleteOne();
        case 3:
          res.status(200).json({
            message: 'Gig removed'
          });
          _context5.n = 5;
          break;
        case 4:
          res.status(404).json({
            message: 'Gig not found'
          });
        case 5:
          _context5.n = 7;
          break;
        case 6:
          _context5.p = 6;
          _t5 = _context5.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 7:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return function deleteGig(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();

// const applyForGig = async (req, res) => {
//     try {
//         const gig = await Gig.findById(req.params.id);

//         if (gig) {
//             if (gig.requester.toString() === req.user._id.toString()) {
//                 return res.status(400).json({ message: 'You cannot apply for your own gig' });
//             }
//             // Add the user to the applicants array if not already applied
//             if (gig.applicants.includes(req.user._id)) {
//                 return res.status(400).json({ message: 'You have already applied for this gig' });
//             }

//             gig.applicants.push(req.user._id);
//             gig.status = 'Pending Approval'; // Update status

//             await gig.save();
//             res.status(200).json({ message: 'Application submitted successfully' });
//         } else {
//             res.status(404).json({ message: 'Gig not found' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };

// @desc    Approve an applicant for a gig
// @route   PUT /api/gigs/:id/approve
// @access  Private (Requester only)
var approveGigApplicant = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var applicantId, gig, updatedGig, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          applicantId = req.body.applicantId; // The ID of the user to approve
          _context6.n = 1;
          return Gig.findById(req.params.id);
        case 1:
          gig = _context6.v;
          if (!gig) {
            _context6.n = 4;
            break;
          }
          if (!(gig.requester.toString() !== req.user._id.toString())) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(401).json({
            message: 'Not authorized to approve for this gig'
          }));
        case 2:
          // Set the approved applicant as the assignee
          gig.assignee = applicantId;
          gig.status = 'Booked';
          gig.applicants = []; // Clear the applicants list
          _context6.n = 3;
          return gig.save();
        case 3:
          updatedGig = _context6.v;
          res.status(200).json(updatedGig);
          _context6.n = 5;
          break;
        case 4:
          res.status(404).json({
            message: 'Gig not found'
          });
        case 5:
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t6 = _context6.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 7:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return function approveGigApplicant(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
var applyForGig = /*#__PURE__*/function () {
  var _ref7 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(req, res) {
    var gig, _t7;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          _context7.p = 0;
          _context7.n = 1;
          return Gig.findById(req.params.id);
        case 1:
          gig = _context7.v;
          if (gig) {
            _context7.n = 2;
            break;
          }
          return _context7.a(2, res.status(404).json({
            message: 'Gig not found'
          }));
        case 2:
          if (!(gig.requester.toString() === req.user._id.toString())) {
            _context7.n = 3;
            break;
          }
          return _context7.a(2, res.status(400).json({
            message: 'You cannot apply for your own gig'
          }));
        case 3:
          if (!gig.applicants.includes(req.user._id)) {
            _context7.n = 4;
            break;
          }
          return _context7.a(2, res.status(400).json({
            message: 'You have already applied for this gig'
          }));
        case 4:
          gig.applicants.push(req.user._id);
          _context7.n = 5;
          return gig.save();
        case 5:
          res.status(200).json({
            message: 'Application submitted successfully'
          });
          _context7.n = 7;
          break;
        case 6:
          _context7.p = 6;
          _t7 = _context7.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 7:
          return _context7.a(2);
      }
    }, _callee7, null, [[0, 6]]);
  }));
  return function applyForGig(_x11, _x12) {
    return _ref7.apply(this, arguments);
  };
}();
var rejectGigApplicant = /*#__PURE__*/function () {
  var _ref8 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(req, res) {
    var applicantId, gig, _t8;
    return _regenerator().w(function (_context8) {
      while (1) switch (_context8.p = _context8.n) {
        case 0:
          _context8.p = 0;
          applicantId = req.body.applicantId;
          _context8.n = 1;
          return Gig.findById(req.params.id);
        case 1:
          gig = _context8.v;
          if (gig) {
            _context8.n = 2;
            break;
          }
          return _context8.a(2, res.status(404).json({
            message: 'Gig not found'
          }));
        case 2:
          if (!(gig.requester.toString() !== req.user._id.toString())) {
            _context8.n = 3;
            break;
          }
          return _context8.a(2, res.status(401).json({
            message: 'Not authorized'
          }));
        case 3:
          // Remove applicant
          gig.applicants = gig.applicants.filter(function (appId) {
            return appId.toString() !== applicantId;
          });
          _context8.n = 4;
          return gig.save();
        case 4:
          res.status(200).json({
            message: 'Applicant rejected'
          });
          _context8.n = 6;
          break;
        case 5:
          _context8.p = 5;
          _t8 = _context8.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 6:
          return _context8.a(2);
      }
    }, _callee8, null, [[0, 5]]);
  }));
  return function rejectGigApplicant(_x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();
module.exports = {
  createGig: createGig,
  getGigs: getGigs,
  getGigById: getGigById,
  deleteGig: deleteGig,
  updateGig: updateGig,
  approveGigApplicant: approveGigApplicant,
  applyForGig: applyForGig,
  rejectGigApplicant: rejectGigApplicant
};