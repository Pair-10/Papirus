import { ListService } from './../../../services/list/list.service';
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { TokenService } from '../../../core/services/token.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { switchMap } from 'rxjs';
import { UserService } from '../../../services/user/user.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialService } from '../../../services/material/material.service';
import { JwtService } from '../../../services/jwt/jwt.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet,ReactiveFormsModule,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  navbarService=inject(NavbarService)
  tokenService=inject(TokenService)
  userService = inject(UserService)
  jwtService = inject(JwtService)
  notificationService = inject(NotificationService)
  materialService = inject(MaterialService)
  hamburgerMenuOpen = false;
  isMenuOpen = false;
  isHovered: boolean[] = [false, false, false];
  isLoggedIn: boolean = false;
  materialTypes: any[] = [];
  userId: any;
  notificationId:any;
  notifications: any[] = [];
  showPopup: boolean = false;
  searchTerm: string = '';
  searchedItems:any[] = [];

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  onHover(index: number, isHover: boolean) {
    this.isHovered[index] = isHover;
  }
  toggleHamburgerMenu() {
    this.hamburgerMenuOpen = !this.hamburgerMenuOpen;
  }
  bookcategories: any[] = [];
  magazinecategories: any[] = [];
  articlecategories: any[] = [];
  @Output() materialTypeSelected = new EventEmitter<string>();
  constructor(
    private router: Router,
    private listService: ListService
  ) { }
  

  loadCategoryTypes() {
    const categoryIds = ["f1c535cb-263f-47c8-1e5e-08dc61e8e461", "fa0be4d1-3580-4ddb-1e5f-08dc61e8e461", "7f15efda-deb4-438f-1e60-08dc61e8e461"];

    categoryIds.forEach(categoryId => {
      this.listService.getCategoryTypes().subscribe(
        (response) => {
          this.processCategoryTypes(response, categoryId);
        },
        (error) => {
          console.error('Error fetching category types:', error);
        }
      );
    });
  }
  roleCheck() {
    const token= this.tokenService.getToken();
    const decodedJwt = this.jwtService.getDecodedAccessToken(token!);
    const roles:string[] = decodedJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    let isAdmin = false;
    if(roles==undefined){
      console.log("bu:",roles)
      this.router.navigate(['profile/edit-profile'])
    }
    else{
      console.log("bu2:",roles)
         roles.forEach(item => {
        if (item == "Admin") {
            isAdmin = true;
        }
    });

    if (isAdmin) {
        this.router.navigate(['profile-admin/edit-profile']);
    } else {
        this.router.navigate(['profile/edit-profile']);
    }
    }}

  processCategoryTypes(response: any[], categoryId: string) {
    const filteredItems = response.filter(item => item.categoryId === categoryId);
    for (let item of filteredItems) {
      this.loadMaterialTypes(item.materialTypeId, categoryId);
    }
  }

  loadMaterialTypes(materialTypeId: string, categoryId: string) {
    this.listService.getMaterialTypes(materialTypeId).subscribe(
      (response) => {
        const filteredItems = response.filter(item => item.id === materialTypeId);
        const materialNames = filteredItems.map(item => item.name);
        // Kategoriye göre doğru diziye atama yap
        for (let i = 0; i < materialNames.length; i++) {
          const materialName = materialNames[i];
          if (categoryId === "f1c535cb-263f-47c8-1e5e-08dc61e8e461") {
            if (!this.bookcategories.includes(materialName))
              this.bookcategories.push(materialName);
          } else if (categoryId === "fa0be4d1-3580-4ddb-1e5f-08dc61e8e461") {
            if (!this.magazinecategories.includes(materialName))
              this.magazinecategories.push(materialName);
          } else if (categoryId === "7f15efda-deb4-438f-1e60-08dc61e8e461") {
            if (!this.articlecategories.includes(materialName))
              this.articlecategories.push(materialName);
          }
        }
      },
      (error) => {
        console.error('Error fetching material types:', error);
      }
    );
  }

//--------------------------------------
checkToken() {
  const token = this.tokenService.getToken();
  if (token) {
    this.isLoggedIn = true;
  }
}
ngOnInit() {
  this.loadCategoryTypes();
  this.userService.getUser().pipe(
    switchMap(user => {
      this.userId = user.id
      return this.notificationService.getUserNotification();
    })
  ).subscribe(
    response => {
      response.items.find((veri:any)=>{
        if(veri.userId === this.userId){
          this.notificationService.getNotification(veri.notificationId).subscribe(
            responses=>{
              this.notifications.push(responses);
            }
          )
        }
      })
    }
  );
  this.navbarService.isLoggedIn.subscribe(isLoggedIn => {
    this.isLoggedIn = isLoggedIn;
  });
  this.checkToken()
  };

  search(event: any) {
    if(event != ""){
      this.materialService.getMaterialDynamic(event).subscribe(
        response =>{
          this.searchedItems = response.items
        }
      )
    }
  }
  goToMaterialDetail(materialId: string) {
    this.router.navigateByUrl(`/material-detail/${materialId}`);
    this.searchedItems = [];
    this.searchTerm = "";
  }

selectCategory(categoryId: string,categoryType: string) {
  this.router.navigate(['/material-list'], { queryParams: { type: categoryType, categoryId: categoryId } });
}



  onMaterialTypeClick(type: string) {
    this.materialTypeSelected.emit(type);
    this.router.navigate(['/material-list'], { queryParams: { type } });
  }

  showNotificationPopup() {
    this.showPopup = true;
  }

  closeNotificationPopup() {
    this.showPopup = false;
  }
}
