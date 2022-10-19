import { Component, OnInit } from '@angular/core';
import { IBook } from 'src/app/interfaces/IBook';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  btnText = "Criar";

  constructor(
    public bookService: BookService
  ) { }

  createHandler(book: IBook) {

    console.log(book);
    const bookFormData = new FormData();
    bookFormData.append('title', book.title);
    bookFormData.append('author', book.author);
    bookFormData.append('pages', book.pages);
    bookFormData.append('description', book.description);
    bookFormData.append('image', book.url_img);

    this.bookService.setShowLoaderCreateAndUpdate();
    this.bookService.createBook(book).subscribe({
      next: () => {
        this.bookService.closeForm();
        location.reload();
        this.bookService.setShowLoaderCreateAndUpdate();
      }
    });
  }

  ngOnInit(): void {}

}
