import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  showLoaderCreateAndUpdate: boolean = false;
  showBookFormCreate: boolean = false;
  showBookFormEdit: boolean = false;
  showRemovePopUp: boolean = false;

  constructor(
    private http: HttpClient
  ) { }

  setShowBookFormEdit() {
    this.showBookFormEdit = !this.showBookFormEdit;
  }

  setShowBookFormCreate() {
    if(!this.showBookFormEdit) this.showBookFormCreate = !this.showBookFormCreate;
  }

  setShowRemovePopUp() {
   this.showRemovePopUp = !this.showRemovePopUp;
  }

  setShowLoaderCreateAndUpdate() {
   this.showLoaderCreateAndUpdate = !this.showLoaderCreateAndUpdate;
  }

  closeForm() {
    console.log("closeForm");
    this.showBookFormCreate = false;
    this.showRemovePopUp = false;
    this.showBookFormEdit = false;
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
    return this.http.patch<IBook>('https://api-bshelf.herokuapp.com/book/' + _id, book);
  }

  removeBook(_id: string): Observable<void> {
    return this.http.delete<void>(`https://api-bshelf.herokuapp.com/book/${_id}`);
  }

}
