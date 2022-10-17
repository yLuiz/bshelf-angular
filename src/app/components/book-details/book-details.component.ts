import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBook } from 'src/app/interfaces/IBook';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book!: IBook;
  showLoader = true;

  
  constructor(
    private router: ActivatedRoute,
    private bookService: BookService
    ) { }
    
    ngOnInit(): void {

    const bookId: string = this.router.snapshot.paramMap.get('id') || '';
    this.bookService.getBook(bookId).subscribe(book => {
      this.book = book;
      this.showLoader = false;
      console.log(book);
    });

  }

}
