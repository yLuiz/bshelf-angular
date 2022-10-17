import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MessageComponent } from './components/messages/messages.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { NewBookComponent } from './components/new-book/new-book.component';

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
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
