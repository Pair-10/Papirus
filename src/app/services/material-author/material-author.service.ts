import { Material_author } from './../../models/material-author/material-author';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { jwtToken } from '../../jwttoken';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaterialAuthorService implements OnInit {

  constructor(private http: HttpClient) { }
  token = jwtToken.jwt;
  private baseUrl = 'http://localhost:60805/api';
  ngOnInit(): void {
  }

  getMaterialAuthors(materialId: string){
    const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
    return this.http.get<any>(`${this.baseUrl}/MaterialAuthors?PageIndex=0&PageSize=10`, { headers }).pipe(
      map(response => {
        const materialAuthor: Material_author[] = response.items.map((item: any) => ({
          authorId: item.authorId,
          materialId: item.materialId
        }));
        return materialAuthor.filter(author => author.materialId === materialId);
      })
    );
  }


}
