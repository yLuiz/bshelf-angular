import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/IBook';
import { IUser } from 'src/app/interfaces/IUser';
import { BookService } from 'src/app/services/book/book.service';
import { UserService } from 'src/app/services/user/user.service';
import { environment } from 'src/environments/environment';

interface City {
  name: string,
  code: string
}


@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {


  cities: City[];

  selectedCity!: City;

  // api_url = 'https://api-bshelf.herokuapp.com'
  showLoader = true;

  user: IUser = {
    name: '',
    email: '',
    password: ''
  };
  books!: IBook[];
  api_url = environment.api_url
  noBooks: boolean = true;

  showBookForm = this.bookService.showBookFormCreate;

  constructor(
    private userService: UserService,
    private bookService: BookService
  ) {
    this.cities = [
      { name: 'New York', code: 'NY'},
      { name: 'Rome', code: 'RM'},
      { name: 'London', code: 'LDN'},
      { name: 'Istanbul', code: 'IST'},
      { name: 'Paris', code: 'PRS'}
    ];
  }

  ngOnInit(): void {

    this.showBookForm = this.bookService.showBookFormCreate;

    const token = localStorage.getItem('token');
    if(token)
    this.userService.getUserByToken(token).then(response => { 
      response.subscribe(user => this.user = user.data);
    });

    this.bookService.getAllBooks().subscribe({
      next: response => {
        if(response.data) {
          this.books = response.data.map(book => book);
          if(!response.data.length) {
            this.noBooks = false;
          }
        }
        this.showLoader = false;
      }
    });
  }
}
