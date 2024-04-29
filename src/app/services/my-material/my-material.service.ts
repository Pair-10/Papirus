import { MyBorrowedMaterials } from './../../models/my-borrowed-materials/borrowed-materials';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyMaterialService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:60805/api';

  getMyMaterials(userId: string): Observable<MyBorrowedMaterials[]> {
    return this.http.get<any>(`${this.baseUrl}/BorrowedMaterials?PageIndex=0&PageSize=50`).pipe(
      map(response => {
        const borrowedMaterials: MyBorrowedMaterials[] = response.items.map((item: any) => ({
          id: item.id,
          deadline: new Date(item.deadline),
          materialId: item.materialId,
          userId: item.userId,
          isReturned: item.isReturned
        }));
        return borrowedMaterials.filter((item: MyBorrowedMaterials) => item.userId === userId);
      })
    );
  }
  
  
}
