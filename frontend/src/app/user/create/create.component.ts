import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  form: FormGroup;
  formSubmited: boolean = false;
  changeReceived: boolean =false;
  constructor(private fb: FormBuilder, private userService: UserService) { 
    this.addControls();
  }

  addControls(){
    this.form = this.fb.group({
      'name': ['', Validators.required],
      'email': ['', Validators.compose([Validators.required, Validators.email])],
      'password': ['', Validators.required]
    })
  }
  onSubmit(){
    this.formSubmited=true;
    if(this.form.valid){
      this.userService.createUser(this.form.value.name, this.form.value.email, this.form.value.password).subscribe((response:any)=>{
        //console.log(response.status);
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
