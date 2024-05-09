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
  Activities: any[] = [];

     constructor(private httpClient: HttpClient,private CommanModule:CommonModule,private JwtTokenService:JwtTokenService) {}

   
     fetchActivities(): void {
        //  const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA"; // JWT tokenin
         const headers = { Authorization: `Bearer ${token}` };
         this.httpClient.get('http://localhost:60805/api/Activities?PageIndex=0&PageSize=6', { headers }).subscribe((data: any) => {
             console.log("API Response:", data); // API yanıtını konsola yazdır
             this.Activities = data.items; // API yanıtının içinden 'items' adlı öğeyi kullanarak kullanıcıları alın
             
         }, error => {
             console.error("Error fetching Activities:", error); // Hata durumunda konsola yazdır
         });
     }
     ngOnInit(): void {
         this.fetchActivities();
     }
}
