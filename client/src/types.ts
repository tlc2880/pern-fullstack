export default interface todoType {
  todo_id: string,
  description: string,
  owner: string,
  priority: string,
  day: string | undefined,
  morning: boolean,
  afternoon: boolean,
  evening: boolean,
  completed: boolean
}

export type todoCollapsType = {
  todo_id: string,
  description: string,
  owner: string,
  priority: string,
  day: string | undefined,
  morning: boolean,
  afternoon: boolean,
  evening: boolean,
  completed: boolean
}

export interface ToDoContainer extends Array<todoType> {}