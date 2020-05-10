import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {

  selectedFontSize;

  selectedJustify;

  selectedFont;

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

  constructor() {

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

  insertImage(){
    var id = "rand" + Math.random();
    let img = document.getElementById("insertImage")['files'][0].name; 
    if(img){
          document.execCommand('insertHTML', false, '<img src="' + img + '" id="' + id + '">');
    }
  }

}
