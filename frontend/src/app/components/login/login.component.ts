import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/service/login.service';


interface IResponse {
  token: string;
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

  apiConnected: boolean = false;
  requestDone: boolean = false;
  autenticacaoForm!: FormGroup;
  isLoading: boolean = false;
  incorrectCredencials = false;
  userNotExist = false;

  constructor(private loginService: LoginService, private router: Router) { }

  submitMethod() {

    const email: string = this.email?.value;
    const password: string = this.password?.value;

    if(this.autenticacaoForm.invalid) return;

    this.isLoading = true;

    this.onSubmit.emit(this.autenticacaoForm.value);

    this.loginService.login({ email, password }).subscribe({
      next: (res: IResponse) => {
        localStorage.setItem('token', res.token);
        this.incorrectCredencials = false;
        this.router.navigate(['']);
        this.isLoading = false;
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
        if(error.status === 401) {
          
          this.incorrectCredencials = true;

          setTimeout(() => {
            this.incorrectCredencials = false;
          }, 2000)
          
        } else if(error.status === 404) {
          this.userNotExist = true;
          setTimeout(() => {
            this.userNotExist = true;
          }, 2000)
        }
      }
    });
  }

  async ngOnInit() {
    this.autenticacaoForm = new FormGroup({
      id: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.loginService.login({
      email: "email@email.com",
      password: "password"
    }).subscribe({
      next: () => {
        return;
      },
      error: (error: HttpErrorResponse) => {

        if (error.status === 401) {
          this.apiConnected = true;
        }

        if (error.status === 0) {
          this.apiConnected = false;
        }

        this.requestDone = true;
      }
    })

  }

  get email() {
    return this.autenticacaoForm.get('email');
  }

  get password() {
    return this.autenticacaoForm.get('password');
  }
}
