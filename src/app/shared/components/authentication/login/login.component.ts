import { TokenService } from './../../../../core/services/token.service';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ActivatedRoute, Router, RouterLink, RouterModule} from '@angular/router';
import { LoginService } from '../../../../services/login/login.service';
import { IUser } from '../../../../models/user/user';
import { NavbarService } from '../../../../services/navbar/navbar.service';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formBuilder=inject(FormBuilder);
  httpService=inject(LoginService)
  navbarService=inject(NavbarService)
  router = inject(Router);
  route = inject(ActivatedRoute);
  loginForm = this.formBuilder.group({
    email: [''], 
    password: [''], 

  });
  public loginClick(){
    const user:IUser={
      email: this.loginForm.value.email!,
      password:this.loginForm.value.password!,
   }
   this.httpService.loginUser(user).subscribe((response)=>{
    
    try {      
      console.log("Token:",response)
      localStorage.setItem("Token",response.accessToken.token)
      console.log(user)
      console.log(response.accessToken.token)
      this.navbarService.setLoggedIn(true)
      this.router.navigate(['/']);
      
    } catch (error) {
      console.log(error)
    }
    
   
  })
  }
}
