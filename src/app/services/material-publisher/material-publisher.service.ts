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
  private baseUrl = 'http://localhost:60805/api';
  ngOnInit(): void {
  }

  getMaterialPublisher(materialId: string){
    return this.http.get<any>(`${this.baseUrl}/MaterialPublishers?PageIndex=0&PageSize=10`).pipe(
      map(response => {
        const materialPublisher: Material_publisher[] = response.items.map((item: any) => ({
          publisherId: item.puslisherId,
          materialId: item.materialId
        }));
        return materialPublisher.filter(publisher => publisher.materialId === materialId);
      })
    );
  }
  setMaterialPublisher(materialId: string, publisherId: string){
    const body = {
      materialId : materialId,
      puslisherId : publisherId
    }
    return this.http.post<any>(`${this.baseUrl}/MaterialPublishers`, body)
  }
}
