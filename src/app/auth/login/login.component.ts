import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  details: FormGroup
  constructor(private _formBuilder: FormBuilder, public _authService:AuthService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    try {
      this.details = this._formBuilder.group({
        userId: ['', [Validators.required]],
        password: ['', [Validators.required]],
      })
    } catch (err) {
    }
  }

  logInUser(){
    if(this.details.invalid){
      return;
    }
    this._authService.logIn(this.details.value);
  }
}
