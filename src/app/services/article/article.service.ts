import { Article } from './../../models/article/article';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  // Örnek makale verileri
  private articles: Article[] = [
    { id: 1, materialName: 'Makale 1', materialImage: 'https://picsum.photos/100?random=1', author: 'Yazar A', categoryId: 1 },
    { id: 2, materialName: 'Makale 2', materialImage: 'https://picsum.photos/100?random=2', author: 'Yazar B', categoryId: 1 },
    { id: 3, materialName: 'Makale 3', materialImage: 'https://picsum.photos/100?random=3', author: 'Yazar C', categoryId: 2 },
    { id: 4, materialName: 'Makale 4', materialImage: 'https://picsum.photos/100?random=4', author: 'Yazar D', categoryId: 2 },
    { id: 5, materialName: 'Makale 5', materialImage: 'https://picsum.photos/100?random=5', author: 'Yazar E', categoryId: 3 },
    { id: 6, materialName: 'Makale 6', materialImage: 'https://picsum.photos/100?random=6', author: 'Yazar F', categoryId: 3 },
    { id: 7, materialName: 'Makale 7', materialImage: 'https://picsum.photos/100?random=7', author: 'Yazar G', categoryId: 4 },
    { id: 8, materialName: 'Makale 8', materialImage: 'https://picsum.photos/100?random=8', author: 'Yazar H', categoryId: 4 },
    { id: 9, materialName: 'Makale 9', materialImage: 'https://picsum.photos/100?random=9', author: 'Yazar I', categoryId: 5 },
    { id: 10, materialName: 'Makale 10', materialImage: 'https://picsum.photos/100?random=10', author: 'Yazar J', categoryId: 5 }
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
