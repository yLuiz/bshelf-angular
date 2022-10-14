import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/environments/environment';
import { IUser } from 'src/app/interfaces/IUser';
import { IResponse } from 'src/app/interfaces/IResponse';


interface IRequest {
  usua_login: string;
  usua_senha: string;
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
export class LoginService {

  constructor(
    private http: HttpClient
  ) {}

  login({usua_login, usua_senha}: IRequest): Observable<any> {
    return this.http.post<any>(environment.api_url + '/usuario/login', { usua_login, usua_senha })
  }

  async getDateExpiresToken(token: string): Promise<Date | null> {
      const decoded: IPayload = await jwt_decode(token);
      if(decoded.exp === undefined) {
        return null;
      }

      const date = new Date(0);

      date.setUTCSeconds(decoded.exp);

      return date;
  }

  async isValidToken(token: string | null) {
    if(!token) {
      return false;
    }

    const date = await this.getDateExpiresToken(token);

    if(date === undefined || date === null) { 
      return false;
    }

    return (date.valueOf() > new Date().valueOf());
  }

}
