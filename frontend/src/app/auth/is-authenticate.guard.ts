import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class IsAuthenticateGuard implements CanActivate {

  apiConnected = false;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {
    this.loginService.login({
      email: "email@email.com",
      password: "password"
    }).subscribe({
      next: () => {
        return;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
        if (error.status !== 0) {
          this.apiConnected = true;
        }
      }
    })
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (!this.apiConnected && state.url === '/register') {
      this.router.navigate(['']);
      return false;
    }

    if(!token) {
      return true
    } else {
      this.router.navigate(['']);
      return false;
    }
  }
  
}
