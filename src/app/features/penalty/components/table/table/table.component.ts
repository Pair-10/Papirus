// import { Component, OnInit } from '@angular/core';

//  import { HttpClient } from '@angular/common/http';
//  import { JwtTokenService } from '../../../../../../jwttoken.service';
//  import { CommonModule } from '@angular/common';
//  import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";
// import { token} from '../../../../publisher/services/constants';

// @Component({
//   selector: 'app-table',
//   standalone: true,
//   imports: [CommonModule,SidebarComponent],
//   templateUrl: './table.component.html',
//   styleUrls: ['./table.component.css']
// })
// export class TableComponent implements OnInit{
//   Users: any[] = [];

//   constructor(private httpClient: HttpClient,private CommanModule:CommonModule,private JwtTokenService:JwtTokenService) {}


//   fetchUsers(): void {
//       // const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA"; // JWT token
//       const headers = { Authorization: `Bearer ${token}` };
//       this.httpClient.get('http://localhost:60805/api/Penalties?PageIndex=0&PageSize=4', { headers }).subscribe((data: any) => {
//           console.log("API Response:", data); // API yanıtını konsola yazdır
//           this.Users = data.items; // API yanıtının içinden 'items' adlı öğeyi kullanarak kullanıcıları al
//       }, error => {
//           console.error("Error fetching users:", error); // Hata olursa konsola yazdır
//       });
//   }
//   ngOnInit(): void {
//       this.fetchUsers();
//   }
// }
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
  filteredUsers: any[] = [];////  
   totalPenaltyPrice: number = 0; // Toplam ceza ücreti
   totalPenaltyDays:number=0;
  constructor(private httpClient: HttpClient,private CommanModule:CommonModule,private JwtTokenService:JwtTokenService) {}
  filterUsers(event: any): void {
    const searchTerm = event.target.value.trim().toLowerCase(); // Arama terimini küçük harfe dönüştür ve boşlukları temizle
    if (searchTerm !== '') {
      this.filteredUsers = this.Users.filter(user =>
        user.userId.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredUsers = [...this.Users];
    }
    this.updateTotalPenaltyPrice();// Filtreleme sonrası toplam tutarı güncelle
    this.updateTotalPenaltyDays();
  }
  updateTotalPenaltyDays(): void {
    this.totalPenaltyDays = 0; // Sıfırla
    this.filteredUsers.forEach(user => {
      this.totalPenaltyDays += user.totalPenaltyDays; // Filtrelenmiş kullanıcıların toplam ceza günlerini topla
    });
  
    // Toplam ceza günlerini tabloya ekleyin
    const totalRow = document.querySelector('tfoot tr');
    if (totalRow) {
      totalRow.children[4].textContent = `${this.totalPenaltyDays}`; // Toplam ceza günlerini güncelle
    } else {
      console.error("Total row element is null.");
    }
  }

  // fetchUsers(): void {
  //     // const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA"; // JWT token
  //     const headers = { Authorization: `Bearer ${token}` };
  //     this.httpClient.get('http://localhost:60805/api/Penalties?PageIndex=0&PageSize=4', { headers }).subscribe((data: any) => {
  //         console.log("API Response:", data); // API yanıtını konsola yazdır
  //         this.Users = data.items; // API yanıtının içinden 'items' adlı öğeyi kullanarak kullanıcıları al
  //         this.filteredUsers = [...this.Users]; // Tüm kullanıcıları filtrelenmiş kullanıcılar listesine kopyala////
  //     }, error => {
  //         console.error("Error fetching users:", error); // Hata olursa konsola yazdır
  //     });
  // }

  updateTotalPenaltyPrice(): void {
    this.totalPenaltyPrice = 0; // Sıfırla
    this.filteredUsers.forEach(user => {
      this.totalPenaltyPrice += user.penaltyPrice; // Filtrelenmiş kullanıcıların ceza tutarlarını topla
    });
  
    // Toplam ceza ücretini tabloya ekleyin
    const totalRow = document.querySelector('tfoot tr');
    if (totalRow) {
      totalRow.children[3].textContent = `${this.totalPenaltyPrice.toFixed(2)}₺`;
    } else {
      console.error("Total row element is null.");
    }
  }


  fetchUsers(): void {
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.get('http://localhost:60805/api/Penalties?PageIndex=0&PageSize=4', { headers }).subscribe((data: any) => {
      console.log("API Response:", data); 
      this.Users = data.items;
      this.filteredUsers = [...this.Users]; 
      this.updateTotalPenaltyPrice(); // Toplam tutarı güncelle
      this.updateTotalPenaltyDays(); // Toplam ceza günlerini güncelle
  
      // Toplam ceza ücretini hesapla
      let totalPenaltyPrice = 0;
      this.Users.forEach(user => {
        totalPenaltyPrice += user.penaltyPrice;
      });
  
      // Toplam ceza ücretini tabloya ekleyin
      const totalRow = document.querySelector('tfoot tr');
      if (totalRow) {
        totalRow.children[3].textContent = `${totalPenaltyPrice.toFixed(2)}₺`;
      } else {
        console.error("Total row element is null.");
      }
  
      // Toplam ceza günlerini hesapla
      let totalPenaltyDays = 0;
      this.Users.forEach(user => {
        totalPenaltyDays += user.totalPenaltyDays;
      });
  
      // Toplam ceza günlerini tabloya ekleyin
      if (totalRow) {
        totalRow.children[4].textContent = `${totalPenaltyDays}`;
      } else {
        console.error("Total row element is null.");
      }
    }, error => {
      console.error("Error fetching users:", error); 
    });
  }
  



  
  ngOnInit(): void {
    
      this.fetchUsers();
  }
}
