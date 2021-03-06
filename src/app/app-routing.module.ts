import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LoginComponent } from './auth/login/login.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AuthGuard } from './auth/auth-guard';
import { EditorComponent } from './editor/editor.component';
import { BlogComponent } from './blogs/blog/blog.component';
import { MyblogsComponent } from './blogs/myblogs/myblogs.component';


const routes: Routes = [
  { path: '', redirectTo: '/blogs', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignUpComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'create', component:EditorComponent},
  { path: 'myblogs', component:MyblogsComponent},
  { path: 'blog/:id', component:BlogComponent},
  { path: '**', redirectTo: '/blogs' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
