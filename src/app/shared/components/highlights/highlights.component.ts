import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';

@Component({
  selector: 'app-highlights',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './highlights.component.html',
  styleUrl: './highlights.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HighlightsComponent  {
  @HostListener('window:resize')
onResize() {
    this.getScreenWidth(); // getScreenWidth fonksiyonunu çağır
}
  slidesPerView: number = 3;
  slides = [
    { id: 1, imageUrl: 'https://picsum.photos/600?random=1' },
    { id: 2, imageUrl: 'https://picsum.photos/600?random=2' },
    { id: 3, imageUrl: 'https://picsum.photos/600?random=3' },
    { id: 4, imageUrl: 'https://picsum.photos/600?random=4' },
    { id: 5, imageUrl: 'https://picsum.photos/600?random=5' },
  ];
  screenWidth!: number;

getScreenWidth() {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth >= 320 && this.screenWidth <= 610) {
        this.slidesPerView = 1;
    } else if (this.screenWidth >= 610 && this.screenWidth <= 900) {
        this.slidesPerView = 2;
    } else if (this.screenWidth >= 900 && this.screenWidth <= 1200) {
        this.slidesPerView = 3;
    }
}
}

