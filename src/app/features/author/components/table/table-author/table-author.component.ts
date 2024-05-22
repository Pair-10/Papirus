import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtTokenService } from '../../../../../../jwttoken.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../../../shared/components/sidebar/sidebar.component';
import { token } from '../../../../publisher/services/constants';

@Component({
  selector: 'app-table-author',
  standalone: true,
  imports: [CommonModule,SidebarComponent],
  templateUrl: './table-author.component.html',
  styleUrl: './table-author.component.css'
})
export class TableAuthorComponent implements OnInit{
  Users: any[] = [];
  selectedAuthor: any = null;
  filteredUsers: any[] = [];
  constructor(private httpClient: HttpClient,private CommanModule:CommonModule,private JwtTokenService:JwtTokenService) {}

//isim ve soyisim alanlarına göre arama çubuğundan filtreleme işlemi yapar tabloda
filterUsers(event: any): void {
  const searchTerm = event.target.value.trim().toLowerCase(); // Arama terimini küçük harfe dönüştür ve boşlukları temizler
  if (searchTerm !== '') {
    this.filteredUsers = this.Users.filter(user => {
      const fullName = `${user.name.toLowerCase()} ${user.surname.toLowerCase()}`; // İsim ve soyisimleri birleştir
      return fullName.includes(searchTerm); // Birleşik metni arama yapar
    });
  } else {
    this.filteredUsers = [...this.Users];
  }
}

  fetchUsers(): void {
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get('http://localhost:60805/api/Authors?PageIndex=0&PageSize=5', { headers }).subscribe((data: any) => {
          console.log("API Response:", data); // API yanıtını konsola yazdır
         this.Users = data.items; // API yanıtının içinden kullanıcıları alır
         this.filteredUsers = [...this.Users]; // Tüm kullanıcıları filtrelenmiş kullanıcılar listesine kopyalar
     }, error => {
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
