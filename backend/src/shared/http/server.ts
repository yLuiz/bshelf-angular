import 'reflect-metadata';
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import AppError from '@shared/errors/AppError';
import '@shared/mongoose';
import routes from './routes';

const app = express();
app.use(
  express.urlencoded({ extended: true })
);
app.use(express.json());
app.use(cors());

// This way we can access all the uploads files
app.use('/uploads', express.static('uploads'));

// Must come before app.use((error: Error, req: Request, res: Response, next: NextFunction));
app.use(routes);

// Must come after app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    });
  };

  return res.status(500).json({
    status: 500,
    message: "Internal server error"
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({ message: "API BShelf" });
});

app.listen(3333, () => {
  console.log(`
  ==============================================
  🚀 API is running in http://localhost:3333 🚀
  ==============================================
  `);
});