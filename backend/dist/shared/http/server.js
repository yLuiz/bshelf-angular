"use strict";

require("reflect-metadata");
var _express = _interopRequireDefault(require("express"));
var _cors = _interopRequireDefault(require("cors"));
var _AppError = _interopRequireDefault(require("../errors/AppError"));
require("../mongoose");
var _routes = _interopRequireDefault(require("./routes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
app.use(_express.default.urlencoded({
  extended: true
}));
app.use(_express.default.json());
app.use((0, _cors.default)({
  origin: '*'
}));

// This way we can access all the uploads files
app.use('/uploads', _express.default.static('uploads'));

// Must come before app.use((error: Error, req: Request, res: Response, next: NextFunction));
app.use(_routes.default);

// Must come after app.use(routes);
app.use((error, req, res, next) => {
  if (error instanceof _AppError.default) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message
    });
  }
  ;
  return res.status(500).json({
    status: 500,
    message: "Internal server error"
  });
});
app.get('/api', (req, res) => {
  res.status(200).json({
    message: "API BShelf"
  });
});
app.listen(process.env.PORT || 3333, () => {
  console.log(`
  ==============================================
  🚀 API is running in http://localhost:3333 🚀
  ==============================================
  `);
});