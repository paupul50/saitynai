import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent {

  id:number;
  post:any;
  comments:any;
  postLoaded:boolean = false;
  commentsLoaded: boolean  = false;
  p: number = 1;
  
  constructor(private postService: PostService, private route: ActivatedRoute, private userService: UserService) { 
    this.getPageData();
  }

  getPageData(){
    this.route.params.subscribe((params: Params)=>{
      this.id=params['id'];
      this.getPost();
      this.getPostsComments();
    });
  }
  getPost(){
    this.postService.getPost(this.id).subscribe((response:any)=>{
      this.post = response.json().post;
      this.postLoaded=true;
    })
  }
  getPostsComments(){
    this.postService.getPostComments(this.id).subscribe((response:any)=>{
      this.comments = response.json().comments;
      this.commentsLoaded=true;
    })
  }
  updateComments(comment:any){
    this.comments.push(comment);
    if(this.post.commentCount==0){
      this.post.commentCount++;
    }
  }

}
