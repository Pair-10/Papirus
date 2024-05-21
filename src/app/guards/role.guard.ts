import { CanActivateFn, Router } from '@angular/router';
import { JWT_ROLES } from '../constants/jwtAttribute';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt/jwt.service';
import { TokenService } from '../core/services/token.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const jwtService=inject(JwtService);
  const tokenService = inject(TokenService)
  const token= tokenService.getToken();
  const decodedJwt = jwtService.getDecodedAccessToken(token!);
  let roleDatas:string[]=[]
  if (token==null) {return router.navigateByUrl('/register');}
  let requiredRoles:string[]=route.data['requiredRoles'] || [];
  roleDatas= decodedJwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  let hasRole=false;
  if(roleDatas==undefined){
    router.navigateByUrl('/');
  }
  console.log("Data:",roleDatas)
   requiredRoles.forEach((role)=>{
    if(roleDatas.includes(role)){hasRole=true} ;
   })
   if(!hasRole){
    router.navigateByUrl('/');
   }

  return hasRole;
};