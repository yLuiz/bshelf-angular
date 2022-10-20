import AppError from "@shared/errors/AppError";
import mongoose from "mongoose";
require('dotenv').config();

import { createConnection } from "mongoose";
createConnection();

const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

async function main() {
  await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@bshelfcluster.aigsv.mongodb.net/bancobshelf?retryWrites=true&w=majority`);
  console.log("Conectado ao MongoDB!");
}

main().catch((error: Error) => {
  console.log(error.message);
  throw new AppError(error.message, 500);
})

export default mongoose;