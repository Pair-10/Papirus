import { Component, OnInit } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { JwtTokenService } from '../../../../../jwttoken.service';
  import { CommonModule } from '@angular/common';
  import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
  import{token} from'../../services/constants';

@Component({
  selector: 'app-table-publisher',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './table-publisher.component.html',
  styleUrl: './table-publisher.component.css'
})
export class TablePublisherComponent implements OnInit{
  Users: any[] = [];
  selectedAuthor: any = null;
  searchTerm: string = ''
  filteredUsers: any[] = [];////
  
  constructor(private httpClient: HttpClient,private CommanModule:CommonModule,private JwtTokenService:JwtTokenService) {}
  
////
filterUsers(event: any): void {
  const searchTerm = event.target.value || ''; // 'event.target.value' null olabilir, bu yüzden null check yap
  if (searchTerm.trim() !== '') {
    this.filteredUsers = this.Users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    this.filteredUsers = [...this.Users];
  }
}

  ////


  fetchUsers(): void {
      // const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDc0MDQ3NywiZXhwIjoxNzE0ODAwNDc3LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.MQO3qNj0-2d4xrtSUF-xu1ocLzlp5tPZ6lui5sMi1qIGMk4JIyrLFqo7rJrd9N1F8aLl-KkDhpBQwsPsNY84cA"; // JWT token
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get('http://localhost:60805/api/Publishers?PageIndex=0&PageSize=10', { headers }).subscribe((data: any) => {
          console.log("API Response:", data); // API yanıtını konsola yazdır
         this.Users = data.items; // API yanıtının içinden 'items' adlı öğeyi kullanarak kullanıcıları alın
         this.filteredUsers = [...this.Users]; // Tüm kullanıcıları filtrelenmiş kullanıcılar listesine kopyala////
     }, error => {
          console.error("Error fetching users:", error); // Hata durumunda konsola yazdır
      });
  }


  openModal(author: any) {//
    this.selectedAuthor = author;//
  }//

  ngOnInit(): void {
      this.fetchUsers();
      this.filteredUsers = [...this.Users];////
  }
}
