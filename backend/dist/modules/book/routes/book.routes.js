"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _isAuthenticated = _interopRequireDefault(require("../../../shared/http/middleware/isAuthenticated"));
var _express = _interopRequireWildcard(require("express"));
var _bookController = _interopRequireDefault(require("../controller/bookController"));
var _upload = _interopRequireDefault(require("@cofing/upload"));
var _multer = _interopRequireDefault(require("multer"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const bookRouter = (0, _express.Router)();
const router = (0, _express.default)();
const bookController = new _bookController.default();
const upload = (0, _multer.default)(_upload.default);
router.get('/', _isAuthenticated.default, bookController.index);
router.get('/user', _isAuthenticated.default, bookController.showUserBooks);
router.get('/:id', _isAuthenticated.default, bookController.show);
router.post('/', _isAuthenticated.default, upload.single('image'), bookController.create);
router.put('/:id', _isAuthenticated.default, upload.single('image'), bookController.update);
router.delete('/:id', _isAuthenticated.default, bookController.delete);
var _default = router;
exports.default = _default;