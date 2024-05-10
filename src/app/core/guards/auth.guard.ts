import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { JwtService } from '../../services/jwt/jwt.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const tokenService = inject(TokenService)
  const jwtService = inject(JwtService)
  const token= tokenService.getToken();
  const decodedJwt = jwtService.getDecodedAccessToken(token!);
 
  let roleDatas:string[]=[]

  if (token==null) {return router.navigateByUrl('/register');}

  let requiredRoles:string[]=route.data['requiredRoles'] || [];
  roleDatas= decodedJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  let hasRole=false;
  if(roleDatas==undefined){
    router.navigateByUrl('/register');
  }
  console.log("Data:",roleDatas)
   requiredRoles.forEach((role)=>{
    if(roleDatas.includes(role)){hasRole=true} ;
   })
   if(!hasRole){
    router.navigateByUrl('/register');
   }
 return hasRole
};
