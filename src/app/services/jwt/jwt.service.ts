import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  
  constructor() { }
  getDecodedAccessToken(token: string): any {
    try {
      if(token == null) return false;
      let decodedToken = jwtDecode<any>(token);
      return decodedToken;
    } catch(Error) {
      return false;
    }
  }
}
