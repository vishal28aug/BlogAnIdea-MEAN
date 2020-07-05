import { Component, OnInit } from '@angular/core';
import { EditorService } from '../../utils/services/editor.service';
import { Router, ActivatedRoute } from '@angular/router';
 
@Component({
  selector: 'blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  blog: any;

  constructor(private _editorService:EditorService,  private _activatedRoute: ActivatedRoute,) { }

  ngOnInit() {

  }

  async getBlog(id){
    let response = await this._editorService.getBlog(id);
    if(response['sucess']){
      this.blog = response['data'][0];
      this.blog.blogContent = this.blog.blogContent.replace(/&lt;/g, '<'); //replaces all '<' with its escape character
      this.blog.blogContent = this.blog.blogContent.replace(/&gt;/g, '>'); //replaces all '>' with its escape character
    }
  }

  ngAfterContentInit(){
    let blogId = this._activatedRoute.snapshot.params['id'];
    if(blogId){
      this.getBlog(blogId);
    }

  }

}
