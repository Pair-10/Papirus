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
  private baseUrl = 'http://localhost:60805/api';

  ngOnInit(): void {
  }

  

  getBooks(): Observable<Book[]> {
    return this.http.get<any>(`${this.baseUrl}/Books?PageIndex=0&PageSize=1000`).pipe(
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

  setBooks(book:any){
    const books = {
      categoryId : book.categoryId,
      isbn : book.isbn,
      materialId: book.materialId
    }
    return this.http.post<any>(`${this.baseUrl}/Books`,books)
  }
  deleteBook(book: any){
    return this.http.delete<any>(`${this.baseUrl}/Books/${book.id}`)
  }

  getBook(){
    return this.http.get<any>(`${this.baseUrl}/Books?PageIndex=0&PageSize=1000`)
  }
  
}
