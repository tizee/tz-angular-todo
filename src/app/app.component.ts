import { Component } from '@angular/core';

// app component(application shell,see more on google web dev doc)
// use @Component decorator to setup metadata fro injector
@Component({
  // css selector
  selector: 'app-root',
  // angular template html
  templateUrl: './app.component.html',
  // style
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Simple-todolist';
}
