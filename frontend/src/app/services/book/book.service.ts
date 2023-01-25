import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IResponse } from '../../interfaces/IResponse';
import { Observable } from 'rxjs';
import { IBook } from 'src/app/interfaces/IBook';
import { environment } from 'src/environments/environment';

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
    this.showBookFormCreate = this.showRemovePopUp = this.showBookFormEdit = false;
  }

  createBook(book: FormData): Observable<IResponse<FormData>> {
    return this.http.post<IResponse<FormData>>(environment.api_url + '/book', book, {
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getAllBooks(): Observable<IResponse<IBook[]>> {
    return this.http.get<IResponse<IBook[]>>(environment.api_url+ '/book', {
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getAllUserBooks(): Observable<IResponse<IBook[]>> {
    return this.http.get<IResponse<IBook[]>>(environment.api_url+ '/book/user', {
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  getBook(_id: string): Observable<IResponse<IBook>> {
    return this.http.get<IResponse<IBook>>(environment.api_url + `/book/${_id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  updateBook(_id: string, book: FormData): Observable<FormData> {
    return this.http.put<FormData>(environment.api_url + '/book/' + _id, book, {
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

  removeBook(_id: string): Observable<void> {
    return this.http.delete<void>(`${environment.api_url}/book/${_id}`, {
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        // 'Access-Control-Allow-Headers': 'Content-Type',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      }
    });
  }

}
