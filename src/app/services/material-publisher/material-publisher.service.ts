import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtToken } from '../../jwttoken';
import { map } from 'rxjs';
import { Material_publisher } from '../../models/material-publisher/material-publisher';

@Injectable({
  providedIn: 'root'
})
export class MaterialPublisherService {

  constructor(private http: HttpClient) { }
  token = jwtToken.jwt;
  private baseUrl = 'http://localhost:60805/api';
  ngOnInit(): void {
  }

  getMaterialPublisher(materialId: string){
    const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
    return this.http.get<any>(`${this.baseUrl}/MaterialPublishers?PageIndex=0&PageSize=10`, { headers }).pipe(
      map(response => {
        const materialPublisher: Material_publisher[] = response.items.map((item: any) => ({
          publisherId: item.puslisherId,
          materialId: item.materialId
        }));
        return materialPublisher.filter(publisher => publisher.materialId === materialId);
      })
    );
  }

}
