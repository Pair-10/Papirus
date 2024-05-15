  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { JwtService } from '../services/jwt.service';
  import { TokenService } from '../../../core/services/token.service';
 import { map } from 'rxjs';
 import { Observable } from 'rxjs';
 import { throwError, catchError } from 'rxjs';

 @Injectable({
    providedIn: 'root'
 })
  export class PenaltyAdminService {

   apiUrl = "http://localhost:60805";
    // token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjYzOTdhNDIzLWIyODktNGM3ZC1iNjE4LTNiMGU4ZTUyNTI5MSIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Im5hcmNoQGtvZGxhbWEuaW8iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNTU0NTIxNCwiZXhwIjoxNzIxNTQ1MjE0LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.uxH_VRJz94PRcxcon26kqNeSqoz_ykH9TGHKYGHRYsmNbZtVV232mao3zpOsWmwMDwWsSq9CZIOxWaWdiyLlug";//
    headers!: HttpHeaders;
    userId!: string | null;
 

    constructor(
     private http: HttpClient,
      private jwtService: JwtService,
     private tokenService: TokenService
   ) {
    const token = this.tokenService.getToken(); // TokenService'den token al
    if (!token) {
      console.error('Token not found.');
     return;
    }

    this.headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });


    const decodedJwt = this.jwtService.getDecodedAccessToken(token);
    console.log('Decoded JWT:', decodedJwt);
    this.userId = decodedJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    console.log('User ID:', this.userId);
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
  


  
    getUserAll() {
     const url = `${this.apiUrl}/api/Penalties?PageIndex=0&PageSize=2`; 
   return this.http.get<any[]>(url, { headers: this.headers }).pipe(
        map(response => {
         console.log(response);
        return response;
       })
      );
    }
  

   getUserPenaltyAdmin() {
     const url = `${this.apiUrl}/api/Penalties?PageIndex=0&PageSize=5`; 
    return this.http.get<any[]>(url, { headers: this.headers }).pipe(
       map(response => {
        console.log(response);
         return response;
        })
      );
    }

   getUserPenaltyAdminForm() {
      const url = `${this.apiUrl}/api/Penalties?PageIndex=0&PageSize=2`; 
     return this.http.get<any[]>(url, { headers: this.headers }).pipe(
       map(response => {
         console.log(response);
        return response;
       })
      );
    }

   getPenaltyAdminFormById(id: string): Observable<any> {
     const url = `${this.apiUrl}/api/Penalties/${id}`;

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => {
         console.log(response);
          return response;
        })
    );
    }


   updateUserPenaltyAdminForm(id: string, updatedData: any): Observable<any> {
     const url = `${this.apiUrl}/api/Penalties/${id}`; 
    return this.http.put<any>(url, updatedData, { headers: this.headers }).pipe(
          map(response => {
             console.log(response);
             return response;
        })
     );
 }




   getMaterialName(id: string): Observable<any> {//materialid göre material name
     const url = `${this.apiUrl}/api/Materials/${id}`;

    return this.http.get<any>(url, { headers: this.headers }).pipe(
       map(response => {
         console.log(response);
         return response;
       })
      );
   }
  }