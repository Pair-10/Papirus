import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Material } from '../../models/material/material';
import { jwtToken } from '../../jwttoken';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:60805/api';
  getCategoryTypes(): Observable<any[]> {
    return this.http.get<any>(`${this.baseUrl}/Materials?PageIndex=0&PageSize=10`).pipe(
      map(response => {
        return response.items;
      })
    );
    }
  
    getMaterialsByMaterialId(materialId: string): Observable<Material> {
      return this.http.get<any>(`${this.baseUrl}/Materials/${materialId}`).pipe(
        map(response => {
          const material: Material = {
            id: response.id,
            language: response.language,
            publicationDate: response.publicationDate,
            pageCount: response.pageCount,
            materialName: response.materialName,
            quantity: response.quantity,
            status: response.status,
          };
          return material;
        })
      );
    }
}
