import { CandidatesService } from './candidates.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import{ToastrService } from 'ngx-toastr';
import{Router} from'@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private c:CandidatesService,
    private t:ToastrService,
    private r:Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this.c.isLoggednIn()){
        return true;
      }else{
        this.r.navigate(["home/login"]);
        return false;
      }
    
  }
}
