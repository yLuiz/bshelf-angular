"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateUserService_1 = __importDefault(require("../service/CreateUserService"));
const DeleteUserService_1 = __importDefault(require("../service/DeleteUserService"));
const ListUserService_1 = __importDefault(require("../service/ListUserService"));
const ShowUserService_1 = __importDefault(require("../service/ShowUserService"));
class UserController {
    async index(request, response) {
        const listUserService = new ListUserService_1.default();
        const users = await listUserService.execute();
        return response.status(200).json(users);
    }
    async show(request, response) {
        const showUserService = new ShowUserService_1.default();
        const { id } = request.params;
        const user = await showUserService.execute(id);
        if (user.status !== 200)
            return response.status(user.status).json(user);
        return response.status(200).json(user);
    }
    async create(request, response) {
        const createUserService = new CreateUserService_1.default();
        const { name, email, password } = request.body;
        const user = await createUserService.execute({
            name,
            email,
            password
        });
        if (user.status && user.status !== 201) {
            return response.status(user.status).json(user);
        }
        return response.status(201).json(user);
    }
    async update(request, response) {
        return response.json({});
    }
    async delete(request, response) {
        const deleteUserService = new DeleteUserService_1.default();
        const { id } = request.params;
        const userDeleted = await deleteUserService.execute(id);
        if (userDeleted.status !== 200)
            return response.status(userDeleted.status).json(userDeleted);
        return response.status(200).json(userDeleted);
    }
}
exports.default = UserController;
