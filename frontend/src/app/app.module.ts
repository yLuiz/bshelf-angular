import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BooksListComponent } from './components/book/book-list/books-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MessageComponent } from './components/messages/messages.component';
import { BookDetailsComponent } from './components/book/book-details/book-details.component';
import { BookFormComponent } from './components/book/book-form/book-form.component';
import { NewBookComponent } from './components/book/new-book/new-book.component';
import { BookEditComponent } from './components/book/book-edit/book-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown'
import { DialogModule } from 'primeng/dialog';
import { BookAllComponent } from './components/book/book-all/book-all.component';
import { CardModule } from 'primeng/card';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    BooksListComponent,
    LoginComponent,
    RegisterComponent,
    MessageComponent,
    BookDetailsComponent,
    BookFormComponent,
    NewBookComponent,
    BookEditComponent,
    BookAllComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    DropdownModule,
    BrowserAnimationsModule,
    DialogModule,
    CardModule,
    NgxStarRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
