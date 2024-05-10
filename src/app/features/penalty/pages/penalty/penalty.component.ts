import { Component, ElementRef, Renderer2,inject } from '@angular/core';
import { NavbarComponent } from '../../../../shared/components/navbar/navbar.component';
import { SidebarComponent } from '../../../../shared/components/sidebar/sidebar.component';
import { FormBuilder,FormGroup,ReactiveFormsModule } from '@angular/forms';
import { PenaltyService } from '../../services/penalty.service';
// import { UserService } from '../../../pnlty/pages/pnlty/user.service';

// import { IFullUser } from '../../../pnlty/pages/pnlty/fullUser'
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
  materialNames: { [key: string]: string } = {};/////
  formBuilder=inject(FormBuilder);
  // userService=inject(UserService);
penaltyService=inject(PenaltyService);

  profileForm = this.formBuilder.group({
    id: [''],
    userId: [''],
    returnedId: [''],
    penaltyStatus: [],
    totalPenaltyDays: [],
    penaltyPrice: [],
    materialID:[],
    });

   constructor(private renderer: Renderer2, private el: ElementRef) {}


   onSubmit() {
    const user: addPenaltyRequest = {
     id: this.profileForm.value.id!, 
     userId:this.profileForm.value.userId!,
     returnedId: this.profileForm.value.returnedId!,
     penaltyStatus:this.profileForm.value.penaltyStatus!, 
     totalPenaltyDays:  this.profileForm.value.totalPenaltyDays!, 
     penaltyPrice: this.profileForm.value.penaltyPrice!,
     materialID:this.profileForm.value.materialID!,
   };
   
       
       
     }

     ngOnInit(){
      this.penaltyService.getUser().subscribe((result)=>{
      
       this.profileForm.patchValue(result);
       
        
      })
      
    
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
 
 