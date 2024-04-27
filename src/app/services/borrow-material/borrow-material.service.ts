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
    return this.http.post(`${this.baseUrl}/BorrowedMaterials`, body);
  }
}
