import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from './../../models/book/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private categories = [
    { id: 1, name: 'Roman' },
    { id: 2, name: 'Bilimkurgu' },
    { id: 3, name: 'Biyografi' },
    { id: 4, name: 'Tarih' },
    { id: 5, name: 'Felsefe' },
    // Daha fazla kitap kategorisi ekleyebilirsiniz
  ];

  private books: Book[] = [
    {
      id: 1,
      materialName: 'Kitap 1',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 1',
      categoryId: 3,
      isbn: '1234567890',
  },
  {
      id: 2,
      materialName: 'Kitap 2',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 2',
      categoryId: 5,
      isbn: '0987654321',
  },
  {
      id: 3,
      materialName: 'Kitap 3',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 3',
      categoryId: 2,
      isbn: '5678901234',
  },
  {
      id: 4,
      materialName: 'Kitap 4',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 4',
      categoryId: 1,
      isbn: '9876543210',
  },
  {
      id: 5,
      materialName: 'Kitap 5',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 5',
      categoryId: 4,
      isbn: '2468101214',
  },
  {
      id: 6,
      materialName: 'Kitap 6',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 6',
      categoryId: 1,
      isbn: '1357911131',
  },
  {
      id: 7,
      materialName: 'Kitap 7',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 7',
      categoryId: 3,
      isbn: '9753109753',
  },
  {
      id: 8,
      materialName: 'Kitap 8',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 8',
      categoryId: 4,
      isbn: '8529637410',
  },
  {
      id: 9,
      materialName: 'Kitap 9',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 9',
      categoryId: 2,
      isbn: '9638527410',
  },
  {
      id: 10,
      materialName: 'Kitap 10',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar 10',
      categoryId: 5,
      isbn: '3216549870',
  }
    // Daha fazla kitap verisi ekleyebilirsiniz
  ];

  constructor() {}

  // Tüm kitap kategorilerini döndürür
  getCategories(): Observable<{ id: number; name: string }[]> {
    return of(this.categories);
  }

  // Tüm kitapları döndürür
  getBooks(): Observable<Book[]> {
    return of(this.books);
  }

  // Belirli bir kategoriye ait kitapları döndürür
  getBooksByCategory(categoryId: number): Observable<{ category: string; books: Book[] }> {
    const category = this.categories.find(cat => cat.id === categoryId);
    const filteredBooks = this.books.filter(book => book.categoryId === categoryId);

    return of({
      category: category ? category.name : 'Kategori bulunamadı',
      books: filteredBooks,
    });
  }
}
