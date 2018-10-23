import { Component, OnInit } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { ToDo } from './ToDo.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css']
})
export class ToDoComponent {

  private toDos: ToDo[];
  private options: SortablejsOptions;
  private toDoCount: number;

  formSubmited: boolean = false;
  changeReceived: boolean = false;
  form: FormGroup;
  constructor(private toDoService: ToDoService, private fb: FormBuilder) {
    this.setLocalToDoList();
    this.trackDragAndDropChanges();
    this.addControls();
  }

  addControls() {
    this.form = this.fb.group({
      'body': ['', Validators.required]
    })
  }
  trackDragAndDropChanges() {
    this.options = {
      onUpdate: (event: any) => {
        this.setNewPositions();
        this.toDoService.updateTodoPositions(this.toDos);
      }
    };
  }
  setNewPositions() {
    let i = 0;
    for (let toDo of this.toDos) {
      toDo['position'] = i;
      i++;
    }
  }
  setLocalToDoList() {
    this.toDoService.getToDoList().subscribe((response: any) => {
      this.toDos = response.json().toDoList;
      this.toDoCount = this.toDos.length;
    })
  }
  RemoveToDo(toDo: any) {
    this.toDoService.deleteToDo(toDo.id).subscribe((response: any) => {
      const position = this.toDos.indexOf(toDo);
      this.toDos.splice(position, 1);
      this.toDoCount -= 1;
    });

  }
  ChangeState(toDo: any) {
    let isdone;
    toDo.isDone == 1 ? isdone = 0 : isdone = 1;
    this.toDoService.updateTodo(toDo.id, isdone).subscribe((response: any) => {
      toDo.isDone = isdone;
    })
  }
  onSubmit() {
    this.formSubmited = true;
    if (this.toDoCount > 9) {
      window.alert("Too many tasks! The maximum is 10.");
      return;
    }
    if (this.form.valid) {
      
      this.toDoService.storeToDo(this.form.value.body, this.toDoCount).subscribe((response: any) => {
        this.toDos.push(response.json().toDo);
        this.changeReceived = true;
        this.form.reset();
        this.toDoCount += 1;
        setTimeout(() => {
          this.formSubmited = false;
          this.changeReceived = false;
        }, 3000);
      })
    }
  }

}
