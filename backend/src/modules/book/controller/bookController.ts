import Book from '@modules/book/model/Book.model';
import AppError from "@shared/errors/AppError";
import { Request, Response } from "express";
import { ObjectId } from 'mongodb';
import CreateBookService from "../service/CreateBookService";
import ListBooksService from "../service/ListBookService";
import ShowBookService from "../service/ShowBookService";
import ShowUserBooksService from '../service/ShowUserBooks';
import UpdateBookService from "../service/UpdateBookService";

export default class BookController {
  
  public async index(request: Request, response: Response): Promise<Response>{
    const listBookService = new ListBooksService();
    const books = await listBookService.execute();

    return response.status(200).json(books);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showBookService = new ShowBookService();
    const book = await showBookService.execute(id);
  
    return response.status(200).json(book);
  }

  public async showUserBooks(request: Request, response: Response): Promise<Response> {
    const showUserBooksService = new ShowUserBooksService();
    const { user } = request;

    const books = await showUserBooksService.execute(user.id);

    return response.status(200).json(books);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createBookService = new CreateBookService();

    const { title, author, description, pages } = request.body;
    const image = request.file;

    if(!request.file) return response.status(400).json({
      status: 400,
      message: 'Invalid file!'
    })


    const newBook = await createBookService.execute(
      request.user.id, 
      {
        title,
        author,
        description,
        pages,
        image: image?.filename
      }
    );

    return response.status(201).json(newBook);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const { id: _id }: any = request.params;
    const { title, author, description, pages } = request.body
    const image = request.file;

    console.log(image?.filename)

    const updateBookService = new UpdateBookService();
    const updatedBook = await updateBookService.execute(request.user.id, {
      _id,
      author,
      description,
      image: image?.filename,
      pages,
      title
    })

    return response.status(200).json(updatedBook);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const book = await Book.findOne({_id: id})

    if(!book) {
      return response.status(404).json({message: "Livro não encontrado!"})
    }

    await Book.deleteOne({_id: id})
    return response.status(200).json({message: "Livro removido com sucesso!"})
  }
}