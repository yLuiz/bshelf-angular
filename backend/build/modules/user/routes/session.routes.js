"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sessionController_1 = __importDefault(require("../controller/sessionController"));
const sessionsRouter = (0, express_1.Router)();
const SessionsController = new sessionController_1.default();
sessionsRouter.post('/', SessionsController.execute);
exports.default = sessionsRouter;
