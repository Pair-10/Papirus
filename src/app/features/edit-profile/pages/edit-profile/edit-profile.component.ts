import { Component, inject } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";
import { FormBuilder,ReactiveFormsModule } from '@angular/forms';

import { IFullUser } from '../../../../models/fullUser/fullUser';
import { UserService } from '../../../../services/user/user.service';

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
        this.userService.updateUser(user).subscribe((result)=>{
            console.log(result)
        })
        this.ngOnInit()
    }
    ngOnInit(){
          this.userService.getUser().subscribe((result)=>{
            console.log("Sonuc",result);
            this.profileForm.patchValue(result);
            
          })
        
      }
}
