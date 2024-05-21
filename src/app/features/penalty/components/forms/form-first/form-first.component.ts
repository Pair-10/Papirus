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
                const materialNameObservable = this.httpClient.get(`http://localhost:60805/api/Materials/${id}`);  
                materialNameObservables.push(materialNameObservable);
            }
        });
        forkJoin(materialNameObservables).subscribe((materialNames: any[]) => {
            materialNames.forEach((material, index) => {
                console.log(`Material for user at index ${index}:`, material);
                const userIndex = this.Users.findIndex(user => user.materialID === material.id);
                // Materyalin malzeme idsi ile malzeme adını eşleştirir
                if (userIndex !== -1) {
                    // Malzeme adının atamasını yapar
                    this.Users[userIndex].materialName = material.materialName; 
                }
            });
            console.log("Users after adding material names:", this.Users);
            // Forma verileri doldurur
            if (this.Users.length > 0) {
                //sayfa ilk açıldığında default olarak 0.index verilerle doldurur formu 
                const user = this.Users[0];
                //veritabanından true/false olarak gelen değerleri active/inactive şeklinde getirir forma
                user.penaltyStatus = user.penaltyStatus ? 'Active' : 'Inactive';
                this.userForm.patchValue({
                    id: user.id,
                    returnedId: user.returnedId,
                    penaltyStatus: user.penaltyStatus,
                    totalPenaltyDays: user.totalPenaltyDays,
                    userId: user.userId,
                    penaltyPrice: user.penaltyPrice,
                    materialID: user.materialID,
                    materialName: user.materialName,

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
    
    this.httpClient.get(`http://localhost:60805/api/Penalties/${id}`, { headers }).subscribe(
        (userData: any) => {
            // Kullanıcı verilerini form üzerine doldurur
            this.userForm.patchValue({
                returnedId: userData.returnedId,
                penaltyStatus: userData.penaltyStatus ? 'Active' : 'Inactive',
                totalPenaltyDays: userData.totalPenaltyDays,
                userId: userData.userId,
                penaltyPrice: userData.penaltyPrice,
                materialID: userData.materialID,
                materialName: userData.materialName,

            });

            // Materyal adını almak için materialID varsa istek atar
            const materialID = userData.materialID;
            if (materialID) {
                this.httpClient.get(`http://localhost:60805/api/Materials/${materialID}`, { headers }).subscribe(
                    (materialData: any) => {
                        // Materyal adını forma getirir
                        this.userForm.patchValue({
                            materialName: materialData.materialName
                        });
                    },
                    error => {
                        console.error("Error fetching material data:", error);
                    }
                );
            }
        },
        error => {
            console.error("Error fetching user data:", error);
        }
    );
}

saveUserData(): void 
{
    const formData = this.userForm.value;
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.post('http://localhost:60805/api/Penalties', formData, { headers }).subscribe((response: any) => {
        console.log("API Response:", response);
    }, error => {
        console.error("Error saving user data:", error);
    });
}

updateUserData(): void {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      const headers = { Authorization: `Bearer ${token}` };
  
      if (formData.penaltyStatus !== null) {
        formData.penaltyStatus = formData.penaltyStatus.toLowerCase() === 'active' ? true : false;
  
        this.httpClient.put(`http://localhost:60805/api/Penalties/`, formData, { headers }).subscribe(
          (response: any) => {
            console.log("Penalty API Response:", response);
            this.showPenaltyInfo(response);
          },
          (error: any) => {
            console.error("Error updating penalty data:", error);
          }
        );
      }
  
      if (this.userForm.valid) {
        const formData = this.userForm.value;
        const headers = { Authorization: `Bearer ${token}` };
    
        // Malzeme güncelleme isteği
        const materialUpdateData = {
          id: formData.materialID,
          materialName: formData.materialName.toLowerCase(),
   
        };
    
        this.httpClient.put(`http://localhost:60805/api/Materials/${formData.materialID}`, materialUpdateData, { headers }).subscribe(
          (response: any) => {
            console.log("Material API Response:", response);
            this.showMaterialInfo(response);
          },
          (error) => {
            console.error("Error updating material data:", error);
          }
        );
      } else {
        console.log("Form is not valid.");
      }
    }
  }
  
  showPenaltyInfo(response: any): void {
    console.log("Showing penalty info:", response);
  }
  
  showMaterialInfo(response: any): void {
    console.log("Showing material info:", response);
  }
  

//silme işlemi
isDeleting: boolean = false;
deleteUserData(): void {
    if (this.isDeleting) {
        return; // Silme işlemi zaten devam ediyorsa tekrarlanmasını önler
    }
    this.isDeleting = true; // Silme işlemi başlatır

    const formData = this.userForm.value;
    const id = formData.id;
    const headers = { Authorization: `Bearer ${token}` };

    if (formData.penaltyStatus !== null) {
        // Ceza verisi silme işlemi
        this.httpClient.delete(`http://localhost:60805/api/Penalties/${id}`, { headers }).subscribe((response: any) => {
            console.log("Penalty data successfully deleted:", response);
            this.userForm.reset(); // Formu sıfırlar
            this.isDeleting = false; 
        }, error => {
            console.error("Error deleting penalty data:", error);
            this.isDeleting = false; 
        });

    } else if (formData.materialName != null) {
        // Materyal verisi silme işlemi
        this.httpClient.delete(`http://localhost:60805/api/Materials/${id}`, { headers }).subscribe((response: any) => {
            console.log("Material data successfully deleted:", response);
            this.userForm.reset(); 
            this.isDeleting = false; 
        }, error => {
            console.error("Error deleting material data:", error);
            this.isDeleting = false; 
        });

    } else {
        console.log("No valid data to delete.");
        this.isDeleting = false; 
    }
}

ngOnInit(): void {
    // Sayfa yüklendiğinde verileri getirir
    this.fetchUsers();

    // id alanının değeri değiştiğinde tetiklenecek olan yöntem
    this.userForm.get('id')?.valueChanges.subscribe((id) => {
        // id değeri değiştiğinde diğer alanlar otomatik olarak günceller
        this.httpClient.get(`http://localhost:60805/api/Penalties/${id}`).subscribe((userData: any) => {
            this.userForm.patchValue({
                returnedId: userData.returnedId,
                penaltyStatus: userData.penaltyStatus,
                totalPenaltyDays: userData.totalPenaltyDays,
                userId: userData.userId,
                penaltyPrice: userData.penaltyPrice,
                materialID: userData.materialID
            });
        }, error => {
            console.error("Error fetching user data:", error);
        });
    });
    this.penaltyStatusControl = this.userForm.get('penaltyStatus');
}



}
