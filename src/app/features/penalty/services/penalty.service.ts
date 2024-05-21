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
 export class PenaltyService {

   apiUrl = "http://localhost:60805";
   headers!: HttpHeaders;
   userId!: string | null;

   constructor(
     private http: HttpClient,
     private jwtService: JwtService,
     private tokenService: TokenService,
   ) {   
     const token = this.tokenService.getToken(); // TokenService'den token alır
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
    // Token içinde userId kontrolü yapar
    if (!this.userId) {
         console.error('User ID not found in token.');
         return throwError('User ID not found in token.');
    }
     // userId'ye sahip cezaları getir
     const url = `${this.apiUrl}/api/Penalties/byUserId/${this.userId}`;

    return this.http.get<any[]>(url, { headers: this.headers }).pipe(
       map(response => {
         console.log('Penalties for user:', response);
        // Sadece bu kullanıcıya ait cezaları filtreler
       const userPenalties = response.filter(penalty => penalty.userId === this.userId);
        return userPenalties;
       }),
      catchError(error => {
         console.error('Error fetching user penalties:', error);
        return throwError('Error fetching user penalties.');
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


  getMaterialName(id: string): Observable<any> {//materialid göre material name getirir
    const url = `${this.apiUrl}/api/Materials/${id}`;

    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => {
         console.log(response);
         return response;
     })
     );
   }
 }
