"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const AppError_1 = __importDefault(require("../../shared/errors/AppError"));
require("../../shared/mongoose");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: '*'
}));
// This way we can access all the uploads files
app.use('/uploads', express_1.default.static('uploads'));
// Must come before app.use((error: Error, req: Request, res: Response, next: NextFunction));
app.use(routes_1.default);
// Must come after app.use(routes);
app.use((error, req, res, next) => {
    if (error instanceof AppError_1.default) {
        return res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        });
    }
    ;
    return res.status(500).json({
        status: 500,
        message: "Internal server error"
    });
});
app.get('/api', (req, res) => {
    res.status(200).json({ message: "API BShelf" });
});
app.listen(process.env.PORT || 3333, () => {
    console.log(`
  ==============================================
  🚀 API is running in http://localhost:3333 🚀
  ==============================================
  `);
});
