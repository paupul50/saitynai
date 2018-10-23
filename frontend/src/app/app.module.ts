import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SortablejsModule } from 'angular-sortablejs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpModule } from "@angular/http";
import {ToDoService} from './to-do.service';
import { ToDoComponent } from './to-do/to-do.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post/post.component';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { CommentComponent } from './post-comments/comment/comment.component';
import { CreateCommentComponent } from './post-comments/create-comment/create-comment.component';
import { PostService } from './post.service';
import {RouterModule, Routes} from '@angular/router';
import {NgxPaginationModule} from 'ngx-pagination';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { CreateComponent } from './user/create/create.component';
import { UserService } from './user.service';
import { LoggedInGuard } from './logged-in.guard';
import { LoggedOutGuard } from './logged-out.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'todos', component: ToDoComponent, canActivate: [LoggedInGuard]},
  { path: 'posts', component: PostsComponent },
  { path: 'posts/:id', component: PostCommentsComponent},
  { path: 'register', component: CreateComponent, canActivate: [LoggedOutGuard]},
  { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard]}
  
  ]

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent,
    PostsComponent,
    PostComponent,
    CreatePostComponent,
    PostCommentsComponent,
    CommentComponent,
    CreateCommentComponent,
    HomeComponent,
    LoginComponent,
    CreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SortablejsModule,
    SortablejsModule.forRoot({ animation: 150 }),
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule, RouterModule.forRoot(routes)
  ],
  providers: [
    ToDoService,
    PostService,
    UserService,
    LoggedInGuard,
    LoggedOutGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {


 }