import { Article } from './../../models/article/article';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  // Örnek makale verileri
  private articles: Article[] = [
    { id: 1, materialName: 'Makale 1', materialImage: 'https://picsum.photos/100', author: 'Yazar A', categoryId: 2 },
    { id: 2, materialName: 'Makale 2', materialImage: 'https://picsum.photos/100', author: 'Yazar B', categoryId: 2 },
    // Daha fazla makale verisi
  ];
  private categories = [
    { id: 1, name: 'Derleme' },
    { id: 2, name: 'Bilim' },
    { id: 3, name: 'Edebi' },
    { id: 4, name: 'Gazete' },
    { id: 5, name: 'Arastirma' },
    // Daha fazla kitap kategorisi ekleyebilirsiniz
  ];

  constructor() {}


  getCategories(): Observable<{ id: number; name: string }[]> {
    return of(this.categories);
  }

  // Makaleleri döndürür
  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  // Belirli bir kategoriye ait makaleleri döndürür
  getArticlesByCategory(categoryId: number): Observable<Article[]> {
    const filteredArticles = this.articles.filter(article => article.categoryId === categoryId);
    return of(filteredArticles);
  }
}
