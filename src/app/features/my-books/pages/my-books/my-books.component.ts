import { MyMaterialService } from './../../../../services/my-material/my-material.service';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";
import { UserService } from '../../../../services/sidebar/user.service';
import { MyBorrowedMaterials } from '../../../../models/my-borrowed-materials/borrowed-materials';
import { MaterialService } from '../../../../services/material/material.service';
import { forkJoin, mergeMap } from 'rxjs';
import { Material } from '../../../../models/material/material';
import { CommonModule } from '@angular/common';
import { BorrowMaterialService } from '../../../../services/borrow-material/borrow-material.service';
import { ReturnedService } from '../../../../services/returned/returned.service';

@Component({
    selector: 'app-my-books',
    standalone: true,
    templateUrl: './my-books.component.html',
    styleUrl: './my-books.component.css',
    imports: [SidebarComponent,CommonModule]
})
export class MyBooksComponent implements OnInit {
    userService = inject(UserService)
    myMaterialService = inject(MyMaterialService)
    materialService = inject(MaterialService)
    borrowMaterialService = inject(BorrowMaterialService)
    returnedService = inject(ReturnedService)
    borrowedMaterials: MyBorrowedMaterials[] = [];
    transformedMaterials: Material[] = [];
    showConfirmation: boolean = false;
    userid: any;
    ngOnInit(): void {
        this.userService.getUser().subscribe(
            response => {
                this.userid = response.id;
                this.myMaterialService.getMyMaterials(response.id).pipe(
                    mergeMap(responses => {
                        this.borrowedMaterials = responses;
                        return forkJoin(
                            this.borrowedMaterials.map(veri =>
                                this.materialService.getMaterialsByMaterialId(veri.materialId)
                            )
                        );
                    })
                ).subscribe(
                    transformedResponses => {
                        // Her bir malzeme için isReturned özelliğini kontrol ederek transformedMaterials dizisini oluşturun
                        this.transformedMaterials = transformedResponses.map((material, index) => {
                            // borrowedMaterials dizisindeki ilgili öğeyi alın
                            const borrowedMaterial = this.borrowedMaterials[index];
                            // isReturned özelliğini kontrol edin ve dönüştürülmüş malzemeye ekleyin
                            material.isReturned = borrowedMaterial.isReturned;
                            return material;
                        });
                    }
                );
            }
        );
    }
    cancelConfirmation() {
        this.showConfirmation = false;
    }
    confirmDelivery(material: Material) {
        // Teslim işlemlerini burada gerçekleştirin
        this.teslimEt(material);

        // Onay kutusunu gizleyin
        this.showConfirmation = false;
    }
    teslimEt(gelenveri: any){
        const eslesenVeri = this.borrowedMaterials.find(veri => veri.materialId === gelenveri.id)
        if (eslesenVeri) {
            eslesenVeri.isReturned = true;
        }
        this.borrowMaterialService.updateBorrowedMaterial(eslesenVeri).subscribe(
            response => {
                this.returnedService.setReturned(eslesenVeri).subscribe();
            }
        )
    }
    
}