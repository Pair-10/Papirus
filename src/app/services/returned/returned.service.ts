import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReturnedService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:60805/api';

  setReturned(returnValue: any){
    const veri = {
      userId: returnValue.userId,
      borrowedMaterialId: returnValue.id,
      isPenalised: true
    }
    return this.http.post(`${this.baseUrl}/Returneds`, veri);
  }
}
