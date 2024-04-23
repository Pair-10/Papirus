import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink, RouterModule} from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup; 
  email = new FormControl('');
  password = new FormControl('');
  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: [''], 
      password: [''],
      rememberMe: [false] 
    });
  }
  public loginClick(){

    if (this.email.value=="" || this.password.value=="") {

      return alert("Mandatory fields cannot be left empty!")
    }   
    console.log(this.email.value)
    console.log(this.password.value)
  }
}
