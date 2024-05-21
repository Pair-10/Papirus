import { Component, ElementRef, Renderer2 } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { SidebarAdminComponent } from '../../../../shared/components/sidebar-admin/sidebar-admin.component';
import { FormFirstComponent } from '../../components/forms/form-first/form-first.component';
import { FormSecondComponent } from '../../components/forms/form-second/form-second.component';
import { TableComponent } from '../../components/table/table/table.component';
import { TablePenaltyAdminComponent } from '../../components/table-penalty-admin/table-penalty-admin.component';
 @Component({
   selector: 'app-penalty-admin',
   standalone: true,
  imports: [NavbarComponent,SidebarAdminComponent,FormFirstComponent,FormSecondComponent,TableComponent,TablePenaltyAdminComponent],
   templateUrl: './penalty-admin.component.html',
   styleUrls: ['./penalty-admin.component.css'],
 })
 export class PenaltyAdminComponent {
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

