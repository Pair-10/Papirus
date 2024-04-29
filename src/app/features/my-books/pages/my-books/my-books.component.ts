import { MyMaterialService } from './../../../../services/my-material/my-material.service';
import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";
import { UserService } from '../../../../services/sidebar/user.service';
import { MyBorrowedMaterials } from '../../../../models/my-borrowed-materials/borrowed-materials';
import { MaterialService } from '../../../../services/material/material.service';
import { forkJoin, mergeMap } from 'rxjs';
import { Material } from '../../../../models/material/material';
import { CommonModule } from '@angular/common';

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
    borrowedMaterials: MyBorrowedMaterials[] = [];
    transformedMaterials: Material[] = [];
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
                        // Dönüştürülmüş veriyi tanımladığımız değişkene atıyoruz
                        this.transformedMaterials = transformedResponses;
                    }
                );
            }
        );
    }

    teslimEt(gelenveri: any){
        const eslesenVeri = this.borrowedMaterials.find(veri => veri.materialId === gelenveri.id)
        /*
        Şuanda listelenen materyallerden hangisine tıklandığının verisini alıyorum.
        Bundan sonra da buraya tıklanan veriyi returned servisi oluşturup oraya atacağım.
        Daha sonra returned serviceden dönen tarihi ve burada aldığım deadline değerini hesaplatıp penalty serviceine yollayacağım.
        */
    }
    
}