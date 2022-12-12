import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBook } from 'src/app/interfaces/IBook';
import { BookService } from 'src/app/services/book/book.service';
import { MessagesService } from '../../messages/messages.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  @Input()
  book!: IBook;

  constructor(
    public bookService: BookService,
    private messagesService: MessagesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  showLoader = false;
  id: any = this.route.snapshot.paramMap.get('id');

  updateHandler(book: IBook): void {

    console.log(book);

    const bookFormData = new FormData();
    bookFormData.append('title', book.title);
    bookFormData.append('author', book.author);
    bookFormData.append('pages', book.pages);
    bookFormData.append('description', book.description);
    bookFormData.append('image', book.image);

    this.bookService.setShowLoaderCreateAndUpdate();
    this.bookService.updateBook(this.id, bookFormData).subscribe({
      next: (response) => {
        this.messagesService.add('Atualizado com sucesso!');
        this.bookService.closeForm();
        location.reload();
        this.bookService.setShowLoaderCreateAndUpdate();
      }
    })
  }

  ngOnInit(): void {
    const bookId: any = this.route.snapshot.paramMap.get('id');
    // this.bookService.getBook(bookId).subscribe({
    //   next: (response) => {
    //     this.book = response.data;
    //   },
    //   error: (err) => {
    //     this.messagesService.add('Houve um error: ' + err.message);
    //     console.log(err);
    //   }
    // })
  }

}
