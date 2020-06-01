import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EditorService {


  constructor(private _http: HttpClient, private _router: Router) { }

  uploadFiles(fileData) {
    const uploadData = new FormData();
    uploadData.append("fileData",fileData);
    return this._http.post("http://localhost:3000/api/v1/upload/file", uploadData).toPromise();

  }

  getUploadFiles( user ){
    return this._http.get("http://localhost:3000/api/v1/upload/file", 
    {params:
      {
        user:user
      }
    }).toPromise();
  }

}
