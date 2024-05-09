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
    getMaterial(){
      return this.http.get<any>(`${this.baseUrl}/Materials?PageIndex=0&PageSize=20`).pipe(
        map(response =>{
          return response
        })
      )
    }
    setMaterial(material: any){
      const materialData = {
        materialName: material.materialName,
        quantity: material.quantity,
        language: material.language,
        pageCount: material.pageCount,
        status: material.status,
        publicationDate: material.publicationDate,
      }
      return this.http.post<any>(`${this.baseUrl}/Materials`,materialData)
    }
    updateMaterial(material: any){
      const updateData = {
        id: material.id,
        publicationDate: material.publicationDate,
        language: material.language,
        pageCount: material.pageCount,
        status: material.status,
        materialName: material.materialName,
        quantity: material.quantity
      }
      return this.http.put<any>(`${this.baseUrl}/Materials`,updateData)
    }
    deleteMaterial(material: any){
      return this.http.delete<any>(`${this.baseUrl}/Materials/${material.id}`)
    }

    getMaterialDynamic(value: string){
      const body = {
        sort: [
          {
            field: 'MaterialName',
            dir: 'asc'
          }
        ],
        filter: {
          field: 'MaterialName',
          operator: 'contains',
          value: value,
          logic: 'and',
          filters: []
        }
      };
      return this.http.post<any>(`${this.baseUrl}/Materials/dynamic?PageIndex=0&PageSize=50`,body)
    }
}
