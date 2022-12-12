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
    const bookFormData = new FormData();
    bookFormData.append('title', book.title);
    bookFormData.append('author', book.author);
    bookFormData.append('pages', book.pages);
    bookFormData.append('description', book.description);
    bookFormData.append('image', book.image);

    this.bookService.setShowLoaderCreateAndUpdate();
    this.bookService.createBook(bookFormData).subscribe({
      next: (res) => {
        console.log(res)
        if(res.status === 201) {
          this.bookService.closeForm();
        }
        this.bookService.setShowLoaderCreateAndUpdate();
        location.reload();
      }
    });
  }

  ngOnInit(): void {}

}
