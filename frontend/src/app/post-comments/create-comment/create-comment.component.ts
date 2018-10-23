import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, Form, FormBuilder, FormGroup } from '@angular/forms';
import { PostService } from '../../post.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.css']
})
export class CreateCommentComponent {
  @Input() id: number;
  @Output() onCommentCreated: EventEmitter<any>;
  form: FormGroup;

  formSubmited: boolean = false;
  changeReceived: boolean = false;
  constructor(private fb: FormBuilder, private postService: PostService) {
    this.addControls();
    this.onCommentCreated = new EventEmitter();
    
  }


  addControls() {
    this.form = this.fb.group({
      'body': ['', Validators.required]
    })
  }

  onSubmit() {
    this.formSubmited = true;
    if (this.form.valid) {
      this.postService.addComment(this.id, this.form.value.body).subscribe((response: any) => {
        this.onCommentCreated.emit(response.json().comment);
        this.changeReceived = true;
        this.form.reset();
        setTimeout(() => {
          this.formSubmited = false;
          this.changeReceived = false;
        }, 3000);
      })
    }

  }

}
