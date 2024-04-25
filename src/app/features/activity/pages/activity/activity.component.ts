import { Component,HostListener } from '@angular/core';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [SidebarComponent,CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.css'
})
export class ActivityComponent {
  selectedIndex: number | null = null;

  toggleSelected(event: MouseEvent, index: number): void {
    event.stopPropagation(); // Olayın üst elementlere yayılmasını engelle
    this.selectedIndex = this.selectedIndex === index ? null : index;
  }

  clearSelection(): void {
    this.selectedIndex = null;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: any): void {
    if (!event.target.closest('.card-container')) {
      this.clearSelection();
    }
  }
}
