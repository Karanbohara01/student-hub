"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var Project = require('../models/Project.js');
var path = require('path');
var fs = require('fs');
var createProject = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(req, res) {
    var _req$body, title, description, subject, projectType, price, githubLink, demoVideoUrl, screenshots, filePath, project, createdProject, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.p = _context.n) {
        case 0:
          _context.p = 0;
          _req$body = req.body, title = _req$body.title, description = _req$body.description, subject = _req$body.subject, projectType = _req$body.projectType, price = _req$body.price, githubLink = _req$body.githubLink, demoVideoUrl = _req$body.demoVideoUrl; // req.files will now be an object with properties for each field
          // e.g., req.files.projectFile and req.files.screenshots
          screenshots = req.files.screenshots ? req.files.screenshots.map(function (file) {
            return "/uploads/".concat(file.filename);
          }) : []; // const filePath = req.files.projectFile ? `/uploads/${req.files.projectFile[0].filename}` : '';
          filePath = req.files.projectFile ? req.files.projectFile[0].filename : ''; // <-- Save only the filename
          if (!(!filePath && !githubLink)) {
            _context.n = 1;
            break;
          }
          return _context.a(2, res.status(400).json({
            message: 'You must provide either a project file or a GitHub link.'
          }));
        case 1:
          project = new Project({
            user: req.user._id,
            title: title,
            description: description,
            subject: subject,
            projectType: projectType,
            price: price,
            githubLink: githubLink,
            demoVideoUrl: demoVideoUrl,
            screenshots: screenshots,
            filePath: filePath // <-- Save the path to the main project file
          });
          _context.n = 2;
          return project.save();
        case 2:
          createdProject = _context.v;
          res.status(201).json(createdProject);
          _context.n = 4;
          break;
        case 3:
          _context.p = 3;
          _t = _context.v;
          res.status(400).json({
            message: 'Error creating project',
            error: _t.message
          });
        case 4:
          return _context.a(2);
      }
    }, _callee, null, [[0, 3]]);
  }));
  return function createProject(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
// const downloadProjectFile = async (req, res) => {
//     try {
//         const project = await Project.findById(req.params.id);

//         if (project && project.filePath) {
//             // For now, we only check if the user is logged in.
//             // Later, we'll add logic to check if they have purchased it.

//             const __dirname = path.resolve();
//             const filePath = path.join(__dirname, project.filePath);

//             // Use res.download() to trigger a file download
//             res.download(filePath, (err) => {
//                 if (err) {
//                     res.status(404).json({ message: 'File not found.' });
//                 }
//             });
//         } else {
//             res.status(404).json({ message: 'Project or file not found.' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// };
var downloadProjectFile = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(req, res) {
    var project, absoluteFilePath, _t2;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.p = _context2.n) {
        case 0:
          _context2.p = 0;
          _context2.n = 1;
          return Project.findById(req.params.id);
        case 1:
          project = _context2.v;
          if (project && project.filePath) {
            absoluteFilePath = path.join(process.cwd(), 'uploads', project.filePath); // 2. Add a console log to see the exact path being used
            console.log('Attempting to download file from path:', absoluteFilePath);

            // 3. Check if the file exists before attempting to download
            if (fs.existsSync(absoluteFilePath)) {
              res.download(absoluteFilePath, function (err) {
                if (err) {
                  // This will handle errors during the actual file transfer
                  console.error('Error during file download transfer:', err);
                  res.status(500).send({
                    message: "Could not download the file."
                  });
                }
              });
            } else {
              console.error('File not found at path:', absoluteFilePath);
              res.status(404).json({
                message: 'File does not exist on server.'
              });
            }
          } else {
            res.status(404).json({
              message: 'Project or file path not found.'
            });
          }
          _context2.n = 3;
          break;
        case 2:
          _context2.p = 2;
          _t2 = _context2.v;
          console.error('Server error in downloadProjectFile:', _t2);
          res.status(500).json({
            message: 'Server Error'
          });
        case 3:
          return _context2.a(2);
      }
    }, _callee2, null, [[0, 2]]);
  }));
  return function downloadProjectFile(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();
var getProjectById = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(req, res) {
    var project, _t3;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          _context3.p = 0;
          _context3.n = 1;
          return Project.findById(req.params.id).populate('user', 'name profilePicture');
        case 1:
          project = _context3.v;
          if (project) {
            res.status(200).json(project);
          } else {
            res.status(404).json({
              message: 'Project not found'
            });
          }
          _context3.n = 3;
          break;
        case 2:
          _context3.p = 2;
          _t3 = _context3.v;
          res.status(500).json({
            message: 'Server Error',
            error: _t3.message
          });
        case 3:
          return _context3.a(2);
      }
    }, _callee3, null, [[0, 2]]);
  }));
  return function getProjectById(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();
var getProjects = /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(req, res) {
    var projects, _t4;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.p = _context4.n) {
        case 0:
          _context4.p = 0;
          _context4.n = 1;
          return Project.find({}).populate('user', 'name rating numReviews');
        case 1:
          projects = _context4.v;
          res.status(200).json(projects);
          _context4.n = 3;
          break;
        case 2:
          _context4.p = 2;
          _t4 = _context4.v;
          res.status(500).json({
            message: 'Server Error',
            error: _t4.message
          });
        case 3:
          return _context4.a(2);
      }
    }, _callee4, null, [[0, 2]]);
  }));
  return function getProjects(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();
var updateProject = /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(req, res) {
    var project, _req$body$price, updatedProject, _t5;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          _context5.p = 0;
          _context5.n = 1;
          return Project.findById(req.params.id);
        case 1:
          project = _context5.v;
          if (!project) {
            _context5.n = 4;
            break;
          }
          if (!(project.user.toString() !== req.user._id.toString())) {
            _context5.n = 2;
            break;
          }
          return _context5.a(2, res.status(401).json({
            message: 'Not authorized'
          }));
        case 2:
          // Update the fields
          project.title = req.body.title || project.title;
          project.description = req.body.description || project.description;
          project.subject = req.body.subject || project.subject;
          project.price = (_req$body$price = req.body.price) !== null && _req$body$price !== void 0 ? _req$body$price : project.price; // Use ?? to allow setting price to 0
          _context5.n = 3;
          return project.save();
        case 3:
          updatedProject = _context5.v;
          res.status(200).json(updatedProject);
          _context5.n = 5;
          break;
        case 4:
          res.status(404).json({
            message: 'Project not found'
          });
        case 5:
          _context5.n = 7;
          break;
        case 6:
          _context5.p = 6;
          _t5 = _context5.v;
          res.status(500).json({
            message: 'Server Error',
            error: _t5.message
          });
        case 7:
          return _context5.a(2);
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return function updateProject(_x9, _x0) {
    return _ref5.apply(this, arguments);
  };
}();
var deleteProject = /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(req, res) {
    var project, _t6;
    return _regenerator().w(function (_context6) {
      while (1) switch (_context6.p = _context6.n) {
        case 0:
          _context6.p = 0;
          _context6.n = 1;
          return Project.findById(req.params.id);
        case 1:
          project = _context6.v;
          if (!project) {
            _context6.n = 4;
            break;
          }
          if (!(project.user.toString() !== req.user._id.toString())) {
            _context6.n = 2;
            break;
          }
          return _context6.a(2, res.status(401).json({
            message: 'Not authorized'
          }));
        case 2:
          _context6.n = 3;
          return project.deleteOne();
        case 3:
          res.status(200).json({
            message: 'Project removed'
          });
          _context6.n = 5;
          break;
        case 4:
          res.status(404).json({
            message: 'Project not found'
          });
        case 5:
          _context6.n = 7;
          break;
        case 6:
          _context6.p = 6;
          _t6 = _context6.v;
          res.status(500).json({
            message: 'Server Error',
            error: _t6.message
          });
        case 7:
          return _context6.a(2);
      }
    }, _callee6, null, [[0, 6]]);
  }));
  return function deleteProject(_x1, _x10) {
    return _ref6.apply(this, arguments);
  };
}();
module.exports = {
  createProject: createProject,
  getProjectById: getProjectById,
  getProjects: getProjects,
  updateProject: updateProject,
  deleteProject: deleteProject,
  downloadProjectFile: downloadProjectFile
};