import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of, switchMap } from 'rxjs';
import { jwtToken } from '../../jwttoken';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
private baseUrl = 'http://localhost:60805/api';


getCategoriess(): Observable<any[]> {
return this.http.get<any>('http://localhost:60805/api/Categories?PageIndex=0&PageSize=10').pipe(
  map(response => response.items)
);
}

getCategoryTypes(): Observable<any[]> {
return this.http.get<any>(`${this.baseUrl}/CategoryTypes?PageIndex=0&PageSize=10`).pipe(
  map(response => {
    return response.items
  })
);
}

getMaterialTypes(materialTypeId: string): Observable<any[]> {
return this.http.get<any>(`${this.baseUrl}/MaterialTypes?PageIndex=0&PageSize=10&MaterialTypeId=${materialTypeId}`).pipe(
  map(response => response.items)
);
}
getMaterialTypeNames(){
  return this.http.get<any>(`${this.baseUrl}/MaterialTypes?PageIndex=0&PageSize=20`)
}

setCategoryTypes(materialId:any,categoryId:any,materialTypeId:any){
  const body ={
    materialId: materialId,
    categoryId : categoryId,
    materialTypeId: materialTypeId
  }
  return this.http.post<any>(`${this.baseUrl}/CategoryTypes`, body);
}

getMaterialType(materialTypeName: string): Observable<any[]> {
  return this.http.get<any>(`${this.baseUrl}/MaterialTypes?PageIndex=0&PageSize=10`).pipe(
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
