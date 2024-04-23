import { Magazine } from './../../models/magazine/magazine';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MagazineService {
  // Örnek dergi verileri
  private magazines: Magazine[] = [
    
  ];
  private categories = [
    { id: "1", name: 'Gunluk' },
    { id: "2", name: 'Bilim' },
    { id: "3", name: 'Belgesel' },
    { id: "4", name: 'Siyaset' },
    { id: "5", name: 'Magazin' },
    // Daha fazla kitap kategorisi ekleyebilirsiniz
  ];

  constructor() { }

  getCategories(): Observable<{ id: string; name: string }[]> {
    return of(this.categories);
  }

  // Dergileri döndürür
  getMagazines(): Observable<Magazine[]> {
    return of(this.magazines);
  }

  // Belirli bir kategoriye ait dergileri döndürür
  getMagazinesByCategory(categoryId: string): Observable<Magazine[]> {
    const filteredMagazines = this.magazines.filter(
      (magazine) => magazine.categoryId === categoryId
    );
    return of(filteredMagazines);
  }
}
