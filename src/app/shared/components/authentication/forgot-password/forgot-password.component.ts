import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  forgotpasswordFrom: FormGroup; 
  emailorphonenumber = new FormControl ('');

  constructor(private formBuilder: FormBuilder){
    this.forgotpasswordFrom = this.formBuilder.group({
      emailorphonenumber: ['']
    });
  }

    public forgotpassword(){

      if (this.emailorphonenumber.value=="" ) {

        return alert("Mandatory fields cannot be left empty!")
      }    
      
      console.log(this.emailorphonenumber.value)
    }
  

}
