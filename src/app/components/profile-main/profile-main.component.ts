import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ProfileEditComponent } from '../profile-edit/profile-edit.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-main',
  standalone: true,
  imports: [SidebarComponent,ProfileEditComponent,RouterOutlet,RouterLink,CommonModule],
  templateUrl: './profile-main.component.html',
  styleUrl: './profile-main.component.css'
})

export class ProfileMainComponent {
  @Output() veriYollama: EventEmitter<string> = new EventEmitter<string>();
  veriAl(veri: string) {
    console.log('Üst bileşene gelen veri:', veri);
  }

}
