import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AuthService } from '../auth.service';


@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  details: FormGroup
  constructor(private _formBuilder: FormBuilder, public _authService: AuthService) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    try {
      this.details = this._formBuilder.group({
        firstName:['',[Validators.required]],
        lastName:['',[Validators.required]],
        userId: ['', [Validators.required]],
        password: ['', [Validators.required]],
      })
    } catch (err) {
    }
  }

  registerUser(){
    if(this.details.invalid){
      return;
    }
    this._authService.registerUser(this.details.value);
  }
  
}

