  import { Component, ElementRef, Renderer2, inject } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
  import { PenaltyService } from '../../services/penalty.service';
  import { addPenaltyRequest } from '../../models/addPenaltyRequest';
  import { CommonModule } from '@angular/common';
  
  @Component({
    selector: 'app-table-penalty-admin',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './table-penalty-admin.component.html',
    styleUrls: ['./table-penalty-admin.component.css']
  })
  export class TablePenaltyAdminComponent {
    formBuilder = inject(FormBuilder);
    penaltyService = inject(PenaltyService);
    penalties: any[] = [];
    profileForm = this.formBuilder.group({
      id: [''],
      userId: [''],
      returnedId: [''],
      penaltyStatus: [],
      totalPenaltyDays: [],
      penaltyPrice: [],
      materialID: [],
      materialName: [],
    });
  
    totalPenaltyPrice: number = 0;
    totalPenaltyDays: number = 0;
  
    constructor(private renderer: Renderer2, private el: ElementRef) {}
  
    ngOnInit() 
 {
      this.penaltyService.getUserAll().subscribe
      (
        (result: any[]) => 
      {
        this.penalties = result; 
        this.penalties = [this.penalties];
        // Toplam ceza günlerini ve toplam ceza tutarını sıfırlar
        this.totalPenaltyDays = 0;
        this.totalPenaltyPrice = 0;
        // Ceza listesinde döngü yaparak toplam ceza günlerini ve ceza tutarını hesaplar
        this.penalties.forEach((penalty: any) => {
        // Her ceza için ceza günlerini toplam değere ekler
        this.totalPenaltyDays += penalty.totalPenaltyDays || 0;
        // Her ceza için ceza tutarını toplam değere ekler
        this.totalPenaltyPrice += penalty.penaltyPrice || 0;
        });
      });
    }
  
    onSubmit()
   {
      const user: addPenaltyRequest = 
    {
        id: this.profileForm.value.id!,
        userId: this.profileForm.value.userId!,
        returnedId: this.profileForm.value.returnedId!,
        penaltyStatus: this.profileForm.value.penaltyStatus!,
        totalPenaltyDays: this.profileForm.value.totalPenaltyDays!,
        penaltyPrice: this.profileForm.value.penaltyPrice!,
        materialID: this.profileForm.value.materialID!,
        materialName: this.profileForm.value.materialName!,
      };
    }
  
    toggleSidebar(): void 
    {
      const sidebar = this.el.nativeElement.querySelector('#default-sidebar');
      if (sidebar) 
      {
        this.renderer.addClass(sidebar, '-translate-x-full');
        this.renderer.removeClass(sidebar, 'translate-x-0');
      }
    }
  }
  