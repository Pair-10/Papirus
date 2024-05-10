import { Publisher } from './../../models/publisher/publisher';
import { Injectable } from '@angular/core';
import { jwtToken } from '../../jwttoken';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:60805/api';
  ngOnInit(): void {
  }

  getPublisher(publisherId: string){
    return this.http.get<any>(`${this.baseUrl}/Publishers?PageIndex=0&PageSize=20`).pipe(
      map(response => {
        const publisher: Publisher[] = response.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          surname: item.surname,
          bio: item.bio,
          website: item.webSite
        }));
        return publisher.filter(publisher => publisher.id === publisherId);
      })
    );
  }
  getPublishers(){
    return this.http.get<any>(`${this.baseUrl}/Publishers?PageIndex=0&PageSize=20`)
  }
  
}
