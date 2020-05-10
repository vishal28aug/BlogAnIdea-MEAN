import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  details: FormGroup
  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  ngAfterContentInit() {
    try {
      this.details = this._formBuilder.group({
        email: ['', [Validators.required]],
        password: ['', [Validators.required]],
      })
    } catch (err) {
    }
  }

  logInUser(){
    console.log(this.details);
  }
}
