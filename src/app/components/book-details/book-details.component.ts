import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/IBook';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id: string = this.route.snapshot.paramMap.get('id') || '';
  book!: IBook;
  showLoader = true;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public bookService: BookService
    ) { }
    
    deleteHandle() {
      // this.bookService.removeBook(this.id).subscribe({
      //   next: () => {
      //     this.bookService.closeForm();
      //     this.router.navigate(['']);
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   }
      // });
    }

    ngOnInit(): void {
    this.bookService.getBook(this.id).subscribe(book => {
      this.book = book;
      this.showLoader = false;
    });

  }

}
