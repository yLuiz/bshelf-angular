"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _multer = _interopRequireDefault(require("multer"));
var _crypto = _interopRequireDefault(require("crypto"));
var _path = _interopRequireDefault(require("path"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const uploadFolder = _path.default.resolve(__dirname, '..', '..', 'uploads');
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
var _default = {
  directory: uploadFolder,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter,
  storage: _multer.default.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = _crypto.default.randomBytes(10).toString('hex');
      const filename = `${fileHash}-${file.originalname}`;
      callback(null, filename);
    }
  })
};
exports.default = _default;