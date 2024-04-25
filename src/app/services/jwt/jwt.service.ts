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
      return jwtDecode(token);
    } catch(Error) {
      return null;
    }
  }
}
