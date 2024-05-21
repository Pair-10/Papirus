import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";
import { token } from '../../../services/constants';

@Component({
  selector: 'app-form-publisher',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './form-publisher.component.html',
  styleUrl: './form-publisher.component.css'
})
export class FormPublisherComponent implements OnInit{
  userForm: FormGroup;
  Users: any[] = [];

  constructor(
      private fb: FormBuilder,
      private httpClient: HttpClient
  ) {
      this.userForm = this.fb.group({
          id: [''],
          name: [''],
          webSite: [''],
          phoneNumber: [],
          addressId: [''],
      });
  }

  fetchUsers(): void {
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get('http://localhost:60805/api/Publishers?PageIndex=0&PageSize=1', { headers }).subscribe
      ((data: any) => 
       {
          console.log("API Response:", data);
          this.Users = data.items;
          if (this.Users.length > 0) 
         {
            //sayfa ilk açıldığında default olarak 0.index verileri getirir
              const user = this.Users[0];
              this.userForm.patchValue
              ({
                  id: user.id,
                  name: user.name,
                  webSite: user.webSite,
                  phoneNumber: user.phoneNumber,
                  addressId: user.addressId
              });
          }
            },
          error => 
            {
          console.error("Error fetching users:", error);
      });
  }

  fetchUserById(): void 
  {
      const id = this.userForm.get('id')?.value;
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get(`http://localhost:60805/api/Publishers/${id}`, { headers }).subscribe((userData: any) => {
          this.userForm.patchValue({
              name: userData.name,
              webSite: userData.webSite,
              phoneNumber: userData.phoneNumber,
              addressId: userData.addressId,
          });
      },
       error => 
      {
          console.error("Error fetching user data:", error);
      });
  }

  saveUserData(): void {
      // kayıt işlemi
      const formData = this.userForm.value;
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.post('http://localhost:60805/api/Publishers', formData, { headers }).subscribe
      ((response: any) => 
       {
          console.log("API Response:", response);
         }, 
         error => 
         {
          console.error("Error saving user data:", error);
      });
  }

  updateUserData(): void 
   {
    const formData = this.userForm.value;
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.put('http://localhost:60805/api/Publishers', formData, { headers }).subscribe
    ((response: any) => 
     {
        console.log("API Response:", response);
        }, 
        error => 
        {
        console.error("Error saving user data:", error);
    });
}
  
isDeleting: boolean = false;
deleteUserData(): void 
{
    if (this.isDeleting) 
    {
        return; //silme işlem zaten devam ediyorsa  tekrarlanmasını önler
    }
    this.isDeleting = true; //silme işlemi başlat
    const id = this.userForm.get('id')?.value;
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.delete(`http://localhost:60805/api/Publishers/${id}`, { headers }).subscribe
    ((response: any) => 
     {
        console.log("Kullanıcı verileri başarıyla silindi:", response);
        //silme işleminden sonra formu temizler
        this.userForm.reset();
        this.isDeleting = false; 
      }, 
      error =>
      {
        console.error("Kullanıcı verilerini silerken hata oluştu:", error);
        this.isDeleting = false; 
    });
}

  ngOnInit(): void 
  {
      // Sayfa yüklendiğinde verileri getirir
      this.fetchUsers();
      // id alanının değeri değiştiğinde tetiklenecek olan yöntem
      this.userForm.get('id')?.valueChanges.subscribe((id) => {
      // id değeri değiştiğinde diğer alanlar otomatik olarak günceller
          this.httpClient.get(`http://localhost:60805/api/Publishers/${id}`).subscribe((userData: any) => {
          this.userForm.patchValue({
                  name: userData.name,
                  webSite: userData.webSite,
                  phoneNumber: userData.phoneNumber,
                  addressId: userData.addressId,
                 
              });
          }, error => 
          {
              console.error("Error fetching user data:", error);
          });
      });
  }
  onInputFocus(event: any) 
  {
    event.target.classList.add('input-focus');
  }
  
  onInputBlur(event: any) 
  {
    event.target.classList.remove('input-focus');
  }
  

}
