import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Magazine } from './../../models/magazine/magazine';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { jwtToken } from '../../jwttoken';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  // Örnek dergi verileri
  private magazines: Magazine[] = [
    
  ];
  private categories = [
    { id: "1", name: 'Gunluk' },
    { id: "2", name: 'Bilim' },
    { id: "3", name: 'Belgesel' },
    { id: "4", name: 'Siyaset' },
    { id: "5", name: 'Magazin' },
    // Daha fazla kitap kategorisi ekleyebilirsiniz
  ];

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:60805/api';

  // Dergileri döndürür
  getMagazines(): Observable<Magazine[]> {
    return this.http.get<any>(`${this.baseUrl}/Magazines?PageIndex=0&PageSize=10`).pipe(
        map(response => {
            const magazines: Magazine[] = response.items.map((item: any) => ({
                id: item.id,
                categoryId: item.categoryId,
                issn: item.issn,
                issue: item.issue,
                materialId: item.materialId
            }));
            return magazines;
        })
    );
}
setMagazines(magazine:any){
  const magazines = {
    categoryId : magazine.categoryId,
    issn: magazine.issn,
    issue: magazine.issue,
    materialId: magazine.materialId
  }
  return this.http.post<any>(`${this.baseUrl}/Magazines`,magazines)
}


}
