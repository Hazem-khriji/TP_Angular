import { Component, inject, signal } from '@angular/core';
import { TodoStatus } from '../model/todo';
import { TodoService } from '../service/todo.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-todo',
    templateUrl: './todo.component.html',
    styleUrls: ['./todo.component.css'],
    imports: [FormsModule]
})
export class TodoComponent {
  private todoService = inject(TodoService);

  name = signal('');
  content = signal('');
  
  statuses: TodoStatus[] = ['waiting', 'in progress', 'done'];

  columns = [
    { title: 'Waiting', todos: this.todoService.waitingTodos, css: 'bg-light' },
    { title: 'In Progress Todos', todos: this.todoService.inProgressTodos, css: 'bg-warning bg-opacity-25' },
    { title: 'Done Todos', todos: this.todoService.doneTodos, css: 'bg-success bg-opacity-25' },
  ];

  addTodo() : void {
    this.todoService.addTodo(this.name().trim(), this.content().trim());
    this.name.set('');
    this.content.set('');
  }

  changeStatus(id: number, status: TodoStatus): void {
    this.todoService.changeStatus(id, status);
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodo(id);
  }


}
