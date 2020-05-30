import { Component, OnInit } from '@angular/core';

import { EditorService } from './editor.service';
import {AuthService} from '../auth/auth.service'

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  isShowAddCoverImage = true;

  selectedFontSize;

  selectedJustify;

  selectedFont;

  content;

  uploadedContent = [];

  uploadLoader = false;

  selectedImage = null;

  selectedCoverImage;

  editor(event){
console.log(event)
console.log(event.target.innerHTML)
  }

  fontSizes = [
    { id: 1, name: "8 pt" },
    { id: 2, name: "10 pt" },
    { id: 3, name: "12 pt" },
    { id: 4, name: "14 pt" },
    { id: 5, name: "18 pt" },
    { id: 6, name: "24 pt" },
    { id: 7, name: "36 pt" },
  ];

  justifys = [
    { id: 1, icon: "align-justify", value: "JustifyFull" },
    { id: 2, icon: "align-left", value: "JustifyLeft" },
    { id: 3, icon: "align-center", value: "JustifyCenter" },
    { id: 4, icon: "align-right", value: "JustifyRight" },
  ];

  fontNames = [
    { id: 1, name: "Segoe UI" },
    { id: 2, name: "Arial" },
    { id: 3, name: "Georgia" },
    { id: 4, name: "Impact" },
    { id: 5, name: "Tahoma" },
    { id: 6, name: "Times New Roman" },
    { id: 7, name: "Verdana" },
  ];

  constructor(public _editorService:EditorService, public _authService:AuthService) {

  }

  ngOnInit() {
    this.selectedFontSize = this.fontSizes[1];
    this.selectedJustify = this.justifys[1];
    this.selectedFont = this.fontNames[1].name;
  }

  format(command, value = null) {

    switch (command) {
      case 'fontSize': {
        this.selectedFontSize = value;
        value = value.id;
        break;
      }

      case 'JustifyFull':
      case 'JustifyLeft':
      case 'JustifyCenter':
      case 'JustifyRight': {
        this.selectedJustify = this.justifys.find(x => x.value === command);
        break;
      }

      case 'fontName': {
        this.selectedFont = value;
        break;
      }
    }

    document.execCommand(command, false, value);

  }

  setUrl() {
    var url = prompt('Enter a URL:', 'http://');
    var selectedText = document.getSelection();
    document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank" title="'+url+'">' + selectedText + '</a>');
  }

  async getAllUploadContetnt(){
    this.uploadLoader = true;
    let { userId } = this._authService.getUser();
    let response = await this._editorService.getUploadFiles(userId)
    if(response){
      let data = response['data']
      data.forEach(x => {
        let file = {filePath:'', fileName:''};
        file.filePath = x.filePath;
        file.fileName = x.fileName;
        this.uploadedContent.unshift(file)
      });     
      this.uploadLoader = false;
    }    
    }

  async uploadFile(file){
    if(file[0]){
      let { userId } = this._authService.getUser();
      let response = await this._editorService.uploadFiles(userId, file[0]);
      if(response){
        let file = {filePath:response['data']['filePath'], fileName:response['data']['fileName']};
        this.uploadedContent.unshift(file);
      }
    }
    
  }

  selectCoverImage(file){
    if(file[0]){
      this.selectedCoverImage = file[0] 
    }
  }

    selectImage(file){
      if(this.selectedImage && this.selectedImage.filePath === file.filePath){
        this.selectedImage = null;
        return;
      }
      this.selectedImage = file;
    }

    deleteFile(file){
      console.log(this.selectedImage)
    }

  }

