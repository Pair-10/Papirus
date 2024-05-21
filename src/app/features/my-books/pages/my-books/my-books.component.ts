import { MyMaterialService } from './../../../../services/my-material/my-material.service';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";
import { MyBorrowedMaterials } from '../../../../models/my-borrowed-materials/borrowed-materials';
import { MaterialService } from '../../../../services/material/material.service';
import { forkJoin, mergeMap } from 'rxjs';
import { Material } from '../../../../models/material/material';
import { CommonModule } from '@angular/common';
import { BorrowMaterialService } from '../../../../services/borrow-material/borrow-material.service';
import { ReturnedService } from '../../../../services/returned/returned.service';
import { UserService } from '../../../../services/user/user.service';

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
    filteredMaterials: Material[] = [];
    ngOnInit(): void {
        this.userService.getUser().subscribe(
            response => {
                /*kullanıcı adı tokendan çekilerek getMyMaterials servisinden
                bu kullanıcıya ait olan ödünç alınan materyaller getirilir.
                */
                this.myMaterialService.getMyMaterials(response.id).pipe(
                    mergeMap(responses => {
                        this.borrowedMaterials = responses;
                        return forkJoin(
                            this.borrowedMaterials.map(veri =>
                                /*ödünç alınan materyallerin özelliklerini alabilmek için
                                materyallerin id leri getMaterialsByMaterialId servisine yollanır
                                */
                                this.materialService.getMaterialsByMaterialId(veri.materialId)
                            )
                        );
                    })
                ).subscribe(
                    transformedResponses => {
                        /* getMaterialsByMaterialId servisinden gelen sonuçlar değişkenlere atanır
                        daha sonra bu değişkenler html kısmında listelenir 
                        */
                        this.transformedMaterials = transformedResponses.map((material, index) => {
                            const borrowedMaterial = this.borrowedMaterials[index];
                            material.isReturned = borrowedMaterial.isReturned;
                            return material;
                        });
                        this.filteredMaterials = this.transformedMaterials;
                    }
                );
            }
        );
    }

    return(comingData: any){
        let matchingData :any =[];
        matchingData = this.borrowedMaterials.find(veri => veri.materialId === comingData.id)
        if (matchingData) {
            matchingData.isReturned = true;
        }
        this.borrowMaterialService.updateBorrowedMaterial(matchingData).subscribe(
            response => {
                this.returnedService.setReturned(matchingData).subscribe();
                this.ngOnInit();
            }
        )
    }
    searchItems(event: any): void {
        const query: string = event.target.value.trim(); // Get the value of the input and trim it
    
        if (!query) {
            this.filteredMaterials = this.transformedMaterials.slice();
            return;
        }
    
        this.filteredMaterials = this.transformedMaterials.filter(material =>
            material.materialName.toLowerCase().includes(query.toLowerCase()) ||
            material.language.toLowerCase().includes(query.toLowerCase()) ||
            material.pageCount.toString().toLowerCase().includes(query.toLowerCase())
        );
    }
    
}