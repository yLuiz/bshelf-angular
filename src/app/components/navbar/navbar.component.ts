import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private bookService: BookService
  ) { }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  addBook() {
    this.bookService.setShowBookForm();
  }

  ngOnInit(): void {
  }

}
