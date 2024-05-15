import { JwtService } from '../jwt/jwt.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from '../../core/services/token.service';
import { jwtToken } from '../../jwttoken';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl="http://localhost:60805"
  http=inject(HttpClient)
  jwtService=inject(JwtService)
  tokenService=inject(TokenService)
  token=this.tokenService.getToken();
  decodedJwt=this.jwtService.getDecodedAccessToken(this.token!);
  nameIdentifier = this.decodedJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  
  constructor() { }

  getUser(){
    return this.http.get<{id:string, firstName: string,lastName:string,email:string,phoneNumber:string}>(this.apiUrl +`/api/Users/${this.nameIdentifier}`);
  }
}
