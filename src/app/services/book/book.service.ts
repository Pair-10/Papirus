import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, map, of, switchMap, tap, toArray } from 'rxjs';
import { Book } from './../../models/book/book';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { jwtToken } from '../../jwttoken';

@Injectable({
  providedIn: 'root',
})
export class BookService implements OnInit {
  private categories = [
    { id: "1", name: 'Roman' },
    { id: "2", name: 'Bilimkurgu' },
    { id: "3", name: 'Biyografi' },
    { id: "4", name: 'Tarih' },
    { id: "5", name: 'Felsefe' },
  ];



  constructor(private http: HttpClient) { }
  token = jwtToken.jwt;
  private baseUrl = 'http://localhost:60805/api';

getCategories(): Observable<{ id: string; name: string }[]> {
  return of(this.categories);
}
  ngOnInit(): void {
    this.getCategories();
  }

  getMaterialTypeBook(materialTypeName: string): Observable<any[]> {
    const headers = this.token ? new HttpHeaders().set('Authorization', 'Bearer ' + this.token) : new HttpHeaders();
    return this.http.get<any>(`${this.baseUrl}/MaterialTypes?PageIndex=0&PageSize=10`, { headers }).pipe(
        switchMap((response: any) => {
            const itemsArray = response.items; // items dizisini al
            // materialTypeName ile eşleşen öğeyi bul
            const foundItem = itemsArray.find((item: any) => item.name === materialTypeName);
            // Bulunan öğeyi dizi içine al
            const resultArray = foundItem ? [foundItem] : [];
            // Diziyi Observable ile döndür
            return of(resultArray);
        })
    );
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
