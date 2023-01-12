"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const crypto_1 = __importDefault(require("crypto"));
const path_1 = __importDefault(require("path"));
const uploadFolder = path_1.default.resolve(__dirname, '..', '..', 'uploads');
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
exports.default = {
    directory: uploadFolder,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter,
    storage: multer_1.default.diskStorage({
        destination: uploadFolder,
        filename(request, file, callback) {
            const fileHash = crypto_1.default.randomBytes(10).toString('hex');
            const filename = `${fileHash}-${file.originalname}`;
            callback(null, filename);
        },
    }),
};
