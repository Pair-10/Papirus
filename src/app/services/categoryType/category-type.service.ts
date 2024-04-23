import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtToken } from '../../jwttoken';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryTypeService {

  constructor( private http: HttpClient) {}

    token = jwtToken.jwt;
    private baseUrl = 'http://localhost:60805/api';


    getCategoryTypes(){
      const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
      const url = `${this.baseUrl}/CategoryTypes?PageIndex=0&PageSize=10`;
      return this.http.get<any>(url, {headers})
    }
    getCategoryType(materialId: string, categoryId: string): Observable<any[]> {
      const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
      const url = `${this.baseUrl}/CategoryTypes?PageIndex=0&PageSize=10`;
      return this.http.get<any>(url, { headers }).pipe(
        map(veri => {
          const filteredItems = veri.items.filter((item: any) =>
            item.materialId === materialId && item.categoryId === categoryId
          );
          return filteredItems;
        })
      );
    }
}
