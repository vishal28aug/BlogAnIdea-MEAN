import { Component, OnInit, OnDestroy } from '@angular/core';
import {AuthService} from '../services/auth.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private authListenerSubs: Subscription;
  isAuth = false;
  loggedUser = null;
  constructor(private _authService:AuthService) { }

  ngOnInit() {    
    this.authListenerSubs = this._authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.isAuth = isAuthenticated;
    });
  }

  ngAfterContentChecked(){
    this.isAuth = this._authService.getIsAuth();
    this.loggedUser = this._authService.getUser();
  }

 onLogout(){
   this._authService.logOut();
 }
 
  ngOnDestroy(){
this.authListenerSubs.unsubscribe();
  }

}
