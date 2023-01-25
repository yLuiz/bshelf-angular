import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/IBook';
import { IResponse } from 'src/app/interfaces/IResponse';
import { IUser } from 'src/app/interfaces/IUser';
import { BookService } from 'src/app/services/book/book.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-all',
  templateUrl: './book-all.component.html',
  styleUrls: ['./book-all.component.css']
})
export class BookAllComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private userService: UserService
  ) { }

  allBooks: IBook[] = [];
  popupError: boolean = false;
  api_url = environment.api_url;
  showLoader: boolean = true;
  noBooks: boolean = true;
  user!: IUser;

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if(token)
    this.userService.getUserByToken(token).then(response => { 
      response.subscribe(user => this.user = user.data);
    });

    this.bookService.getAllBooks().subscribe({
      next: (response: IResponse<IBook[]>) => {
        this.allBooks = response.data;
        if (this.allBooks.length) {
          this.noBooks = false;
        }
        this.showLoader = false;
      },
      error: (error: HttpErrorResponse) => {

        console.log(error);
        this.popupError = true;
        setTimeout(() => {
          this.popupError = false;
        }, 2000);
      }
    });
  }

}
