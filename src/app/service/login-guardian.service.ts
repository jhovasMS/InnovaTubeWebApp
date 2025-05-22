import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login.service';
import { map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardianService implements CanActivate {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private estalogueado: boolean = false;
  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    // if(!this.loginService.estaLogueado()){
    //   this.router.navigate(['/login']);
    //   return this.loginService.estaLogueado();
    // }
    // return true;
    return this.loginService.estaLogueado().pipe(take(1), map((estaLogueado: boolean)=>{
        console.log(estaLogueado);
        if(!estaLogueado){
          this.router.navigate(["/login"]);
          return false;
        }
        return true;
      }));
  }

}
