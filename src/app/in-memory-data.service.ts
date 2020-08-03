import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Task,TaskState} from './task';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb(){
    const tasks:Task[] = [
      {
        id:10,
      txt:'Design',
      state: TaskState.ON_PROGRESS
    },
      {
        id:11,
      txt:'Work',
      state: TaskState.ON_PROGRESS
    },
      {
        id:12,
      txt:'Code',
      state: TaskState.ON_PROGRESS
    },
      {
        id:13,
      txt:'Play',
      state: TaskState.ON_PROGRESS
    },
      {
        id:14,
      txt:'UI',
      state: TaskState.ON_PROGRESS
    },
  ]
    return {tasks};
  }
  genId(tasks:Task[]):number{
    return tasks.length>0? Math.max(...tasks.map(task=>task.id+1))+1: 10;
  }
  constructor() { }
}
