import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
 @Component({
   selector: 'app-penalty',
   standalone: true,
  imports: [NavbarComponent,SidebarComponent],
   templateUrl: './penalty.component.html',
   styleUrls: ['./penalty.component.css'],
 })
 export class PenaltyComponent {
   constructor(private renderer: Renderer2, private el: ElementRef) {}

   toggleSidebar(): void {
     const sidebar = this.el.nativeElement.querySelector('#default-sidebar');
     if (sidebar) {
       this.renderer.addClass(sidebar, '-translate-x-full');
       this.renderer.removeClass(sidebar, 'translate-x-0');
     }
   }
 }
 const colors = ['bg-blue-900', 'bg-gray-700', 'bg-white']; 



 let currentColorIndex = 0;
 
 function changeColor() {
   const element = document.getElementById('animatedDiv');
   if (element) {
     // Mevcut rengi kaldır
     element.classList.remove(colors[currentColorIndex]);
 
     // Renk dizisinde bir sonraki renge geç
     currentColorIndex = (currentColorIndex + 1) % colors.length;
 
     // Yeni rengi ekle
     element.classList.add(colors[currentColorIndex]);
   }
 }
 
 // Her 2 saniyede bir rengi değiştir
 setInterval(changeColor, 2000);
 
 