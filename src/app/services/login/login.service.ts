import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IUser } from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  apiUrl="http://localhost:60805"
  http=inject(HttpClient)
  constructor() { }

  loginUser(user:IUser){
    return this.http.post<{accessToken: { token: string }}>(this.apiUrl +'/api/Auth/Login',user);
  }
}
