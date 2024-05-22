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
  filteredUsers: any[] = [];
  
  constructor
  (
    private httpClient: HttpClient,private CommanModule:CommonModule,
    private JwtTokenService:JwtTokenService
  ) {}
  

filterUsers(event: any): void {
  const searchTerm = event.target.value || ''; 
  if (searchTerm.trim() !== '') {
    this.filteredUsers = this.Users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } else {
    this.filteredUsers = [...this.Users];
  }
}

  fetchUsers(): void {
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get('http://localhost:60805/api/Publishers?PageIndex=0&PageSize=10', { headers }).subscribe
      ((data: any) =>
       {
          console.log("API Response:", data); 
         this.Users = data.items; 
         this.filteredUsers = [...this.Users]; 
         },
         error => 
         {
        console.error("Error fetching users:", error); 
      });
  }


  openModal(author: any) {
    this.selectedAuthor = author;
  }

  ngOnInit(): void {
      this.fetchUsers();
      this.filteredUsers = [...this.Users];
  }
}
