import { Injectable, computed, inject, signal } from '@angular/core';
import { Todo, TodoStatus } from '../model/todo';
import { LoggerService } from '../../services/logger.service';



@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private loggerService = inject(LoggerService);
  private nextId = 1;

  private todos = signal<Todo[]>([]);

  waitingTodos = this.byStatus('waiting');
  inProgressTodos = this.byStatus('in progress');
  doneTodos = this.byStatus('done');

  private byStatus(status: TodoStatus) {
    return computed(() => this.todos().filter((todo) => todo.status === status));
  }

  /**
   *Elle permet d'ajouter un todo
   *
   * @param name: string 
   * @param content: string
   */
  addTodo(name: string, content: string): void {
    const todo = new Todo(this.nextId++, name, content);
    this.todos.update((currentTodos) => [...currentTodos, todo]);
  }

  changeStatus(id: number, status: TodoStatus): void {
    this.todos.update((currentTodos) => 
      currentTodos.map((todo) => 
        todo.id === id ? new Todo(todo.id, todo.name, todo.content, status) : todo
      )
    );
  }

  /**
   * Delete le todo s'il existe
   *
   * @param id: number
   */
  deleteTodo(id: number): void {
    this.todos.update((currentTodos) => currentTodos.filter((t) => t.id !== id));
  }

  /**
   * Logger la liste des todos
   */
  logTodos() {
    this.loggerService.logger(this.todos());
  }
}
