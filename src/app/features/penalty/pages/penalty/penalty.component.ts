import { Component, ElementRef, Renderer2,inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { FormBuilder,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { PenaltyService } from '../../services/penalty.service';
import { addPenaltyRequest } from '../../models/addPenaltyRequest';
import { CommonModule } from '@angular/common';



 @Component({
   selector: 'app-penalty',
   standalone: true,
  imports: [NavbarComponent,SidebarComponent,ReactiveFormsModule,CommonModule],
   templateUrl: './penalty.component.html',
   styleUrls: ['./penalty.component.css'],
 })
 export class PenaltyComponent {
  materialNames: { [key: string]: string } = {};
  formBuilder=inject(FormBuilder);
  penaltyService=inject(PenaltyService);
  penalties: any[] = [];
  filteredUsers: any[] = [];
  Users: any[] = [];
  filteredPenalties: any[] = []; 


  profileForm = this.formBuilder.group({
    id: [''],
    userId: [''],
    returnedId: [''],
    penaltyStatus: [],
    totalPenaltyDays: [],
    penaltyPrice: [],
    materialID:[],
    materialName:[],
    });
    
    totalPenaltyPrice: number = 0;
  totalPenaltyDays: number = 0;
   constructor(private renderer: Renderer2, private el: ElementRef) {}

   calculateTotalPenalties(): void {
    this.totalPenaltyDays = this.penalties.reduce((total: number, penalty: any) => total + (penalty.totalPenaltyDays || 0), 0);
    this.totalPenaltyPrice = this.penalties.reduce((total: number, penalty: any) => total + (penalty.penaltyPrice || 0), 0);
  }
  
   onSubmit() {
    const user: addPenaltyRequest = {
     id: this.profileForm.value.id!, 
     userId:this.profileForm.value.userId!,
     returnedId: this.profileForm.value.returnedId!,
     penaltyStatus:this.profileForm.value.penaltyStatus!, 
     totalPenaltyDays:  this.profileForm.value.totalPenaltyDays!, 
     penaltyPrice: this.profileForm.value.penaltyPrice!,
     materialID:this.profileForm.value.materialID!,
     materialName:this.profileForm.value.materialName!,
   };
       
     }


     ngOnInit() {
      this.penaltyService.getUser().subscribe((result) => {
        this.penalties = result;
        this.filteredUsers = [...this.penalties]; // filteredUsers dizisini penalties dizisiyle doldur
        // Toplam ceza günlerini ve toplam ceza tutarını sıfırla
        this.totalPenaltyDays = 0;
        this.totalPenaltyPrice = 0;
    
        // Ceza listesinde döngü yaparak toplam ceza günlerini ve ceza tutarını hesapla
        this.penalties.forEach((penalty: any) => {
          // Her ceza için ceza günlerini ve ceza tutarını toplam değerlere ekle
          this.totalPenaltyDays += penalty.totalPenaltyDays || 0;
          this.totalPenaltyPrice += penalty.penaltyPrice || 0;
    
          // Material adını getir ve penalty objesine ekle
          const materialId = penalty.materialId;
          if (materialId) {
            this.penaltyService.getMaterialName(materialId).subscribe((material) => {
              penalty.materialName = material.materialName;
              this.filteredUsers = [...this.penalties]; // filteredUsers dizisini penalties dizisiyle güncelle
            });
          }
        });
      });
    }
    

    
    
  
     
   toggleSidebar(): void {
     const sidebar = this.el.nativeElement.querySelector('#default-sidebar');
     if (sidebar) {
       this.renderer.addClass(sidebar, '-translate-x-full');
       this.renderer.removeClass(sidebar, 'translate-x-0');
     }
   }
 }
 const colors = ['bg-blue-900', 'bg-gray-700', 'bg-white']; 



 let currentColorIndex = 0;
 
 function changeColor() {
   const element = document.getElementById('animatedDiv');
   if (element) {
     // Mevcut rengi kaldır
     element.classList.remove(colors[currentColorIndex]);
 
     // Renk dizisinde bir sonraki renge geç
     currentColorIndex = (currentColorIndex + 1) % colors.length;
 
     // Yeni rengi ekle
     element.classList.add(colors[currentColorIndex]);
   }



 
  

   
 }
 
 // Her 2 saniyede bir rengi değiştir
 setInterval(changeColor, 2000);
 
 