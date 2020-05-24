import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuthenticated = false;
  private authStatusListener = new Subject<boolean>();

  private loggedUser;

  constructor(private _http: HttpClient, private _router: Router) { }

  //return the logged in user firstName
  getUser() {
    return this.loggedUser;
  }

  //returns the token
  getToken() {
    return this.token;
  }

  //return boolean if user is logged in or not
  getIsAuth() {
    return this.isAuthenticated;
  }

  //return true once the user sucessfully logged in
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  //register a user
  registerUser(userDetails) {
    const { firstName, lastName, userId, password, profilePicture } = userDetails;
    const newUserData = new FormData();
    newUserData.append("firstName",firstName);
    newUserData.append("lastName",lastName);
    newUserData.append("userId",userId);
    newUserData.append("password",password);
    newUserData.append("profilePicture",profilePicture);

    this._http.post("http://localhost:3000/api/v1/auth/register", newUserData )
      .subscribe(res => {
        this._router.navigate(['/login']);
      })
  }

  //login a user
  logIn(cred) {
    const { userId, password } = cred;
    this._http.post("http://localhost:3000/api/v1/auth/login", { userId, password })
      .subscribe(res => {
        const token = res['token'];
        this.token = token;
        if (token) {
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          this.saveAuthData('token', token);
          this.getLoggedUser();
          this._router.navigate(['/blogs']);
        }
      })
  }

  //logout a user
  logOut() {
    this.loggedUser = null;
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
    this._router.navigate(['/blogs']);
  }

  //save data into localstorage
  private saveAuthData(key, value) {
    localStorage.setItem(key, value);
  }

  //clear local storage
  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedUser');
  }

  // try to auto login if token is in localstorage
  autoLogin() {
    const userData = this.getAuthData();
    if (userData?.token) {
      this.loggedUser = JSON.parse(userData.loggedUser);
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
    }
  }

  //get auth data from localstorage
  private getAuthData() {
    const token = localStorage.getItem('token');
    const loggedUser = localStorage.getItem('loggedUser')
    if (!token || !loggedUser) {
      return;
    }
    return {
      token,
      loggedUser
    }
  }

  //get logged user data
  private getLoggedUser() {
    this._http.get("http://localhost:3000/api/v1/auth/me")
      .subscribe(res => {
        console.log(res);
        this.loggedUser = res['data'];
        if (this.loggedUser) this.saveAuthData('loggedUser', JSON.stringify(this.loggedUser))
      })
  }
}
