import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../auth/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'add-blog-button',
  templateUrl: './add-blog-button.component.html',
  styleUrls: ['./add-blog-button.component.css']
})
export class AddBlogButtonComponent implements OnInit {
  
  isEditor = false;
  
  constructor(private _authService:AuthService, private _router: Router) { }

  ngOnInit() {    
    this._router.events.subscribe((res) => { 
      this.isEditor = this._router.url === '/login' || 
      this._router.url === '/register' || 
      this._router.url === '/create' ? false : true;
  })
  }

  onAddBlog(){
    this._authService.getIsAuth() ? this._router.navigate(['/create']) : this._router.navigate(['/login'])
  }


}
