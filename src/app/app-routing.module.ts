import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { IsAuthenticateGuard } from './auth/is-authenticate.guard';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent,
    canActivate: [IsAuthenticateGuard]
  },
  { 
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', component: BooksListComponent },
      { path: 'book/:id', component: BookDetailsComponent}
    ],
    canActivate: [AuthGuard]
  },
  {
    path: 'register', 
    component: RegisterComponent,
    canActivate: [IsAuthenticateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
