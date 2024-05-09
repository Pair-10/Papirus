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
  selectedAuthor: any = null;//
  filteredUsers: any[] = [];////
  constructor(private httpClient: HttpClient,private CommanModule:CommonModule,private JwtTokenService:JwtTokenService) {}

////
filterUsers(event: any): void {
  const searchTerm = event.target.value.trim().toLowerCase(); // Arama terimini küçük harfe dönüştür ve boşlukları temizle
  if (searchTerm !== '') {
    this.filteredUsers = this.Users.filter(user => {
      const fullName = `${user.name.toLowerCase()} ${user.surname.toLowerCase()}`; // İsim ve soyisimleri birleştir
      return fullName.includes(searchTerm); // Birleşik metni arama terimine göre kontrol et
    });
  } else {
    this.filteredUsers = [...this.Users];
  }
}

  ////



  fetchUsers(): void {
      // const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA"; // JWT token
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get('http://localhost:60805/api/Authors?PageIndex=0&PageSize=10', { headers }).subscribe((data: any) => {
          console.log("API Response:", data); // API yanıtını konsola yazdır
         this.Users = data.items; // API yanıtının içinden 'items' adlı öğeyi kullanarak kullanıcıları al
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
