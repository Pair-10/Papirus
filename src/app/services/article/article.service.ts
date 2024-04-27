import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Article } from './../../models/article/article';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { jwtToken } from '../../jwttoken';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {

  constructor(private http:HttpClient) {}
  token = jwtToken.jwt;
  private baseUrl = 'http://localhost:60805/api';


  // Makaleleri döndürür
  getArticles(): Observable<Article[]> {
    const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
    return this.http.get<any>(`${this.baseUrl}/Articles?PageIndex=0&PageSize=10`, { headers }).pipe(
      map( response =>{
        const articles: Article[] = response.items.map((item: any) => ({
          id: item.id,
          categoryId: item.categoryId,
          materialId: item.materialId
        }));
        return articles;
      })
    )
  }

 
}
