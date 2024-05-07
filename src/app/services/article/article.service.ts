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
  private baseUrl = 'http://localhost:60805/api';


  getArticles(): Observable<Article[]> {
    return this.http.get<any>(`${this.baseUrl}/Articles?PageIndex=0&PageSize=10`).pipe(
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
  setArticles(article:any){
    const articles = {
      categoryId : article.categoryId,
      materialId: article.materialId,
      publictionName: article.publicationName
    }
    return this.http.post<any>(`${this.baseUrl}/Articles`,articles)
  }
  deleteArticle(article: any){
    return this.http.delete<any>(`${this.baseUrl}/Articles/${article.id}`)
  }
  getArticle(){
    return this.http.get<any>(`${this.baseUrl}/Articles?PageIndex=0&PageSize=50`)
  }
}
