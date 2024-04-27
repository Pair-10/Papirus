import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, map, of, switchMap, tap, toArray } from 'rxjs';
import { Book } from './../../models/book/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtToken } from '../../jwttoken';

@Injectable({
  providedIn: 'root',
})
export class BookService implements OnInit {



  constructor(private http: HttpClient) { }
  token = jwtToken.jwt;
  private baseUrl = 'http://localhost:60805/api';

  ngOnInit(): void {
  }

  

  // Tüm kitapları döndürür
  getBooks(): Observable<Book[]> {
    const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
    return this.http.get<any>(`${this.baseUrl}/Books?PageIndex=0&PageSize=10`, { headers }).pipe(
      map(response => {
        const books: Book[] = response.items.map((item: any) => ({
          id: item.id,
          categoryId: item.categoryId,
          isbn: item.isbn,
          materialId: item.materialId
        }));
        return books;
      })
    );
  }

  
    /*const category = this.categories.find(cat => cat.id === categoryId);
    const filteredBooks = this.books.filter(book => book.categoryId === categoryId);

    return of({
      category: category ? category.name : 'Kategori bulunamadı',
      books: filteredBooks,
    });*/
  
}
