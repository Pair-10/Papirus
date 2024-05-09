import { ListService } from './../../../services/list/list.service';
import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavbarService } from '../../../services/navbar/navbar.service';
import { TokenService } from '../../../core/services/token.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { switchMap } from 'rxjs';
import { UserService } from '../../../services/user/user.service';
import { JwtService } from '../../../services/jwt/jwt.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  jwtService = inject(JwtService)
  navbarService = inject(NavbarService)
  tokenService = inject(TokenService)
  userService = inject(UserService)
  notificationService = inject(NotificationService)
  hamburgerMenuOpen = false;
  isMenuOpen = false;
  isHovered: boolean[] = [false, false, false];
  isLoggedIn: boolean = false;
  materialTypes: any[] = [];
  userId: any;
  notificationId: any;
  notifications: any[] = [];
  showPopup: boolean = false;
  token = this.tokenService.getToken();
  decodedJwt = this.jwtService.getDecodedAccessToken(this.token!);
  roles:string[] = this.decodedJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  

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
  roleCheck() {
   
      this.roles.forEach((item)=>{
       if(item=="Admin"){
        this.router.navigate(['profile-admin']);
       }
       if(item==""){
        this.router.navigate(['profile']);
       }
          
      

      })

   
   
  }
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
        response.items.find((veri: any) => {
          if (veri.userId === this.userId) {
            this.notificationService.getNotification(veri.notificationId).subscribe(
              responses => {
                this.notifications.push(responses);
              }
            )
          }
        }) // Bildirimleri kullanabilirsiniz
      }
    );
    this.navbarService.isLoggedIn.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    this.checkToken()
  };




  selectCategory(categoryId: string, categoryType: string) {
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
