import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {HttpClientInMemoryWebApiModule} from 'angular-in-memory-web-api'
import {InMemoryDataService} from './in-memory-data.service'

// enable use <router-outlet> in template
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
// must put decorator module under top-level
// use ngModal directive from @angular/forms to achieve a two-way binding
import {FormsModule} from '@angular/forms';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskSearchComponent } from './task-search/task-search.component';

// entry point of your app module
@NgModule({
  // put your all modules here, just for now.
  declarations: [
    AppComponent,
    TasksComponent,
    TaskDetailComponent,
    MessagesComponent,
    DashboardComponent,
    TaskSearchComponent
  ],
  // third-party / angular's modules
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    // The HttpClientInMemoryWebApiModule module intercepts HTTP requests
// and returns simulated server responses.
// Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService,{dataEncapsulation: false}),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
