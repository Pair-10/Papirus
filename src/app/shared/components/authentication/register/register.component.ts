import { RegisterService } from './../../../../services/register/register.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';
import { IRegister } from '../../../../models/register/register';
import { IUser } from '../../../../models/user/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  formBuilder=inject(FormBuilder);
  httpService = inject(RegisterService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  registerForm = this.formBuilder.group({
    firstname: [''], 
    lastname: [''], 
    email: [''], 
    phonenumber: [''], 
    password: [''], 
    confirmpassword: ['']
  });
register(){
  const user:IUser={
     email: this.registerForm.value.email!,
     password:this.registerForm.value.password!,
  }
  const register: IRegister = {
    user:user,
    firstName: this.registerForm.value.firstname!,
    lastName: this.registerForm.value.lastname!,
    phoneNumber: this.registerForm.value.phonenumber!,
  };
  if (this.registerForm.value.password! !== this.registerForm.value.confirmpassword!) {
    // Şifreler eşleşmiyorsa hata mesajı göster
    console.log('Şifreler eşleşmiyor.');
    return; // Fonksiyonu burada sonlandır
  }

  this.httpService.createUser(register).subscribe(()=>{
    
      this.router.navigate(['/login']);
    
   
   
  },error=>{
    console.log('Kayıt sırasında bir hata oluştu:', error);
  })
}

}

