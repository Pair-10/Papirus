import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule,AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";
import { token } from '../../../../publisher/services/constants';

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
    }); 
  
    
}

//   fetchUsers(): void {
//       // HTTP isteği yapılarak kullanıcı verileri getiriliyor
//     //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA";
//       const headers = { Authorization: `Bearer ${token}` };
//       this.httpClient.get('http://localhost:60805/api/Penalties?PageIndex=0&PageSize=2', { headers }).subscribe((data: any) => {
//           console.log("API Response:", data);
//           this.Users = data.items;
//           if (this.Users.length > 0) {
//               const user = this.Users[0];
//               this.userForm.patchValue({
//                   id: user.id,
//                   returnedId: user.returnedId,
//                   penaltyStatus: user.penaltyStatus,
//                   totalPenaltyDays: user.totalPenaltyDays,
//                   userId: user.userId,
//                   penaltyPrice: user.penaltyPrice,
//                   materialID:user.materialID
//               });
//           }
//       }, error => {
//           console.error("Error fetching users:", error);
//       });
//   }

fetchUsers(): void {
  const headers = { Authorization: `Bearer ${token}` };
  this.httpClient.get('http://localhost:60805/api/Penalties?PageIndex=0&PageSize=2', { headers }).subscribe((data: any) => {
      console.log("API Response:", data);
      this.Users = data.items;
      if (this.Users.length > 0) {
          const user = this.Users[0];
          // Veritabanından gelen true/false değerlerini 'Active' veya 'Inactive' olarak ayarla
          user.penaltyStatus = user.penaltyStatus ? 'Active' : 'Inactive';
          this.userForm.patchValue({
              id: user.id,
              returnedId: user.returnedId,
              penaltyStatus: user.penaltyStatus,
              totalPenaltyDays: user.totalPenaltyDays,
              userId: user.userId,
              penaltyPrice: user.penaltyPrice,
              materialID: user.materialID
              
          });
      }
  }, error => {
      console.error("Error fetching users:", error);
  });
}




fetchUserById(): void {
    const id = this.userForm.get('id')?.value;
    // Burada id değeri kullanılarak API'den kullanıcı verilerini getir
    // API'den gelen verileri form alanlarına doldu
  //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA";
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.get(`http://localhost:60805/api/Penalties/${id}`, { headers }).subscribe((userData: any) => {
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
//      // Kullanıcı verileri güncelle
//      if (this.userForm.valid) {
//          const formData = this.userForm.value;
//        //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDY2MjExOCwiZXhwIjoxNzE0NzIyMTE4LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.9JVvCCWXwGkfWV2WiyCWVtOkqsKSUZqsFbANWKq-4iZlcvunObBIVySacOCCuLf32ZGIW14jj9AQrjIVwZWdxA";
//         const headers = { Authorization: `Bearer ${token}` };
//          this.httpClient.put(`http://localhost:60805/api/Penalties/`, formData, { headers }).subscribe((response: any) => {
//              console.log("API Response:", response);
//              // Güncelleme başarılı olduğunda gerekli işlemleri burada yapabilirsiniz
//         }, error => {
//              console.error("Error updating user data:", error);
//          });
//     } else {
//          console.log("Form is not valid.");
//      }
//  }



updateUserData() {
    if (this.userForm.valid) {
        const formData = this.userForm.value;
        // penaltyStatus alanının bir dize olduğundan emin olun
        if (typeof formData.penaltyStatus === 'string') {
            // Dize olduğunda toLowerCase() işlemini uygulayın
            formData.penaltyStatus = formData.penaltyStatus.toLowerCase();
        }
        const headers = { Authorization: `Bearer ${token}` };
        this.httpClient.put(`http://localhost:60805/api/Penalties/`, formData, { headers }).subscribe((response: any) => {
            console.log("API Response:", response);
        }, error => {
            console.error("Error updating user data:", error);
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
        // id alanı değiştiğinde otomatik olarak çalışacak
        // id değeri değiştiğinde diğer alanlar otomatik olarak güncellenecek
        // Örneğin, id alanı değiştiğinde API'ye gidip yeni kullanıcı verilerini getir
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
