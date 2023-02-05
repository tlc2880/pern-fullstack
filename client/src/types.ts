export default interface todoType {
    todo_id: string,
    description: string,
    owner: string,
    priority: string,
    day: string | null,
    completed: boolean
  }