import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {Router, RouterLink, RouterModule} from '@angular/router';

@Component({
  selector: 'app-new-password',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.css'
})
export class NewPasswordComponent {
  passwordForm: FormGroup; 
  newpassword = new FormControl ('');
  confirmpassword = new FormControl ('');


  
  constructor(private formBuilder: FormBuilder,public router: Router) {
  
    this.passwordForm = this.formBuilder.group({
      newpassword: [''], 
      confirmpassword: ['']
    });

  }

 
  public newconfirmpassword()
  {
    if (this.newpassword.value=="" || this.confirmpassword.value=="" ) {

      return alert("New password and new password repetition cannot be left blank.")
    }


    if (this.newpassword.value==this.confirmpassword.value) {
      
     this.router.navigate(["login"])

    }
    else{
    return  alert("Password repeat is incorrect")
    }
    console.log(this.newpassword.value)
    console.log(this.confirmpassword.value)
  }

}
