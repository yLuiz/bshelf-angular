import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  api_url = 'https://api-bshelf.herokuapp.com'

  books!: any[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) { }

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(this.api_url + '/book')
  }

  ngOnInit(): void {
    this.getAllBooks().subscribe({
      next: response => {
        this.books = response.map(book => book);
      }
    });
  }

}
