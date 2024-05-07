import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from '../services/jwt.service';
import { TokenService } from '../../../core/services/token.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PenaltyService {

  apiUrl = "http://localhost:60805";
  token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjIxOTY0YmM5LWZhYTYtNDM5MS1iODllLWIwZjVjNmIyYTFhYiIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5czNAa3lzMyIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwibmJmIjoxNzE1MDk5NTM4LCJleHAiOjE3MjEwOTk1MzgsImlzcyI6Im5BcmNoaXRlY3R1cmVAa29kbGFtYS5pbyIsImF1ZCI6InN0YXJ0ZXJQcm9qZWN0QGtvZGxhbWEuaW8ifQ.wa8Nbs8KPp5JUpj2ii_XBfj1GjTbUZAWn4j2HVM__h2Tcw46Gz6lO8UvWsQz8txbebA3KQ5GJRAPaCYwRhRdYw";
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

  getUser() {
    const url = `${this.apiUrl}/api/Penalties/byUserId/${this.userId}`;

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => {
        console.log(response);
        return response;
      })
    );
  }

  
}
