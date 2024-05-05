
import { Component, inject } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../services/sidebar/user.service';
import { IFullUser } from '../../../../models/fullUser/fullUser';

@Component({
    selector: 'app-edit-profile',
    standalone: true,
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.css',
    imports: [SidebarComponent,ReactiveFormsModule]
})
export class EditProfileComponent {
    formBuilder=inject(FormBuilder);
    userService=inject(UserService)
    
    profileForm = this.formBuilder.group({
        id:[''],
        firstName: [''],
        lastName: [''],
        email: [''],
        phoneNumber: ['']
      });
   
  
    onSubmit() {
        const user: IFullUser = {
            id: this.profileForm.value.id!,
            firstName: this.profileForm.value.firstName!,
            lastName: this.profileForm.value.lastName!,
            email: this.profileForm.value.email!,
            phoneNumber: this.profileForm.value.phoneNumber!
        };
    }
    ngOnInit(){
          this.userService.getUser().subscribe((result)=>{
            console.log("Sonuc",result);
            this.profileForm.patchValue(result);
            
          })
        
      }
}
