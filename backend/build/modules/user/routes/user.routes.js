"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controller/userController"));
const router = (0, express_1.default)();
const userController = new userController_1.default();
router.get('/', userController.index);
router.get('/:id', userController.show);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.delete);
exports.default = router;
