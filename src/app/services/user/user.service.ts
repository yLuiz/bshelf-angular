import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/auth/service/login.service';
import { IResponse } from 'src/app/interfaces/IResponse';
import { IUser } from 'src/app/interfaces/IUser';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';
const sha1 = require('sha1');

interface IRequest {
  usua_login: string;
  usua_senha: string;
}

interface ITokenResponse {
  access_token: string;
  statusCode?: number;
}

interface IPayload {
  exp: number;
  iat: number;  
  sub: number;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private loginService: LoginService,
    private router: Router,
    private http: HttpClient
  ) { }

  async getUserByToken(token: string): Promise<Observable<IResponse<IUser>>> {
    const payload: IPayload = await jwt_decode(token);

    return this.http.get<any>(environment.api_url + `/usuario/${payload.sub}`)
  }

  createUser(user: any): Observable<any> {
    return this.http.post<any>(environment.api_url + '/usuario', user);
  }

  doLogin(username: string, password: string) {
    this.loginService.login({ usua_login: username, usua_senha: sha1(password) }).subscribe({
      next: (res: ITokenResponse) => {
        const token = localStorage.getItem('token');
        if(token) {
          localStorage.removeItem('token');
        }
        localStorage.setItem('token', res.access_token);
        this.router.navigate(['']);
      }  
    })
  }
}
