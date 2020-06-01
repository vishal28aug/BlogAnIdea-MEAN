import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthService } from './utils/services/auth.service';
import {AuthInterceptor} from './utils/auth-interceptor'

import {ImageUploadDirective} from './utils/directives/image-upload.directive'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth//login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { EditorComponent } from './editor/editor.component';
import { HeaderComponent } from './utils/header/header.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AddBlogButtonComponent } from './utils/add-blog-button/add-blog-button.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    EditorComponent,
    HeaderComponent,
    BlogsComponent,
    AddBlogButtonComponent,
    ImageUploadDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports:[ImageUploadDirective],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
