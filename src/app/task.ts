export enum TaskState {PENDING,ON_PROGRESS,DONE}
export interface Task {
  id: number
  txt: string
  state: TaskState
}
