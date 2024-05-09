import { Component, OnInit } from '@angular/core';
  import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
  import { HttpClient } from '@angular/common/http';
  import { CommonModule } from '@angular/common';
  import { SidebarComponent } from "../../../../../shared/components/sidebar/sidebar.component";
//   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDc0MDQ3NywiZXhwIjoxNzE0ODAwNDc3LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.MQO3qNj0-2d4xrtSUF-xu1ocLzlp5tPZ6lui5sMi1qIGMk4JIyrLFqo7rJrd9N1F8aLl-KkDhpBQwsPsNY84cA";
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
      // HTTP isteği yapılarak kullanıcı verileri getiriliyor
    //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDc0MDQ3NywiZXhwIjoxNzE0ODAwNDc3LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.MQO3qNj0-2d4xrtSUF-xu1ocLzlp5tPZ6lui5sMi1qIGMk4JIyrLFqo7rJrd9N1F8aLl-KkDhpBQwsPsNY84cA";
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get('http://localhost:60805/api/Publishers?PageIndex=0&PageSize=1', { headers }).subscribe((data: any) => {
          console.log("API Response:", data);
          this.Users = data.items;
          if (this.Users.length > 0) {
              const user = this.Users[0];
              this.userForm.patchValue({
                  id: user.id,
                  name: user.name,
                  webSite: user.webSite,
                  phoneNumber: user.phoneNumber,
                  addressId: user.addressId
              });
          }
      }, error => {
          console.error("Error fetching users:", error);
      });
  }

  fetchUserById(): void {
      const id = this.userForm.get('id')?.value;
      // Burada id değeri kullanılarak API'den kullanıcı verilerini getirin
      // API'den gelen verileri form alanlarına doldurun
    //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDc0MDQ3NywiZXhwIjoxNzE0ODAwNDc3LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.MQO3qNj0-2d4xrtSUF-xu1ocLzlp5tPZ6lui5sMi1qIGMk4JIyrLFqo7rJrd9N1F8aLl-KkDhpBQwsPsNY84cA";
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.get(`http://localhost:60805/api/Publishers/${id}`, { headers }).subscribe((userData: any) => {
          this.userForm.patchValue({
           
              name: userData.name,
              webSite: userData.webSite,
              phoneNumber: userData.phoneNumber,
              addressId: userData.addressId,
             
          });
      }, error => {
          console.error("Error fetching user data:", error);
      });
  }

  saveUserData(): void {
      // Kullanıcı verileri kaydediliyor
      const formData = this.userForm.value;
    //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDc0MDQ3NywiZXhwIjoxNzE0ODAwNDc3LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.MQO3qNj0-2d4xrtSUF-xu1ocLzlp5tPZ6lui5sMi1qIGMk4JIyrLFqo7rJrd9N1F8aLl-KkDhpBQwsPsNY84cA";
      const headers = { Authorization: `Bearer ${token}` };
      this.httpClient.post('http://localhost:60805/api/Publishers', formData, { headers }).subscribe((response: any) => {
          console.log("API Response:", response);
      }, error => {
          console.error("Error saving user data:", error);
      });
  }

  updateUserData(): void {
    // Kullanıcı verileri kaydediliyor
    const formData = this.userForm.value;
  //   const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDc0MDQ3NywiZXhwIjoxNzE0ODAwNDc3LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.MQO3qNj0-2d4xrtSUF-xu1ocLzlp5tPZ6lui5sMi1qIGMk4JIyrLFqo7rJrd9N1F8aLl-KkDhpBQwsPsNY84cA";
    const headers = { Authorization: `Bearer ${token}` };
    this.httpClient.put('http://localhost:60805/api/Publishers', formData, { headers }).subscribe((response: any) => {
        console.log("API Response:", response);
    }, error => {
        console.error("Error saving user data:", error);
    });
}
  

  isDeleting: boolean = false;

deleteUserData(): void {
    if (this.isDeleting) {
        return; // İşlem zaten devam ediyorsa, tekrarlanmasını önle
    }
    this.isDeleting = true; // İşlemi başlat

    const id = this.userForm.get('id')?.value;
    // const token = "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImQ3ZDY5MjM5LTVjNjQtNGJkMS05ODljLTM2OWM1OGNkNzJhYyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6Imt5c0BreXMiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsIm5iZiI6MTcxNDc0MDQ3NywiZXhwIjoxNzE0ODAwNDc3LCJpc3MiOiJuQXJjaGl0ZWN0dXJlQGtvZGxhbWEuaW8iLCJhdWQiOiJzdGFydGVyUHJvamVjdEBrb2RsYW1hLmlvIn0.MQO3qNj0-2d4xrtSUF-xu1ocLzlp5tPZ6lui5sMi1qIGMk4JIyrLFqo7rJrd9N1F8aLl-KkDhpBQwsPsNY84cA";
    const headers = { Authorization: `Bearer ${token}` };

    // HTTP DELETE isteği yap
    this.httpClient.delete(`http://localhost:60805/api/Publishers/${id}`, { headers }).subscribe((response: any) => {
        console.log("Kullanıcı verileri başarıyla silindi:", response);
        // Başarılı silme işleminden sonra formu temizle veya başka gerekli işlemleri gerçekleştir
        this.userForm.reset();
        this.isDeleting = false; // İşlem tamamlandıktan sonra flag'i sıfırla
    }, error => {
        console.error("Kullanıcı verilerini silerken hata oluştu:", error);
        this.isDeleting = false; // Hata oluştuğunda flag'i sıfırla
    });
}


  ngOnInit(): void {
      // Sayfa yüklendiğinde kullanıcı verileri getiriliyor
      this.fetchUsers();
    
      // id alanının değeri değiştiğinde tetiklenecek olan yöntem
      this.userForm.get('id')?.valueChanges.subscribe((id) => {
          // id alanı değiştiğinde, bu yöntem otomatik olarak çalışacak
          // id değeri değiştiğinde diğer alanlar otomatik olarak güncelle
        
          this.httpClient.get(`http://localhost:60805/api/Publishers/${id}`).subscribe((userData: any) => {
              this.userForm.patchValue({
                  name: userData.name,
                  webSite: userData.webSite,
                  phoneNumber: userData.phoneNumber,
                  addressId: userData.addressId,
                 
              });
          }, error => {
              console.error("Error fetching user data:", error);
          });
      });
  }


}
