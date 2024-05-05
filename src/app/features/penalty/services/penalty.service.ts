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
  token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDc0MDQ3NywiZXhwIjoxNzE0ODAwNDc3LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.MQO3qNj0-2d4xrtSUF-xu1ocLzlp5tPZ6lui5sMi1qIGMk4JIyrLFqo7rJrd9N1F8aLl-KkDhpBQwsPsNY84cA";
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
