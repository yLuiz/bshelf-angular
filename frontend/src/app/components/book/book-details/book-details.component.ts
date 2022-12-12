import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/IBook';
import { IResponse } from 'src/app/interfaces/IResponse';
import { BookService } from 'src/app/services/book/book.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  id: string = this.route.snapshot.paramMap.get('id') || '';
  book!: IBook;
  showLoader = true;

  api_url = environment.api_url;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public bookService: BookService,
    ) { }
    
    deleteHandle() {
      this.bookService.setShowLoaderCreateAndUpdate();
      this.bookService.removeBook(this.id).subscribe({
        next: () => {
          this.bookService.closeForm();
          this.bookService.setShowLoaderCreateAndUpdate();
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }

    ngOnInit(): void {
    this.bookService.getBook(this.id).subscribe(book => {
      this.book = book.data;
      console.log(book);

      this.showLoader = false;
    });

  }

}
