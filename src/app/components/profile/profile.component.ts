import { Component } from '@angular/core';
import { ProfileMainComponent } from '../profile-main/profile-main.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ProfileMainComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
