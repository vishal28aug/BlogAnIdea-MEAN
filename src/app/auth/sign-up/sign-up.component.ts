import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

import { AuthService } from '../../utils/services/auth.service';



@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  profilePicture: String;

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
        profilePicture: ['',[Validators.required]]
      });
    } catch (err) {
    }
  }

  onImagePicked(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
     // just checking if it is an image, ignore if you want
     if (!file.type.startsWith('image')) {
      this.details.get('profilePicture').setErrors({ required: true });
      this.details.get('profilePicture').updateValueAndValidity();
    } else {
      //using the actual Blob/file object instead of the data-url
      this.details.patchValue({profilePicture:file});
      this.details.get('profilePicture').updateValueAndValidity();
    }
  }

  registerUser(){
    if(this.details.invalid){
      return;
    }
    this._authService.registerUser(this.details.value);
  }
  
}

