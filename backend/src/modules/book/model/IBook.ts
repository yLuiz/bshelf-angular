import IUser from "@modules/user/model/IUser";
import { Types } from 'mongoose';

export default interface IBook {
    _id?: Types.ObjectId;
    title: string,
    author: string,
    image: any,
    description: string,
    pages: number,
    user?: IUser;
}