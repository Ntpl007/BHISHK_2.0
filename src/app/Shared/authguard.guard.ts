import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate ,CanActivateChild, CanDeactivate<unknown>, CanLoad{
  constructor(private authservice:AuthService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    debugger
      let url: string = state.url;
      return this.checkUserLogin(route, url);
      // if(this.authservice.isLoggedIn()==true)
      // {

      //  debugger
      //  var check=this.authservice.isExpired()
      //  if(this.authservice.isExpired()==true)
      //  {
      //   Swal.fire('Session Expired')
        
      //  }else{
      //   var data=this.authservice.GetPathList()

      //   return true;
      //  }
       
      // }
      // this.router.navigateByUrl('/');
      // return false;
     
   
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(route, state);
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  checkUserLogin(route: ActivatedRouteSnapshot, url: any): boolean {
    if (this.authservice.isLoggedIn()) {
      const userRole = this.authservice.getRole();
      if (route.data['role'] && route.data['role'].indexOf(userRole) === -1) {
      
        
        return false;
      }
      if(this.authservice.isExpired()==true)
       {
         Swal.fire('Session Expired')
         this.router.navigateByUrl('/')
        
        }else{
       
         return true;
        }
     // return true;
    }

   this.router.navigate(['/']);
    return false;
  }
  
}
