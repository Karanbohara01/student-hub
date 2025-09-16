"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
// const fs = require('fs/promises');
// const path = require('path');

// const readDataFile = async () => {
//   // Correctly point to the single data file
//   const filePath = path.join(__dirname, '..', 'data', 'academicData.json');
//   const data = await fs.readFile(filePath, 'utf-8');
//   return JSON.parse(data);
// };
// const getUniversities = async (req, res) => {
//   try {
//     const data = await readDataFile();
//     // Ensure we always return an array, even if data.universities is missing
//     const universities = Array.isArray(data?.universities) ? data.universities : [];
//     res.status(200).json(universities);
//   } catch (error) {
//     console.error('Error in getUniversities:', error);
//     res.status(500).json([]); // Return empty array on error
//   }
// };

// // Similar pattern for other endpoints
// const getFaculties = async (req, res) => {
//   try {
//     const { university } = req.query;
//     if (!university) return res.status(400).json([]);

//     const data = await readDataFile();
//     const faculties = Object.keys(data.structure?.[university] || {});
//     res.status(200).json(Array.isArray(faculties) ? faculties : []);
//   } catch (error) {
//     console.error('Error in getFaculties:', error);
//     res.status(500).json([]);
//   }
// };

// const getPrograms = async (req, res) => {
//   try {
//     const { university, faculty } = req.query;
//     const data = await readDataFile();
//     const programs = Object.keys(data.structure[university]?.[faculty] || {});
//     res.status(200).json(programs);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const getSemesters = async (req, res) => {
//   try {
//     const { university, faculty, program } = req.query;
//     const data = await readDataFile();
//     const semesters = Object.keys(data.structure[university]?.[faculty]?.[program] || {});
//     res.status(200).json(semesters);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// const getSubjects = async (req, res) => {
//   try {
//     const { university, faculty, program, semester } = req.query;
//     const data = await readDataFile();
//     const subjects = data.structure[university]?.[faculty]?.[program]?.[semester] || [];
//     res.status(200).json(subjects);
//   } catch (error) {
//     res.status(500).json({ message: 'Server Error' });
//   }
// };

// module.exports = {
//   getUniversities,
//   getFaculties,
//   getPrograms,
//   getSemesters,
//   getSubjects,
// };

var fs = require('fs/promises');
var path = require('path');
var readDataFile = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var filePath, data;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          filePath = path.join(__dirname, '..', 'data', 'academicData.json');
          _context.n = 1;
          return fs.readFile(filePath, 'utf-8');
        case 1:
          data = _context.v;
          return _context.a(2, JSON.parse(data));
      }
    }, _callee);
  }));
  return function readDataFile() {
    return _ref.apply(this, arguments);
  };
}();
var getUniversities = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var data, universities, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return readDataFile();
        case 1:
          data = _context2.v;
          // Get university names as array from the top-level keys
          universities = Object.keys(data);
          res.status(200).json(universities);
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t = _context2.v;
          console.error('Error in getUniversities:', _t);
          res.status(500).json([]);
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function getUniversities(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var getFaculties = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var university, data, faculties, _t2;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          university = req.query.university;
          if (university) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2, res.status(400).json([]));
        case 1:
          _context3.n = 2;
          return readDataFile();
        case 2:
          data = _context3.v;
          // Access faculties directly under university
          faculties = Object.keys(data[university] || {});
          res.status(200).json(faculties);
          _context3.n = 4;
          break;
        case 3:
          _context3.p = 3;
          _t2 = _context3.v;
          console.error('Error in getFaculties:', _t2);
          res.status(500).json([]);
        case 4:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 3]]);
  }));
  return function getFaculties(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
var getPrograms = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var _data$university, _req$query, university, faculty, data, programs, _t3;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _req$query = req.query, university = _req$query.university, faculty = _req$query.faculty;
          _context4.n = 1;
          return readDataFile();
        case 1:
          data = _context4.v;
          // Access programs under university → faculty
          programs = Object.keys(((_data$university = data[university]) === null || _data$university === void 0 ? void 0 : _data$university[faculty]) || {});
          res.status(200).json(programs);
          _context4.n = 3;
          break;
        case 2:
          _context4.p = 2;
          _t3 = _context4.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function getPrograms(_x5, _x6) {
    return _ref4.apply(this, arguments);
  };
}();
var getSemesters = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var _data$university2, _req$query2, university, faculty, program, data, semesters, _t4;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _req$query2 = req.query, university = _req$query2.university, faculty = _req$query2.faculty, program = _req$query2.program;
          _context5.n = 1;
          return readDataFile();
        case 1:
          data = _context5.v;
          // Access semesters under university → faculty → program
          semesters = Object.keys(((_data$university2 = data[university]) === null || _data$university2 === void 0 || (_data$university2 = _data$university2[faculty]) === null || _data$university2 === void 0 ? void 0 : _data$university2[program]) || {});
          res.status(200).json(semesters);
          _context5.n = 3;
          break;
        case 2:
          _context5.p = 2;
          _t4 = _context5.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 3:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 2]]);
  }));
  return function getSemesters(_x7, _x8) {
    return _ref5.apply(this, arguments);
  };
}();
var getSubjects = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var _data$university3, _req$query3, university, faculty, program, semester, data, subjects, _t5;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _req$query3 = req.query, university = _req$query3.university, faculty = _req$query3.faculty, program = _req$query3.program, semester = _req$query3.semester;
          _context6.n = 1;
          return readDataFile();
        case 1:
          data = _context6.v;
          // Access subjects under university → faculty → program → semester
          subjects = ((_data$university3 = data[university]) === null || _data$university3 === void 0 || (_data$university3 = _data$university3[faculty]) === null || _data$university3 === void 0 || (_data$university3 = _data$university3[program]) === null || _data$university3 === void 0 ? void 0 : _data$university3[semester]) || [];
          res.status(200).json(subjects);
          _context6.n = 3;
          break;
        case 2:
          _context6.p = 2;
          _t5 = _context6.v;
          res.status(500).json({
            message: 'Server Error'
          });
        case 3:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 2]]);
  }));
  return function getSubjects(_x9, _x0) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  getUniversities: getUniversities,
  getFaculties: getFaculties,
  getPrograms: getPrograms,
  getSemesters: getSemesters,
  getSubjects: getSubjects
};