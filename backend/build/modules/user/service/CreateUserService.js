"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_model_1 = __importDefault(require("../model/User.model"));
const ShowUserService_1 = __importDefault(require("./ShowUserService"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class CreateUserService {
    async execute({ name, email, password }) {
        const showUserService = new ShowUserService_1.default();
        const emailExists = await showUserService.findByEmail(email);
        if (emailExists)
            return {
                status: 400,
                message: "This email is already in use!"
            };
        /* Está gerando o erro, porém não está enviando com resposta! E quebra a aplicação. */
        //if(emailExists) throw new AppError("This email is already in use!"); 
        password = await bcryptjs_1.default.hash(password, 10);
        const user = new User_model_1.default({
            name,
            email,
            password
        });
        const newUser = await user.save();
        return {
            status: 201,
            message: "User created!",
            data: { ...newUser._doc, password: undefined }
        };
    }
}
exports.default = CreateUserService;
