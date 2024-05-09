import { Author } from './../../models/author/author';
import { Injectable } from '@angular/core';
import { jwtToken } from '../../jwttoken';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'http://localhost:60805/api';
  ngOnInit(): void {
  }

  getAuthor(authorId: string){
    return this.http.get<any>(`${this.baseUrl}/Authors?PageIndex=0&PageSize=20`).pipe(
      map(response => {
        const author: Author[] = response.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          surname: item.surname,
          bio: item.bio,
          website: item.webSite
        }));
        return author.filter(author => author.id === authorId);
      })
    );
  }
  getAuthors(){
    return this.http.get<any>(`${this.baseUrl}/Authors?PageIndex=0&PageSize=20`)
  }

}
