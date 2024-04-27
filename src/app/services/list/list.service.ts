import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { jwtToken } from '../../jwttoken';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
token = jwtToken.jwt
private baseUrl = 'http://localhost:60805/api';


getCategoriess(): Observable<any[]> {
const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
return this.http.get<any>('http://localhost:60805/api/Categories?PageIndex=0&PageSize=10', { headers }).pipe(
  map(response => response.items)
);
}

getCategoryTypes(): Observable<any[]> {
const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
return this.http.get<any>(`${this.baseUrl}/CategoryTypes?PageIndex=0&PageSize=10`, { headers }).pipe(
  map(response => response.items)
);
}

getMaterialTypes(materialTypeId: string): Observable<any[]> {
const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
return this.http.get<any>(`${this.baseUrl}/MaterialTypes?PageIndex=0&PageSize=10&MaterialTypeId=${materialTypeId}`, { headers }).pipe(
  map(response => response.items)
);
}
getMaterialType(materialTypeName: string): Observable<any[]> {
  const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
  return this.http.get<any>(`${this.baseUrl}/MaterialTypes?PageIndex=0&PageSize=10`, { headers }).pipe(
      switchMap((response: any) => {
          const itemsArray = response.items; // items dizisini al
          // materialTypeName ile eşleşen öğeyi bul
          const foundItem = itemsArray.find((item: any) => item.name === materialTypeName);
          // Bulunan öğeyi dizi içine al
          const resultArray = foundItem ? [foundItem] : [];
          // Diziyi Observable ile döndür
          return of(resultArray);
      })
  );
}
}
