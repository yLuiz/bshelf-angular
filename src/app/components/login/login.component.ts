import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/service/login.service';


interface IResponse {
  access_token: string;
  statusCode?: number;
}

let sha1 = require('sha1');

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<any>();
  @HostListener('window:keydown.enter', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if(event.key === 'Enter') {
      this.submitMethod();
    }
  }

  autenticacaoForm!: FormGroup;
  incorrectCredencials = false;
  userNotExist = false;

  constructor(private loginService: LoginService, private router: Router) { }

  submitMethod() {

    const username: string = this.username?.value;
    const password: string = this.password?.value;

    if(this.autenticacaoForm.invalid) return;

    this.onSubmit.emit(this.autenticacaoForm.value);

    this.loginService.login({ usua_login: username, usua_senha: sha1(password) }).subscribe({
      next: (res: IResponse) => {
        localStorage.setItem('token', res.access_token);
        this.incorrectCredencials = false;
        this.router.navigate(['']);
      },
      error: (error) => {
        if(error.status === 403) {
          this.incorrectCredencials = true;

          const myInterval = setTimeout(() => {
            this.incorrectCredencials = false;
            clearTimeout(myInterval)
          }, 2000)
          
        } else if(error.status === 404) {
          this.userNotExist = true;
        }
      }
    });
  }

  ngOnInit(): void {
    this.autenticacaoForm = new FormGroup({
      id: new FormControl(''),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  get username() {
    return this.autenticacaoForm.get('username');
  }

  get password() {
    return this.autenticacaoForm.get('password');
  }
}
