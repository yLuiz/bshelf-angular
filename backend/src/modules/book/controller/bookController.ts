import { Request, Response } from "express";
import Book from '@modules/book/model/Book.model';
import AppError from "@shared/errors/AppError";
import CreateBookService from "../service/CreateBookService";
import ListBooksService from "../service/ListBookService";

export default class BookController {
  
  public async index(request: Request, response: Response): Promise<Response>{
    const listBookService = new ListBooksService();
    const books = await listBookService.execute();

    return response.status(200).json(books);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    try {
      const book = await Book.findOne({_id: id})
  
      if(!book) {
        return response.status(404).json({message: "Livro não encontrado!"})
      }
  
      return response.status(200).json(book)
    }
    catch(err) {
      return response.status(500).json({ERROR: err})
    }
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const createBookService = new CreateBookService();

    const { title, author, description, pages } = request.body;
    const { image } = request.body;
    const newBook = await createBookService.execute({
      title,
      author,
      description,
      pages,
      image
    });

    return response.status(201).json(newBook);
  }

  public async update(request: Request, response: Response): Promise<Response> {

    const { id } = request.params

     const { title, author, url_img, description, pages } = request.body

    const book = {
      title,
      author,
      url_img,
      description,
      pages
    }

    try {
      const updatedBook = await Book.updateOne({_id: id}, book)

      if(!updatedBook) {
        return response.status(404).json({message: "Livro não encontrado!"})
      }

      return response.status(200).json(updatedBook)
    }
    catch(err: any) {
      throw new AppError(err.message, 500);
    }
    
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const book = await Book.findOne({_id: id})

    if(!book) {
      return response.status(404).json({message: "Livro não encontrado!"})
    }

    try {
      await Book.deleteOne({_id: id})
      return response.status(200).json({message: "Livro removido com sucesso!"})
    } 
    catch(err: any) {
      throw new AppError(err.message, 500);
    }
  }
}