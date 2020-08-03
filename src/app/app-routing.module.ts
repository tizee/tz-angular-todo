import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TasksComponent} from './tasks/tasks.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {TaskDetailComponent} from './task-detail/task-detail.component'

// your app routes
const routes: Routes = [
  {path:'tasks',component:TasksComponent},
  {path:'detail/:id',component:TaskDetailComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'',redirectTo:'/dashboard',
  pathMatch:'full'}
];

// use @NgModule to initialization with metadata
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
