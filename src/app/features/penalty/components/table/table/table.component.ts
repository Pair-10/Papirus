import { Component, OnInit } from '@angular/core';

 import { HttpClient } from '@angular/common/http';
 import { JwtTokenService } from '../../../../../../jwttoken.service';
 import { CommonModule } from '@angular/common';
 import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";
import { token} from '../../../../publisher/services/constants';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  Users: any[] = [];

  constructor(private httpClient: HttpClient,private CommanModule:CommonModule,private JwtTokenService:JwtTokenService) {}


  fetchUsers(): void {
      // const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA"; // JWT token
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get('http://localhost:60805/api/Penalties?PageIndex=0&PageSize=10', { headers }).subscribe((data: any) => {
          console.log("API Response:", data); // API yanıtını konsola yazdır
          this.Users = data.items; // API yanıtının içinden 'items' adlı öğeyi kullanarak kullanıcıları al
      }, error => {
          console.error("Error fetching users:", error); // Hata olursa konsola yazdır
      });
  }
  ngOnInit(): void {
      this.fetchUsers();
  }
}
