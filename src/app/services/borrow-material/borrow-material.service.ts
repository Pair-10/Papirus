import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BorrowMaterialService {
  private baseUrl = 'http://localhost:60805/api';
  constructor(private http: HttpClient) { }

  borrowMaterialService(material: any): Observable<any> {
    const body = {
      materialId : material.material,
      userId: material.user,
      deadline: material.selectedDate
    }
    return this.http.post(`${this.baseUrl}/BorrowedMaterials?PageIndex=0&PageSize=20`, body);
  }
  updateBorrowedMaterial(borrowedMaterial: any){
    const updatedData = {
      id: borrowedMaterial.id,
      materialId: borrowedMaterial.materialId,
      userId: borrowedMaterial.userId,
      isReturned: borrowedMaterial.isReturned,
      deadline: borrowedMaterial.deadline
    }
    return this.http.put(`${this.baseUrl}/BorrowedMaterials`, updatedData);
  }
}
