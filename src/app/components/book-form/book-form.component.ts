import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBook } from '../../interfaces/IBook'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from 'src/app/services/book/book.service';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<IBook>();
  @Input()
  btnText = 'Submit';
  
  @Input()
  book: IBook | null = null;
  
  showLoader = false;
  bookForm!: FormGroup;
  constructor(
    public bookService: BookService
  ) { }

  submitMethod() {
    if(this.bookForm.invalid) return;

    this.onSubmit.emit(this.bookForm.value);
  }

  ngOnInit(): void {

    this.bookForm = new FormGroup({
      _id: new FormControl(this.book ? this.book._id : '', [Validators.required]),
      title: new FormControl(this.book ? this.book.title : '', [Validators.required]),
      author: new FormControl(this.book ? this.book.author : '', [Validators.required]),
      pages: new FormControl(this.book ? this.book.pages : '', [Validators.required]),
      description: new FormControl(this.book ? this.book.description : '', [Validators.required]),
      image: new FormControl(''),
    });
  }

  get title() {
    return this.bookForm.get('title');
  }

  get author() {
    return this.bookForm.get('author');
  }

  get pages() {
    return this.bookForm.get('pages');
  }

  get description() {
    return this.bookForm.get('description');
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.bookForm.patchValue({ image: file });
  }
  
}
