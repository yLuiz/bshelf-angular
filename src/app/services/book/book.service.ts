import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  showBookForm: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  setShowBookForm() {
    this.showBookForm = !this.showBookForm;
  }

  createBook(book: IBook): Observable<IBook> {
    return this.http.post<IBook>('https://api-bshelf.herokuapp.com/book/', book);
  }

  getAllBooks(): Observable<IBook[]> {
    return this.http.get<IBook[]>('https://api-bshelf.herokuapp.com/book/');
  }

  getBook(_id: string): Observable<IBook> {
    return this.http.get<IBook>('https://api-bshelf.herokuapp.com/book/' + _id);
  }

  updateBook(_id: string, book: IBook): Observable<IBook> {
    return this.http.put<IBook>('https://api-bshelf.herokuapp.com/book/' + _id, book);
  }

  removeBook(_id: string): Observable<void> {
    return this.http.delete<void>(`https://api-bshelf.herokuapp.com/book/${_id}`);
  }

}
