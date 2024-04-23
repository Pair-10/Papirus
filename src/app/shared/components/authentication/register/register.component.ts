import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: FormGroup;
  firstname = new FormControl('');
  lastname = new FormControl('');
  emailaddress = new FormControl('');
  phonenumber = new FormControl('');
  password = new FormControl('');
  confirmpassword = new FormControl('');

  constructor(private formBuilder: FormBuilder,public router: Router){
    this.registerForm = this.formBuilder.group({
      firstname: [''], 
      lastname: [''], 
      emailaddress: [''], 
      phonenumber: [''], 
      password: [''], 
      confirmpassword: ['']
    })
  }
  
  public registerpassword(){
  
    if (this.firstname.value=="" || this.lastname.value=="",
        this.emailaddress.value=="" || this.phonenumber.value=="",
        this.password.value=="" || this.confirmpassword.value=="" 
       ) 
    {

      return alert("Required fields cannot be left blank!")
    }

    
    if (this.password.value==this.confirmpassword.value) {
      this.router.navigate(["login"])
     }
     else{
     return  alert("Password repeat is incorrect!")
     }
     console.log(this.firstname.value)
    console.log(this.lastname.value)
    console.log(this.emailaddress.value)
    console.log(this.phonenumber.value)
    console.log(this.password.value)
    console.log(this.confirmpassword.value)
  }


}
