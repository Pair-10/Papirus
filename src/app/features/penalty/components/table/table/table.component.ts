import { Component, OnInit,inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtTokenService } from '../../../../../../jwttoken.service';
import { CommonModule } from '@angular/common';
import { PenaltyService } from '../../../services/penalty.service';
import { PenaltyAdminService } from '../../../services/penalty-admin.service';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit{
  Users: any[] = [];
  filteredUsers: any[] = [];
   totalPenaltyPrice: number = 0; // Toplam ceza ücreti
   totalPenaltyDays:number=0;
   materialNames: { [key: string]: string } = {};
penalties: any[] = [];   
  constructor(private httpClient: HttpClient,private CommanModule:CommonModule,private JwtTokenService:JwtTokenService, 
    private penaltyService: PenaltyService,
    private penaltyAdminService:PenaltyAdminService
   ) {}
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
    this.updateTotalPenaltyDays();//Filtreleme sonrası toplam günü güncelle
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
  ngOnInit() {
    this.penaltyAdminService.getUser().subscribe((result) => {
      this.penalties = result;
  
      // Malzeme adlarını almak için gözlemlenen verilerin depolanacağı bir dizi oluşturur
      const materialNameObservables: Observable<any>[] = [];
  
      // Malzeme adlarını almak için her bir malzemenin kimliği için gözlemleri oluşturur
      this.penalties.forEach((penalty: any) => {
        const materialId = penalty.materialId;
        if (materialId) {
          // Malzeme adını almak için bir gözlem oluşturur
          const materialNameObservable = this.penaltyAdminService.getMaterialName(materialId);
          // Gözlemi diziye ekler
          materialNameObservables.push(materialNameObservable);
        }
      });
      // forkJoin kullanarak tüm gözlemlerin tamamlanmasını bekler
      forkJoin(materialNameObservables).subscribe((materialNames: any[]) => {
        console.log("Material Names:", materialNames);
        // Malzeme adlarını ceza nesnelerine atayın
        materialNames.forEach((material, index) => {
          this.penalties[index].materialName = material.materialName;
        });
        // Malzeme adları alındıktan sonra ceza bilgilerini getirir
        this.fetchUsers();
      });
    });
  }
  
  fetchUsers(): void {
    this.penaltyAdminService.getUserPenaltyAdmin().subscribe((data: any) => {
      console.log("API Response:", data); 
      this.Users = data.items;
      this.filteredUsers = [...this.Users]; 
      this.filteredUsers.forEach((user, index) => {
        user.materialName = this.penalties[index].materialName;
      });
      this.updateTotalPenaltyPrice(); // Toplam tutarı güncelle
      this.updateTotalPenaltyDays(); // Toplam ceza günlerini güncelle
    }, error => {
      console.error("Error fetching users:", error); 
    });
  }
  
}  