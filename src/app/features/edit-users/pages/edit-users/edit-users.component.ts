import { IUserResponse } from './../../../../models/user-response/userResponse';
import { Component, Input, inject, input } from '@angular/core';
import { SidebarComponent } from "../../../../shared/components/sidebar/sidebar.component";
import { UserService } from '../../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IFullUser } from '../../../../models/fullUser/fullUser';
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-edit-users',
    standalone: true,
    templateUrl: './edit-users.component.html',
    styleUrl: './edit-users.component.css',
    imports: [SidebarComponent, CommonModule, ReactiveFormsModule,RouterModule,FormsModule]
})
export class EditUsersComponent {
onPageChange(arg0: number) {
throw new Error('Method not implemented.');
}
    @Input() searchText: string = '';
    userList: IUserResponse[] = [];
    popupOpen: boolean = false;
    formBuilder = inject(FormBuilder);
    userService = inject(UserService)
    profileForm = this.formBuilder.group({
        id: [''],
        firstName: [''],
        lastName: [''],
        email: [''],
        phoneNumber: ['']
    });


    onSubmit() {
       this.userService.getUser2(this.profileForm.value.id!).subscribe((dataId) => {
            this.profileForm.value.id=dataId.id
        
        });
        const user: IFullUser = {
            id: this.profileForm.value.id!,
            firstName: this.profileForm.value.firstName!,
            lastName: this.profileForm.value.lastName!,
            email: this.profileForm.value.email!,
            phoneNumber: this.profileForm.value.phoneNumber!
          };
        this.userService.updateUser(user).subscribe((updatedUser) => {
            console.log("Kullanıcı güncellendi:", updatedUser);    
            this.ngOnInit();   
            this.closePopup(); 
          });

      }
    ngOnInit() {
        this.userService.getAllUsers().subscribe((result) => {
            this.userList = result;
            console.log(this.userList); // API'den gelen verilerin user listesine atanmış hali
        });

    }
    deleteUser(idUser:string){
      const userId: any= {
        id: idUser,
      };
        this.userService.deleteUser(userId).subscribe((result)=>{
          this.ngOnInit();
        }) 

    
    }
    
    openPopup() {
        this.popupOpen = true;
      }
      closePopup() {
        this.popupOpen = false;
      }

      loadUserDetails(user: IUserResponse) {
        this.profileForm.patchValue({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber
        }
      );
       console.log("User id : ",this.profileForm.value.id)
      }
    

}
