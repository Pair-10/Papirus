import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from '../../../services/jwt/jwt.service';
import { TokenService } from '../../../core/services/token.service';
import { map } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService  {

  apiUrl = "http://localhost:60805";
  token = "";//
  headers: HttpHeaders;
  userId: string;

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private tokenService: TokenService
  ) {
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    const decodedJwt = this.jwtService.getDecodedAccessToken(this.token);
    this.userId = decodedJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
  }


  
  getAuthortable() {
    const url = `${this.apiUrl}/api/Authors?PageIndex=0&PageSize=2`; 
    return this.http.get<any[]>(url, { headers: this.headers }).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }


 
}
