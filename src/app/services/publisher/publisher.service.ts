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
  token = jwtToken.jwt;
  private baseUrl = 'http://localhost:60805/api';
  ngOnInit(): void {
  }

  getPublisher(publisherId: string){
    const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
    return this.http.get<any>(`${this.baseUrl}/Publishers?PageIndex=0&PageSize=10`, { headers }).pipe(
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


}
