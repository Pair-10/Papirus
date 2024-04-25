import { Component } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
@Component({
  selector: 'app-help',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent {
 // Bu değişken şu anda açık olan accordion panelinin index'ini tutar.
 openAccordionIndex: number | null = null;

 // Bu metod belirli bir accordion panelini açar veya kapatır.
 toggleAccordion(index: number): void {
   this.openAccordionIndex = this.openAccordionIndex === index ? null : index;
 }
}
