import { JwtService } from '../jwt/jwt.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from '../../core/services/token.service';
import { jwtToken } from '../../jwttoken';
import { IFullUser } from '../../models/fullUser/fullUser';
import { Observable, map } from 'rxjs';
import { IUserResponse } from '../../models/user-response/userResponse';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "http://localhost:60805"
  http = inject(HttpClient)
  jwtService = inject(JwtService)
  tokenService = inject(TokenService)
  token = this.tokenService.getToken(); 
  decodedJwt = this.jwtService.getDecodedAccessToken(this.token!);
  nameIdentifier = this.decodedJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

  headers = { Authorization: `Bearer ${this.token}` };

  getUser() {
    return this.http.get<{ id: string, firstName: string, lastName: string, email: string, phoneNumber: string }>(this.apiUrl + `/api/Users/${this.nameIdentifier}`);
  }
  getUser2(id:string) {
    return this.http.get<{ id: string, firstName: string, lastName: string, email: string, phoneNumber: string }>(this.apiUrl + `/api/Users/${id}`);
  }
  updateUser(user: IFullUser) {
    return this.http.put(this.apiUrl + "/api/Users", user);
  }
  getAllUsers(): Observable<IUserResponse[]> {
    return this.http.get<any>(`${this.apiUrl}/api/Users?PageIndex=0&PageSize=10`).pipe(
      map(response => {
        const users: IUserResponse[] = response.items.map((item: any) => ({
          id: item.id,
          firstName: item.firstName,
          lastName: item.lastName,
          email: item.email,
          phoneNumber: item.phoneNumber,
          status:item.status
        }));
        return users;
      }));
  }
  deleteUser(user:{id:string}){
    return this.http.delete<any>(this.apiUrl+"/api/Users",{body:user})
  }
}
  

