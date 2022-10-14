import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { MessagesService } from '../messages/messages.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  isCorrectPassword: boolean = true;
  message: string = '';
  showMessage = false;

  constructor(
    private messagesService: MessagesService,
    private userService: UserService
  ) {}

  submitMethod() {

    if(this.password_confirmation?.value !== this.password?.value) {
      this.isCorrectPassword = false;
      
    } else {
      this.isCorrectPassword = true;
    }

    if(this.password?.invalid) {
      this.messagesService.add("A senha deve conter número, caracter especial, letra minúscula e maiúscula.");
    }

    if(!this.registerForm.invalid) {
      const user = {
        usua_login: this.name?.value + Math.round(Math.random() * 100),
        usua_senha: this.password?.value,
        usua_cpf: "10243105070",
        usua_nome: this.name?.value,
        usua_email: this.email?.value,
        perfis: [40]
      }

      console.log(user);

      this.userService.createUser(user).subscribe(res => {
        this.userService.doLogin(res.data.usua_login, this.password?.value);
      })
    }
  }

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{4,}$")
      ]),
      password_confirmation: new FormControl('', [Validators.required])
    });
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get password_confirmation() {
    return this.registerForm.get('password_confirmation');
  }

}
