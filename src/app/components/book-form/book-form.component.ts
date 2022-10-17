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
      _id: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      pages: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required]),
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.bookForm.patchValue({ image: file });
  }
  
}
