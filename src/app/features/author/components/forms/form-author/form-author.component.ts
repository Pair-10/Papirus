import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";
  import { token } from '../../../../publisher/services/constants';
@Component({
  selector: 'app-form-author',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SidebarComponent],
  templateUrl: './form-author.component.html',
  styleUrl: './form-author.component.css'
})
export class FormAuthorComponent implements OnInit{
  userForm: FormGroup;
  Users: any[] = [];

  constructor(
      private fb: FormBuilder,
      private httpClient: HttpClient
  ) {
      this.userForm = this.fb.group({
          id: [''],
          name: [''],
          surname: [''],
          bio: [''],
          webSite: [''],
          
      });
  }

  fetchUsers(): void {
      // HTTP isteği yapılarak kullanıcı verileri getirir
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get('http://localhost:60805/api/Authors?PageIndex=0&PageSize=1', { headers }).subscribe
       ((data: any) => 
        {
         //sayfa ilk açıldığında default olarak 0.index verileri getirir
              console.log("API Response:", data);
              this.Users = data.items;
              if (this.Users.length > 0) 
          {
              const user = this.Users[0];
              this.userForm.patchValue
            ({
                  id: user.id,
                  name: user.name,
                  surname: user.surname,
                  bio: user.bio,
                  webSite: user.webSite
            });
          }
              },
              error => 
              {
          console.error("Error fetching users:", error);
      });
  }

  fetchUserById(): void {
      const id = this.userForm.get('id')?.value;
      //id değeri kullanılarak API'den kullanıcı verilerini getirir
      //form alanlarını doldurur
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get(`http://localhost:60805/api/Authors/${id}`, { headers }).subscribe((userData: any) => {
          this.userForm.patchValue
          ({
              name: userData.name,
              surname: userData.surname,
              bio: userData.bio,
              webSite: userData.webSite,
          });
      }, error => {
          console.error("Error fetching user data:", error);
      });
  }

  saveUserData(): void {
      // Kullanıcı verileri kayıt işlemi
      const formData = this.userForm.value;
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.post('http://localhost:60805/api/Authors', formData, { headers }).subscribe((response: any) => 
    {
          console.log("API Response:", response);
    },    error => 
       {
          console.error("Error saving user data:", error);
       });
  }

  updateUserData(): void 
      {
      // Kullanıcı verileri günceller
      if (this.userForm.valid) 
        {
          const formData = this.userForm.value;
          const headers = { Authorization: `Bearer ${token}` };
          this.httpClient.put(`http://localhost:60805/api/Authors/`, formData, { headers }).subscribe
           ((response: any) => 
           {
              console.log("API Response:", response);
               }, 
               error => 
               {
              console.error("Error updating user data:", error);
            });
        } 
        else 
         {
          console.log("Form is not valid.");
         }
  }

    isDeleting: boolean = false;
    deleteUserData(): void {
    if (this.isDeleting) // silme işlem zaten devam ediyorsa, tekrarlanmasını önle
     {
      return; 
     }
    this.isDeleting = true; // silme işlemini başlat

    const id = this.userForm.get('id')?.value;
    const headers = { Authorization: `Bearer ${token}` };

        // HTTP DELETE isteği gönderir
    this.httpClient.delete(`http://localhost:60805/api/Authors/${id}`, { headers }).subscribe
     ((response: any) => 
     {
        console.log("Kullanıcı verileri başarıyla silindi:", response);
        // silme işleminden sonra formu temizler 
        this.userForm.reset();
        this.isDeleting = false; 
        }, 
        error =>
        {
        console.error("Kullanıcı verilerini silerken hata oluştu:", error);
        this.isDeleting = false; 
     });
}

  ngOnInit(): void {
      // Sayfa yüklendiğinde kullanıcı verileri getirir
      this.fetchUsers();
      // id alanının değeri değiştiğinde tetiklenir
      this.userForm.get('id')?.valueChanges.subscribe
      ((id) =>
       {
          // id değeri değiştiğinde diğer alanlar otomatik olarak günceller,formun içini verilerle doldurur 
          this.httpClient.get(`http://localhost:60805/api/Authors/${id}`).subscribe((userData: any) => 
           {
              this.userForm.patchValue
              ({
                  name: userData.name,
                  surname: userData.surname,
                  bio: userData.bio,
                  webSite: userData.webSite,
              });
           }, 
          error => 
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
