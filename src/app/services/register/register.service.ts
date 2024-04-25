import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { IRegister } from '../../models/register/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl="http://localhost:60805"
  http=inject(HttpClient)
  constructor() { }

  createUser(user:IRegister){
    return this.http.post(this.apiUrl +'/api/Auth/Register',user);
  }
}
