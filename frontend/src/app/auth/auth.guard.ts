import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) {}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    const token = localStorage.getItem('token');
    
    const isValidToken = await this.loginService.isValidToken(token);

    if(isValidToken) {
      return true;
    }

    localStorage.removeItem('token');
    this.router.navigate(['login']);
    return false;
  }
}
