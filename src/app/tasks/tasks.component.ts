import { Component, OnInit } from '@angular/core';
import {Task, TaskState} from '../task'
import {TaskService} from '../task.service'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
// export for importing in AppModule(app.module.ts)
export class TasksComponent implements OnInit {

  taskList: Task[]
  constructor(private taskService:TaskService) {}

  // life-cycle hook that invoked after creating the commponent
  ngOnInit(): void {
    this.getTasks()
  }

  getTasks():void{
    this.taskService.getTasks().subscribe(tasks=> this.taskList = tasks)
  }
  add(txt:string):void{
    txt = txt.trim();
    if (!txt) return;
    this.taskService.addTask({txt,state:TaskState.PENDING} as Task).subscribe(task=>{
      this.taskList.push(task)
    });
  }
  delete(task:Task):void{
    this.taskList = this.taskList.filter(t=>t!==task);
    this.taskService.deleteTask(task).subscribe();
  }

}
