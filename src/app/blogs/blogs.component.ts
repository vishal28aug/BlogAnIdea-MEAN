import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EditorService } from '../utils/services/editor.service'

@Component({
  selector: 'blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  constructor(private _editorService: EditorService,
    private _router:Router) { }

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

  openBlog(id){
    this._router.navigate(['/blog',id])
  }

}
