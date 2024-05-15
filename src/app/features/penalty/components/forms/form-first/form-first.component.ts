import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";
import { token } from '../../../../publisher/services/constants';
import { forkJoin } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
selector: 'app-form-first',
standalone: true,
imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
templateUrl: './form-first.component.html',
styleUrls: ['./form-first.component.css']
})
export class FormFirstComponent implements OnInit {
userForm: FormGroup;
Users: any[] = [];
penaltyStatusControl!: AbstractControl| null;

constructor(
    private fb: FormBuilder,
    private httpClient: HttpClient
) {
    this.userForm = this.fb.group({
        id: [''],
        returnedId: [''],
        penaltyStatus: [''],
        totalPenaltyDays: [''],
        userId: [''],
        penaltyPrice: [''],
        materialID:[''],
        materialName:[''],
    }); 
}
fetchUsers(): void {
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.get('http://localhost:60805/api/Penalties?PageIndex=0&PageSize=4', { headers }).subscribe((data: any) => {
        console.log("API Response:", data);
        this.Users = data.items;
        // Kullanıcı verilerini aldıktan sonra malzeme adlarını almak için bir dizi oluşturur
        const materialNameObservables: Observable<any>[] = [];
        this.Users.forEach((user: any) => {
            const id = user.materialID;
            if (id) {
                // Malzeme adını almak için bir gözlem oluşturur
                const materialNameObservable = this.httpClient.get(`http://localhost:60805/api/Materials/${id}`);  // Doğru URL'yi kullanmalısınız
                // Gözlemi diziye ekler
                materialNameObservables.push(materialNameObservable);
            }
        });
        forkJoin(materialNameObservables).subscribe((materialNames: any[]) => {
            materialNames.forEach((material, index) => {
                console.log(`Material for user at index ${index}:`, material);
                const userIndex = this.Users.findIndex(user => user.materialID === material.id);
                // Materyalin malzeme kimliği ile malzeme adını eşleştirir
                if (userIndex !== -1) {
                    // Malzeme adını ata
                    this.Users[userIndex].materialName = material.materialName; //materialName özelliği varsa ona göre ata
                }
            });
            console.log("Users after adding material names:", this.Users);
            // Forma verileri doldurur
            if (this.Users.length > 0) {
                const user = this.Users[0];//default olarak 0 index veriyi getirir
                user.penaltyStatus = user.penaltyStatus ? 'Active' : 'Inactive';
                this.userForm.patchValue({
                    id: user.id,
                    returnedId: user.returnedId,
                    penaltyStatus: user.penaltyStatus,
                    totalPenaltyDays: user.totalPenaltyDays,
                    userId: user.userId,
                    penaltyPrice: user.penaltyPrice,
                    materialID: user.materialID,
                    materialName: user.materialName
                });
                // materialName alanını da form içine ekler
                this.userForm.controls['materialName'].setValue(user.materialName);
            }
        });
    }, error => {
        console.error("Error fetching users:", error);
    });
}

fetchUserById(): void {
    const id = this.userForm.get('id')?.value;
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.get(`http://localhost:60805/api/Penalties/${id}`, { headers }).subscribe((userData: any) => {
        this.userForm.patchValue({
            returnedId: userData.returnedId,
            penaltyStatus: userData.penaltyStatus,
            totalPenaltyDays: userData.totalPenaltyDays,
            userId: userData.userId,
            penaltyPrice: userData.penaltyPrice,
            materialID: userData.materialID,
            materialName: userData.materialName
        });

        //Materyalin malzeme kimliğini alır
        const materialID = userData.materialID;
        if (materialID) {
            // Malzeme kimliği varsa, malzeme adını almak için ayrı bir istek atar 
            this.httpClient.get(`http://localhost:60805/api/Materials/${materialID}`, { headers }).subscribe((materialData: any) => {
                // Malzeme adını forma getirir
                this.userForm.patchValue({
                    materialName: materialData.materialName
                });
            }, error => {
                console.error("Error fetching material data:", error);
            });
        }
    }, error => {
        console.error("Error fetching user data:", error);
    });
}


saveUserData(): void {
    // Kullanıcı verileri kaydet
    const formData = this.userForm.value;
  //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA";
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.post('http://localhost:60805/api/Penalties', formData, { headers }).subscribe((response: any) => {
        console.log("API Response:", response);
    }, error => {
        console.error("Error saving user data:", error);
    });
}




//  updateUserData(): void {
//      if (this.userForm.valid) {
//          const formData = this.userForm.value;
//          formData.penaltyStatus = formData.penaltyStatus.toLowerCase() === 'active' ? true : false;
//          const headers = { Authorization: `Bearer ${token}` };
//          this.httpClient.put(`http://localhost:60805/api/Penalties/`, formData, { headers }).subscribe((response: any) => {
//              console.log("API Response:", response);
//          }, error => {
//              console.error("Error updating user data:", error);
//          });
//      } else {
//          console.log("Form is not valid.");
//     }
//  }

updateUserData(): void {
    if (this.userForm.valid) {
        const formData = this.userForm.value;
       
        formData.penaltyStatus = formData.penaltyStatus.toLowerCase() === 'active';

        const headers = { Authorization: `Bearer ${token}` };

        this.httpClient.put(`http://localhost:60805/api/Penalties`, formData, { headers }).subscribe((penaltyResponse: any) => {
            console.log("Penalty updated successfully:", penaltyResponse);

            // Material adını güncelle
            const materialId = formData.materialID;
            const materialName = formData.materialName;

            if (materialId && materialName) {
                const materialData = { materialName };
                this.httpClient.put(`http://localhost:60805/api/Materials/`, materialData, { headers }).subscribe((materialResponse: any) => {
                    console.log("Material name updated successfully:", materialResponse);
                }, materialError => {
                    console.error("Error updating material name:", materialError);
                });
            } else {
                console.log("Material ID or Material Name is missing.");
            }
        }, error => {
            console.error("Error updating penalty:", error);
        });
    } else {
        console.log("Form is not valid.");
    }
}






///silme islemi
isDeleting: boolean = false;

deleteUserData(): void {
    if (this.isDeleting) {
        return; // İşlem zaten devam ediyorsa, tekrarlanmasını önle
    }
    this.isDeleting = true; // İşlemi başlat

    const id = this.userForm.get('id')?.value;
  //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA";
    const headers = { Authorization: `Bearer ${token}` };

    // HTTP DELETE isteği yap
    this.httpClient.delete(`http://localhost:60805/api/Penalties/${id}`, { headers }).subscribe((response: any) => {
        console.log("Kullanıcı verileri başarıyla silindi:", response);
        // Başarılı silme işleminden sonra formu temizle veya başka gerekli işlemleri gerçekleştir
        this.userForm.reset();
        this.isDeleting = false; // İşlem tamamlandıktan sonra flag'i sıfırla
    }, error => {
        console.error("Kullanıcı verilerini silerken hata oluştu:", error);
        this.isDeleting = false; // Hata oluştuğunda flag'i sıfırla
    });
}

///



ngOnInit(): void {
    // Sayfa yüklendiğinde kullanıcı verileri getir
    this.fetchUsers();
  
    // id alanının değeri değiştiğinde tetiklenecek olan yöntem
    this.userForm.get('id')?.valueChanges.subscribe((id) => {
      
        this.httpClient.get(`http://localhost:60805/api/Penalties/${id}`).subscribe((userData: any) => {
            this.userForm.patchValue({
                returnedId: userData.returnedId,
                penaltyStatus: userData.penaltyStatus,
                totalPenaltyDays: userData.totalPenaltyDays,
                userId: userData.userId,
                penaltyPrice: userData.penaltyPrice,
                materialID:userData.materialID
            });
        }, error => {
            console.error("Error fetching user data:", error);
        });
    });  this.penaltyStatusControl = this.userForm.get('penaltyStatus');
}


}
