import { Component, ElementRef, Renderer2 } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { TableAuthorComponent } from '../../components/table/table-author/table-author.component';
import { FormAuthorComponent } from '../../components/forms/form-author/form-author.component';
@Component({
  selector: 'app-author',
 standalone: true,

  imports: [SidebarComponent,TableAuthorComponent,FormAuthorComponent],
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent {


  constructor(private renderer: Renderer2, private el: ElementRef) {}

  toggleSidebar(): void {
    const sidebar = this.el.nativeElement.querySelector('#default-sidebar');
    if (sidebar) {
      this.renderer.addClass(sidebar, '-translate-x-full');
      this.renderer.removeClass(sidebar, 'translate-x-0');
    }
  }
}
const colors = ['bg-black', 'bg-gray-900', 'bg-white']; 



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

// Her 3 saniyede bir rengi değiştir
setInterval(changeColor, 4000);
