import { Magazine } from './../../models/magazine/magazine';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  // Örnek dergi verileri
  private magazines: Magazine[] = [
    {
      id: 1,
      materialName: 'Dergi 1',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar A',
      categoryId: 4,
      issn: '1234-5678',
      issue: 'Ocak',
  },
  {
      id: 2,
      materialName: 'Dergi 2',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar B',
      categoryId: 1,
      issn: '8765-4321',
      issue: 'Şubat',
  },
  {
      id: 3,
      materialName: 'Dergi 3',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar C',
      categoryId: 5,
      issn: '1357-2468',
      issue: 'Mart',
  },
  {
      id: 4,
      materialName: 'Dergi 4',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar D',
      categoryId: 2,
      issn: '8642-1357',
      issue: 'Nisan',
  },
  {
      id: 5,
      materialName: 'Dergi 5',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar E',
      categoryId: 3,
      issn: '7890-1234',
      issue: 'Mayıs',
  },
  {
      id: 6,
      materialName: 'Dergi 6',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar F',
      categoryId: 4,
      issn: '4321-8765',
      issue: 'Haziran',
  },
  {
      id: 7,
      materialName: 'Dergi 7',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar G',
      categoryId: 2,
      issn: '1234-8765',
      issue: 'Temmuz',
  },
  {
      id: 8,
      materialName: 'Dergi 8',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar H',
      categoryId: 1,
      issn: '5678-1234',
      issue: 'Ağustos',
  },
  {
      id: 9,
      materialName: 'Dergi 9',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar I',
      categoryId: 5,
      issn: '2468-9753',
      issue: 'Eylül',
  },
  {
      id: 10,
      materialName: 'Dergi 10',
      materialImage: 'https://picsum.photos/100',
      author: 'Yazar J',
      categoryId: 3,
      issn: '9753-2468',
      issue: 'Ekim',
  }
  ];
  private categories = [
    { id: 1, name: 'Gunluk' },
    { id: 2, name: 'Bilim' },
    { id: 3, name: 'Belgesel' },
    { id: 4, name: 'Siyaset' },
    { id: 5, name: 'Magazin' },
    // Daha fazla kitap kategorisi ekleyebilirsiniz
  ];

  constructor() {}

  getCategories(): Observable<{ id: number; name: string }[]> {
    return of(this.categories);
  }

  // Dergileri döndürür
  getMagazines(): Observable<Magazine[]> {
    return of(this.magazines);
  }

  // Belirli bir kategoriye ait dergileri döndürür
  getMagazinesByCategory(categoryId: number): Observable<Magazine[]> {
    const filteredMagazines = this.magazines.filter(magazine => magazine.categoryId === categoryId);
    return of(filteredMagazines);
  }
}