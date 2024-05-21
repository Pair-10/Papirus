import { Component,HostListener,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtTokenService } from '../../../../../jwttoken.service';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { token } from '../../../publisher/services/constants';

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
    event.stopPropagation(); // Olayın üst kısımlara yayılmasını engelle
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
  Activities: any[] = [];

     constructor
     (
     private httpClient: HttpClient,private CommanModule:CommonModule,
     private JwtTokenService:JwtTokenService
     ) {}

   
     fetchActivities(): void
      {
         const headers = { Authorization: `Bearer ${token}` };
         this.httpClient.get('http://localhost:60805/api/Activities?PageIndex=0&PageSize=6', { headers }).subscribe
          ((data: any) => 
            {
              console.log("API Response:", data); 
              this.Activities = data.items; // API yanıtının al   
               }, 
              error =>
            {
                  console.error("Error fetching Activities:", error); 
            });
            }
              ngOnInit(): void
      {
            this.fetchActivities();
  }
}
