import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, signal } from '@angular/core';
import { register, SwiperContainer } from 'swiper/element/bundle';
import { SwiperOptions } from 'swiper/types';

register();
@Component({
  selector: 'app-herosection',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './herosection.component.html',
  styleUrl: './herosection.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HerosectionComponent implements OnInit {
  swiperElement = signal<SwiperContainer | null>(null);
  slides = [
    { id: 1, imageUrl: 'https://picsum.photos/600?random=1' },
    { id: 2, imageUrl: 'https://picsum.photos/600?random=2' },
    { id: 3, imageUrl: 'https://picsum.photos/600?random=3' },
    { id: 4, imageUrl: 'https://picsum.photos/600?random=4' },
    { id: 5, imageUrl: 'https://picsum.photos/600?random=5' },
  ];
  ngOnInit(): void {
    const swiperElementConstructor = document.querySelector('swiper-container');
    const swiperOptions: SwiperOptions = {
      slidesPerView:1,
      autoplay:{
        delay:4000,
      },
      pagination:true,
      navigation:{
        enabled: true,
      }
    };
    Object.assign(swiperElementConstructor!, swiperOptions);
    this.swiperElement.set(swiperElementConstructor as SwiperContainer);
    this.swiperElement()?.initialize();
  }
}
