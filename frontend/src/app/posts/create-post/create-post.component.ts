import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Form } from '@angular/forms';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent{

  @Output() onPostCreated: EventEmitter<any> = new EventEmitter();;
  form: FormGroup;

  formSubmited: boolean = false;
  changeReceived: boolean =false;
  constructor(private fb: FormBuilder, private postService:PostService) { 
    this.addControls();
  }

  addControls(){
    this.form = this.fb.group({
      'title': ['', Validators.required],
      'body': ['', Validators.required]
    })
  }

  onSubmit(){
    this.formSubmited=true;
    if(this.form.valid){
      this.postService.addPost(this.form.value.title,this.form.value.body).subscribe((response:any)=>{
        this.onPostCreated.emit(response.json().post);
        this.changeReceived = true;
        this.form.reset();
        setTimeout(()=>{
          this.formSubmited = false;
          this.changeReceived = false;
     }, 3000);
      })
    }
  }


}
