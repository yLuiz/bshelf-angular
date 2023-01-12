"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _userController = _interopRequireDefault(require("../controller/userController"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = (0, _express.default)();
const userController = new _userController.default();
router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);
var _default = router;
exports.default = _default;