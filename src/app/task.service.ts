import { Injectable } from '@angular/core';
import {Observable,of} from 'rxjs'
import {catchError,map,tap} from 'rxjs/operators'
import {Task} from './task'
import {MessagesService} from './messages.service'
import {HttpClient,HttpHeaders} from '@angular/common/http'


/**
 * Why in Angular we need use Service instead of Components to fetch/save data?
 * Components should only focus on presenting data and delegate data access to a service
 *
 *
 */

// use Angular's dependency injection system
// service could have dependencies
@Injectable({
  // register a provider to inject
  // use root injector here
  // so it will use singleton pattern
  providedIn: 'root'
})
export class TaskService {
  // RESTful API
  private tasksUrl = 'api/tasks'
  private log(message:string){
    this.messagesService.add(`TaskService: ${message}`)
  }

  // service in service
  constructor(private messagesService:MessagesService,
  private http: HttpClient
    ) { }

  private handleError<T>(operation='operation', result?:T) {
   return (error:any):Observable<T>=>{
     console.error(error);
     this.log(`${operation} failed: ${error.message}`);
     return of(result as T);
   }
  }

  getTasks(): Observable<Task[]>{
    this.log('fetch tasks')
    // return of(tasks);
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      tap(_=>this.log(`fetch tasks`)),
      catchError(this.handleError<Task[]>('getTasks',[])));
  }
  getTask(id:number): Observable<Task>{
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_=>this.log(`fetch task id=${id}`)),
      catchError(this.handleError<Task>(`getTask id=${id}`))
    );
  }
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':'application/json'
    })
  }
  updateTask(task:Task):Observable<any>{
    return this.http.put(this.tasksUrl,task,this.httpOptions).pipe(
      tap(_=>this.log(`updated task id=${task.id},
      `),
      catchError(this.handleError<any>('updateTask'))
      )
    )
  }

  addTask(task:Task):Observable<Task>{
    return this.http.post<Task>(this.tasksUrl,task,this.httpOptions).pipe(
      tap((newTask:Task)=>this.log(`added task w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    )
  }

  deleteTask(task:Task|number):Observable<Task>{
    const id = typeof task === 'number'? task: task.id;
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete<Task>(url,this.httpOptions).pipe(
      tap(_=>this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deleteTask'))
    )
  }

  searchTask(term: string): Observable<Task[]>{
    if(!term.trim()){
      return of([])
    }
    return this.http.get<Task[]>(`${this.tasksUrl}/?txt=${term}`).pipe(
      tap(x=>x.length?
       this.log(`found tasks matching "${term}"`):
       this.log(`no task matching "${term}"`)
        ),
        catchError(this.handleError('searchTasks',[]))
    )
  }
}
