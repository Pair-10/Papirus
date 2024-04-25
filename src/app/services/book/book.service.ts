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
>>>>>>>>> Temporary merge branch 2
  ];

  private books: Book[] = [
    {
      id: "234",
      materialName: 'Kitap 1',
      materialImage: 'https://picsum.photos/100?random=1',
      author: 'Yazar 1',
      categoryId: "3",
      isbn: '1234567890',
    },
    {
      id: "123",
      materialName: 'Kitap 2',
      materialImage: 'https://picsum.photos/100?random=2',
      author: 'Yazar 2',
      categoryId: "5",
      isbn: '0987654321',
    },
    {
      id: "321",
      materialName: 'Kitap 3',
      materialImage: 'https://picsum.photos/100?random=3',
      author: 'Yazar 3',
      categoryId: "2",
      isbn: '5678901234',
    },
    {
      id: "454",
      materialName: 'Kitap 4',
      materialImage: 'https://picsum.photos/100?random=4',
      author: 'Yazar 4',
      categoryId: "1",
      isbn: '9876543210',
    },
    {
      id: "5342",
      materialName: 'Kitap 5',
      materialImage: 'https://picsum.photos/100?random=5',
      author: 'Yazar 5',
      categoryId: "4",
      isbn: '2468101214',
    },
    {
      id: "653",
      materialName: 'Kitap 6',
      materialImage: 'https://picsum.photos/100?random=6',
      author: 'Yazar 6',
      categoryId: "1",
      isbn: '1357911131',
    },
    {
      id: "754",
      materialName: 'Kitap 7',
      materialImage: 'https://picsum.photos/100?random=7',
      author: 'Yazar 7',
      categoryId: "3",
      isbn: '9753109753',
    },
    {
      id: "852",
      materialName: 'Kitap 8',
      materialImage: 'https://picsum.photos/100?random=8',
      author: 'Yazar 8',
      categoryId: "4",
      isbn: '8529637410',
    },
    {
      id: "954",
      materialName: 'Kitap 9',
      materialImage: 'https://picsum.photos/100?random=9',
      author: 'Yazar 9',
      categoryId: "2",
      isbn: '9638527410',
    },
    {
      id: "1056",
      materialName: 'Kitap 10',
      materialImage: 'https://picsum.photos/100?random=10',
      author: 'Yazar 10',
      categoryId: "5",
      isbn: '3216549870',
    }

  ];

  constructor() { }

  // Tüm kitap kategorilerini döndürür
  getCategories(): Observable<{ id: string; name: string }[]> {
    return of(this.categories);
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
