import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/interfaces/IUser';
import { BookService } from 'src/app/services/book/book.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  // api_url = 'https://api-bshelf.herokuapp.com'

  user: IUser = {
    usua_nome: '',
    usua_cpf: '',
    usua_email: '',
    usua_senha: '',
  };

  books!: any[];

  constructor(
    private userService: UserService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {

    const token = localStorage.getItem('token');
    if(token)
    this.userService.getUserByToken(token).then(response => { 
      response.subscribe(user => this.user = user.data);
    });

    this.bookService.getAllBooks().subscribe({
      next: response => {
        this.books = response.map(book => book);
      }
    });
  }

}
