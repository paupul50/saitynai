import { Component } from '@angular/core';
import { PostService } from '../post.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  posts: any[];
  postsLoaded:boolean = false;
  p: number = 1;
  constructor(private postService: PostService, private userService: UserService) { 
    this.getPosts();
  }

  getPosts(){
    this.postService.getPosts().subscribe((response: any)=>{
      this.posts = response.json().posts;
      this.postsLoaded = true;
    });
  }
  updatePosts(post:any){
    this.posts.push(post);
  }
}
