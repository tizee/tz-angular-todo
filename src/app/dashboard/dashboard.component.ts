import { Component, OnInit } from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../task'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService:TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks():void{
    this.taskService.getTasks().subscribe(tasks=>this.tasks=tasks.slice(1,4))
  }

}
