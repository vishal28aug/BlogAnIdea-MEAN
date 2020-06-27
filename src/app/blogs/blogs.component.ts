import { Component, OnInit } from '@angular/core';

import { EditorService } from '../utils/services/editor.service'

@Component({
  selector: 'blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private _editorService: EditorService) { }

  blogs = [];
  ngOnInit() {
    this.getBlogs();
  }

  async getBlogs(){
    let response =  await this._editorService.getBlogs();
    if(response){
      this.blogs = response['data'];
    }
  }

}
