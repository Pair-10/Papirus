import { Article } from './../../models/article/article';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  // Örnek makale verileri
  private articles: Article[] = [
    
  ];
  private categories = [
    { id: "1", name: 'Derleme' },
    { id: "2", name: 'Bilim' },
    { id: "3", name: 'Edebi' },
    { id: "4", name: 'Gazete' },
    { id: "5", name: 'Arastirma' },
    // Daha fazla kitap kategorisi ekleyebilirsiniz
  ];

  constructor() {}


  getCategories(): Observable<{ id: string; name: string }[]> {
    return of(this.categories);
  }

  // Makaleleri döndürür
  getArticles(): Observable<Article[]> {
    return of(this.articles);
  }

  // Belirli bir kategoriye ait makaleleri döndürür
  getArticlesByCategory(categoryId: string): Observable<Article[]> {
    const filteredArticles = this.articles.filter(article => article.categoryId === categoryId);
    return of(filteredArticles);
  }
}
