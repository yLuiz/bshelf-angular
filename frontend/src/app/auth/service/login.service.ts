import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

interface IRequest {
  email: string;
  password: string;
}

interface IPayload {
  exp: number;
  iat: number;  
  sub: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient
  ) {}

  login({email, password}: IRequest): Observable<any> {
    return this.http.post<any>(environment.api_url + '/session', { email, password })
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
